import { ReactTabulator } from "react-tabulator";

const CPHTableComp = ({ samples }) => {
  const tabledata = [...samples].map((sampleObj) => {
    return sampleObj;
  });
  const columns = [
    {
      title: "Submission",
      field: "Submission",
      headerFilter: "input",
      sorter: "string",
      width: 120,
    },
    {
      title: "Identifier",
      field: "Identifier",
      headerFilter: "input",
      sorter: "string",
      width: 130,
    },
    {
      title: "Clade",
      field: "Clade",
      headerFilter: "input",
      sorter: "string",
      width: 100,
    },
    {
      title: "Birth Location",
      field: "Loc0",
      headerFilter: "input",
      sorter: "string",
      width: 120,
    },
    {
      title: "Date of Birth",
      field: "wsdBirthDate",
      headerFilter: "input",
      sorter: "string",
      width: 120,
    },
    {
      title: "Slaughter Date",
      field: "SlaughterDate",
      headerFilter: "input",
      sorter: "string",
      width: 130,
    },
    {
      title: "Sex",
      field: "Gender",
      headerFilter: "input",
      sorter: "string",
      width: 70,
    },
    {
      title: "Disclosing Test Type",
      field: "Disclosing_Test",
      headerFilter: "input",
      sorter: "string",
      width: 150,
    },
    {
      title: "Import Country",
      field: "Import_Country",
      headerFilter: "input",
      sorter: "string",
      width: 120,
    },
    {
      title: "Launch Tools",
      field: "tools",
      width: 200,
      formatter: (cell) => {
        let data = cell.getValue();
        let list = document.createElement("ul");
        let snpmap = document.createElement("li");
        snpmap.innerHTML = "SNP Map";
        snpmap.addEventListener("click", data["snpmap"]);
        snpmap.classList.add("cphsearch-launch-tools");
        list.appendChild(snpmap);
        let cattlemovement = document.createElement("li");
        cattlemovement.innerHTML = "Cattle Movement";
        cattlemovement.addEventListener("click", data["movement"]);
        cattlemovement.classList.add("cphsearch-launch-tools");
        list.appendChild(cattlemovement);
        let nextstrain = document.createElement("li");
        nextstrain.innerHTML = "Nextstrain";
        nextstrain.addEventListener("click", data["nextstrain"]);
        nextstrain.classList.add("cphsearch-launch-tools");
        list.appendChild(nextstrain);
        return list;
      },
    },
  ];
  return (
    <>
      {samples.length > 0 && (
        <>
          <b>CPH : {samples[0]["CPH"]}</b>
          <br></br>
          <div
            className="cphtable-container"
            style={{
              overflowX: "scroll",
              overflowY: "scroll",
              border: "1px solid black",
            }}
          >
            <div style={{ maxHeight: "50vh", width: "1280px" }}>
              <ReactTabulator
                style={{ fontSize: "11px" }}
                columns={columns}
                data={tabledata}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CPHTableComp;
