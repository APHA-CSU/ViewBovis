
const SNPMatrixSideBar = () => {

    return <>
     <br/>
    <div className={"govuk-heading-m"} id={"enter-sample-container"}>
        Enter Identifier or Submission
    </div>
    <div>
        <p>
            <input type={"text"} className="input__sampleID" placeholder="e.g. UK705113600438" name="Name" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="input-tooltip" title="Identifier or Submission Number" />
        </p>
    </div>
    <div id="snpmatrix-distance-container">
        <div className="govuk-heading-m" style={{background:"#d1d1d1",padding:"10px",marginTop:"30px"}}>
            Select SNP Distance
        </div>
        <div>
            <p class="display-value-fixed" style={{float: "left"}}>0</p>
            <p class="display-value-fixed" style={{float: "right"}}>10</p>
            <input id="snpmatrix-range" type="range" class="snp-slider" min="0" max="10" step="1" value="1" />
            <br/>
            <span style={{fontSize: "20px"}}>SNP Distance: <p class="display-value" id="snpmatrix-distance-value">1</p></span>

            <br/>
            <br/>
            <button class="govuk-button" id="btn__plot-snpmatrix" aria-disabled="true"  data-module="govuk-button">
                Plot SNP Matrix
            </button>
            <div className="text-center">
                <output className="spinner-border text-secondary hidden">
                    <span className="visually-hidden">Loading...</span>
                </output>
            </div>
             <div id="snpmatrix-warning-text"></div>

        </div>
    </div>
    <hr/>
    <div id="snp-distribution-plot" style={{height: "200px", width: "100%"}}></div>
</>
}

export default SNPMatrixSideBar;