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
        if (data["warnings"]) {
          let span = document.createElement("span");
          span.classList.add("govuk-error-message")
          span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" viewBox="0 0 16 16"><path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg> <span>${data["warnings"]}</span>`;
          span.style.fontSize = "12px"
          return span;
        } else {
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
        }
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
