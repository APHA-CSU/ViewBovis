import { useState, useEffect, useRef } from "react";
import { setNextstrainURL } from "../../features/counter/nextstrainSlice";
import { useDispatch } from "react-redux";

const NextstrainTable = ({ data }) => {
  const dispatch = useDispatch();
  const tableOptions = {
    border: "1px solid #b1b4b6",
    padding: "10px",
    margin: "10px",
  };
  const nextStrainTableRef = useRef();
  const [tableLayout, setTableLayout] = useState({
    numOfTables: [],
    cellsPerTable: [],
  });
  let currHeader = -1;
  const [tableWidth, setTableWidth] = useState();
  const tableArr = ["eartag", "af", "cph", "county", "clade"];
  const headerArr = [
    "Identifier",
    "Submission",
    "Precise Location",
    "County",
    "Clade",
  ];

  const getNextstrainIframe = (cellField, data) => {
    const clade = data["clade"];
    const cellValue = data[cellField];
    if (cellField === "clade")
      dispatch(setNextstrainURL(`${cellValue}?p=grid&tl=Identifier`));
    if (cellField === "county")
      dispatch(
        setNextstrainURL(`${clade}?f_County=${cellValue}&p=grid&tl=Identifier`)
      );
    if (cellField === "af")
      dispatch(setNextstrainURL(`${clade}?f_Submission=${cellValue}&p=grid`));
    if (cellField === "eartag")
      dispatch(
        setNextstrainURL(
          `${clade}?f_Identifier=${cellValue}&p=grid&tl=Identifier`
        )
      );
    if (cellField === "cph")
      dispatch(
        setNextstrainURL(
          `${clade}?f_PreciseLocation=${cellValue}&p=grid&tl=Identifier`
        )
      );
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setTableWidth(nextStrainTableRef?.current?.offsetWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  useEffect(() => {
    setTableWidth(nextStrainTableRef?.current?.offsetWidth);
  }, [nextStrainTableRef]);

  useEffect(() => {
    if (tableWidth > 0) {
      let maxCellWidth = 110;
      let cellsPerTable =
        Math.floor(tableWidth / maxCellWidth) > 0
          ? Math.floor(tableWidth / maxCellWidth)
          : 1;
      let numOfTables =
        5 % cellsPerTable === 0
          ? 5 / cellsPerTable
          : Math.floor(5 / cellsPerTable) + 1;
      setTableLayout({
        ...tableLayout,
        cellsPerTable: Array.from({ length: cellsPerTable }),
        numOfTables: Array.from({ length: numOfTables }),
      });
    }
  }, [tableWidth]);

  return (
    <>
      <div ref={nextStrainTableRef} style={tableOptions}>
        {Object.keys(data).length > 0 &&
          tableLayout?.numOfTables.map((table, tableIndex) => {
            currHeader = currHeader + 1;
            return (
              <table
                key={"nextstrain-table-" + tableIndex}
                className="govuk-table align-middle"
                style={{ fontSize: "14px" }}
              >
                <thead className="govuk-table__head">
                  <tr className="govuk-table__row">
                    {tableLayout?.cellsPerTable.map((header, headerIndex) => {
                      return headerIndex +
                        tableIndex * tableLayout.cellsPerTable.length <
                        5 ? (
                        <th
                          scope="col"
                          className="nextstrain-table-header govuk-table__header"
                          key={"nextstrain-header-" + headerIndex}
                        >
                          {
                            headerArr[
                              headerIndex +
                                tableIndex * tableLayout.cellsPerTable.length
                            ]
                          }
                        </th>
                      ) : null;
                    })}
                  </tr>
                </thead>
                <tbody className="govuk-table__body">
                  <tr className="govuk-table__row">
                    {tableLayout?.cellsPerTable?.map((value, valIndex) => {
                      return valIndex +
                        tableIndex * tableLayout.cellsPerTable.length <
                        5 ? (
                        <td
                          className="govuk-table__cell nextstrain-table-cell"
                          style={{ backgroundColor: "var(--bs-body-bg)" }}
                          key={"nextstrain-value-" + valIndex}
                          onClick={() =>
                            getNextstrainIframe(
                              tableArr[
                                valIndex +
                                  tableIndex * tableLayout.cellsPerTable.length
                              ],
                              data[0]
                            )
                          }
                        >
                          {
                            data[0][
                              tableArr[
                                valIndex +
                                  tableIndex * tableLayout.cellsPerTable.length
                              ]
                            ]
                          }
                        </td>
                      ) : null;
                    })}
                  </tr>
                </tbody>
              </table>
            );
          })}
      </div>
    </>
  );
};

export default NextstrainTable;
