import {ReactTabulator} from 'react-tabulator'
import 'react-tabulator/lib/styles.css'
import 'react-tabulator/lib/css/tabulator.min.css'

const SNPTable = ({json}) => {
// Tabulator requires array of json objects
let tabledata = Object.values(json).filter(val => typeof val != "string")
console.log(json)
const soi = json["SOI"]
// Add submission number to tabledata
for (let i = 0; i < tabledata.length; i++) {
  tabledata[i].submission = Object.keys(json)[i]
}
let columns = [
  {title:"Precise Location", field:"cph", headerFilter:"input", sorter: "string"},
  {title:"Identifier", field:"animal_id", headerFilter:"input", sorter: "string"},
  {title:"Submission", field:"submission", headerFilter:"input", sorter: "string",
    formatter: function(cell) {
      var cellValue = cell.getValue();
      if (cellValue == soi){
        cell.getRow().getElement().style.backgroundColor = "#ffbe33"
      }
      return cellValue;
    }},
  {title:"SNP distance", field:"snp_distance", headerFilter:"input", hozAlign:"right", sorter:"number"},
  {title:"Miles", field:"distance", headerFilter:"input", hozAlign:"right", sorter:"number"},
  {title:"Slaughter Date", field:"slaughter_date", headerFilter:"input", sorter: "date"},  
]
// Render table in right sidebar
const snpTable = {
  data: tabledata,
  columnDefaults:{
      resizable:false,
    },
  movableColumns: true,
  selectable:true,
  selectableRangeMode:"click",
  selectableCheck:function(row){
    return row.getData().submission != soi && row.getData().cph != null; //disallow selection of soi row
  },
  columns: [
      {title:"Precise Location", field:"cph", headerFilter:"input", sorter: "string"},
      {title:"Identifier", field:"animal_id", headerFilter:"input", sorter: "string"},
      {title:"Submission", field:"submission", headerFilter:"input", sorter: "string",
        formatter: function(cell) {
          var cellValue = cell.getValue();
          if (cellValue == soi){
            cell.getRow().getElement().style.backgroundColor = "#ffbe33"
          }
          return cellValue;
        }},
      {title:"SNP distance", field:"snp_distance", headerFilter:"input", hozAlign:"right", sorter:"number"},
      {title:"Miles", field:"distance", headerFilter:"input", hozAlign:"right", sorter:"number"},
      {title:"Slaughter Date", field:"slaughter_date", headerFilter:"input", sorter: "date"},  
  ],
  initialSort:[
    {column:"distance", dir:"asc"},
    {column:"snp_distance", dir:"asc"},
  ],
}

/*
// When a row is selected, change the colour of the map marker
snpTable.on("rowSelected", function(row){
  if (row.getData().cph != null){
    // Get the row submission
    const rowSubmissionSelect = row.getData().submission;
    document.querySelector(`.marker-${rowSubmissionSelect}`).firstChild.style.color = "#ffbe33";
  }
});

// Reset marker colour to default when row is deselected
snpTable.on("rowDeselected", function(row){
  if (row.getData().cph != null){
    // Get the row submission
    const rowSubmissionDeselect = row.getData().submission;
    document.querySelector(`.marker-${rowSubmissionDeselect}`).firstChild.style.color = "white";
  }
});
*/
return <>{ Object.keys(json).length > 1 && <div>
    <div>
          <h4>{soi}</h4>
          <p>
            <span><b>Identifier: </b>{json[soi]["animal_id"]}<br/></span>
            <span><b>Precise Location: </b>{json[soi]["cph"]}<br/></span>
            <span><b>OS Map Reference:  </b>{json[soi]["os_map_ref"]}<br/></span>
            <span><b>Clade:  </b>{json[soi]["clade"]}<br/></span>
          </p>
          <button className="govuk-button btn-snptable">Download CSV</button>
        </div>
<div style={{overflow : "auto"}}>
  <ReactTabulator columns={columns}
data={tabledata}
columnDefaults={{
  resizable:false
}}
role={"grid"}
movableColumns={true}
selectable={true}
selectableRangeMode={"click"}
layout={"fitData"}
/>
</div>
</div>}
</>
}

export default SNPTable