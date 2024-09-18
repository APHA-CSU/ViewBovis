import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import "react-tabulator/css/tabulator_bootstrap4.min.css";
import React from "react";

class SNPTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
  }
  // Tabulator requires array of json objects
  render() {
    const { json } = this.props;
    const tabledata = Object.values(json).filter(
      (val) => typeof val != "string"
    );
    const soi = json["SOI"];
    tabledata.map(
      (sample, index) => (sample.submission = Object.keys(json)[index])
    );
    const columns = [
      {
        title: "Precise Location",
        field: "cph",
        headerFilter: "input",
        sorter: "string",
        width: 150,
      },
      {
        title: "Identifier",
        field: "animal_id",
        headerFilter: "input",
        sorter: "string",
        width: 150,
      },
      {
        title: "Submission",
        field: "submission",
        headerFilter: "input",
        sorter: "string",
        width: 150,
        formatter: function (cell) {
          const cellValue = cell.getValue();
          if (cellValue === soi) {
            cell.getRow().getElement().style.backgroundColor = "#ffbe33";
          }
          return cellValue;
        },
      },
      {
        title: "SNP distance",
        field: "snp_distance",
        headerFilter: "input",
        hozAlign: "right",
        sorter: "number",
        width: 100,
      },
      {
        title: "Miles",
        field: "distance",
        headerFilter: "input",
        hozAlign: "right",
        sorter: "number",
        width: 100,
      },
      {
        title: "Slaughter Date",
        field: "slaughter_date",
        headerFilter: "input",
        sorter: "date",
        width: 150,
      },
    ];

    const handleRowSelect = (row) => {
      if (row.getData().submission === soi) return;
      if (row.getData().cph != null) {
        // Get the row submission
        const rowSubmissionSelect = row.getData().submission;
        const marker = document.querySelector(`.marker-${rowSubmissionSelect}`);
        if (marker) {
          marker.style.filter =
            "drop-shadow(0 0 6px #ffbe33) drop-shadow(0 0 6px #ffbe33) drop-shadow(0 0 8px #ffbe33)";
          marker.style["z-index"] = 950;
        }
      }
    };
    const handleRowDeselect = (row) => {
      if (row.getData().submission === soi) return;
      if (row.getData().cph != null) {
        // Get the row submission
        const rowSubmissionDeselect = row.getData().submission;
        const marker = document.querySelector(
          `.marker-${rowSubmissionDeselect}`
        );
        if (marker) {
          marker.style.filter = "none";
          marker.style["z-index"] = 900;
        }
      }
    };

    const handleCSVdownload = () => {
      const table = this.tableRef.current;
      if (table) {
        table.download("csv", "snp_table_" + soi + ".csv");
      }
    };

    return (
      <>
        {Object.keys(json).length > 1 && (
          <div style={{ direction: "ltr", padding: "5px" }} id="table-sidebar-container">
            <div>
              <h4>{soi}</h4>
              <p>
                <span>
                  <b>Identifier: </b>
                  {json[soi]["animal_id"]}
                  <br />
                </span>
                <span>
                  <b>Precise Location: </b>
                  {json[soi]["cph"]}
                  <br />
                </span>
                <span>
                  <b>OS Map Reference: </b>
                  {json[soi]["os_map_ref"]}
                  <br />
                </span>
                <span>
                  <b>Clade: </b>
                  {json[soi]["clade"]}
                  <br />
                </span>
              </p>
              <button
                onClick={handleCSVdownload}
                className="govuk-button btn-snptable"
              >
                Download CSV
              </button>
            </div>
            <div style={{ overflowX: "scroll", border: "1px solid black" }}>
              <div style={{ width: "800.5px" }} id="table-sidebar-container">
                <ReactTabulator
                  style={{ fontSize: "13px" }}
                  columns={columns}
                  data={tabledata}
                  columnDefaults={{
                    resizable: false,
                  }}
                  key={"snp_table_" + soi}
                  movableColumns={true}
                  selectable={true}
                  selectableRangeMode={"click"}
                  layout={"fitData"}
                  initialSort={[
                    { column: "distance", dir: "asc" },
                    { column: "snp_distance", dir: "asc" },
                  ]}
                  events={{
                    rowSelected: handleRowSelect,
                    rowDeselected: handleRowDeselect,
                  }}
                  onRef={(ref) => (this.tableRef = ref)}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default SNPTable;
