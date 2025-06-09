import { useSelector } from "react-redux";

const FAQ = () => {
  const showFAQpage = useSelector((state) => state.security.showFAQpage);

  return (
    <div className={showFAQpage ? "container-fluid" : "hidden"}>
      <div className="faq-box">
        <p className="fw-bold fs-4">Frequently Asked Questions</p>
        <div className="accordion">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFaqOne"
                aria-expanded="true"
                aria-controls="collapseFaqOne"
              >
                <b>I cannot access ViewBovis</b>
              </button>
            </h2>
            <div id="collapseFaqOne" className="accordion-collapse collapse">
              <div className="accordion-body">
                The server is available between <b>6am and 10pm.</b> It is
                offline outside of these hours.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFaqTwo"
                aria-expanded="false"
                aria-controls="collapseFaqTwo"
              >
                <b>
                  ViewBovis is taking a long time to load / is loading slowly
                </b>
              </button>
            </h2>
            <div id="collapseFaqTwo" className="accordion-collapse collapse">
              <div className="accordion-body">
                If the application is slow, try switching browsers or clearing
                your browser cache.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFaqThree"
                aria-expanded="false"
                aria-controls="collapseFaqThree"
              >
                <b>I cannot access the SCE Authenticated Portal</b>
              </button>
            </h2>
            <div id="collapseFaqThree" className="accordion-collapse collapse">
              <div className="accordion-body">
                You must accept the SCE terms and conditions of use to gain
                access. These are sent annually by email from the SCE.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFaqFour"
                aria-expanded="false"
                aria-controls="collapseFaqFour"
              >
                <b>I cannot access the Training Video links</b>
              </button>
            </h2>
            <div id="collapseFaqFour" className="accordion-collapse collapse">
              <div className="accordion-body">
                The training videos can be found in the Field Epidemiology
                Knowledge Forum on SharePoint. Navigate to: Libraries → Shared
                Documents → Training → ViewBovis Training → OFFICIAL-SENSITIVE
                ViewBovis Training Material → Training Videos.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFaqFive"
                aria-expanded="false"
                aria-controls="collapseFaqFive"
              >
                <b>I cannot access the Support Documents</b>
              </button>
            </h2>
            <div id="collapseFaqFive" className="accordion-collapse collapse">
              <div className="accordion-body">
                Support documents can be found in the Field Epidemiology
                Knowledge Forum on SharePoint. Navigate to: Libraries → Shared
                Documents → Training → ViewBovis Training → OFFICIAL-SENSITIVE
                ViewBovis Training Material. All relevant support documents are
                available there.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFaqSix"
                aria-expanded="false"
                aria-controls="collapseFaqSix"
              >
                <b>
                  Why am I receiving ‘Invalid Submission’ message when I search
                  for a sample?
                </b>
              </button>
            </h2>
            <div id="collapseFaqSix" className="accordion-collapse collapse">
              <div className="accordion-body">
                An 'Invalid Submission' means the sample does not exist in the
                ViewBovis database, likely because it has not yet been
                sequenced. ViewBovis data is updated on the 1st of every month.
                If WGS (Whole Genome Sequencing) was not completed in time, the
                sample will appear in the next monthly update.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFaqSeven"
                aria-expanded="false"
                aria-controls="collapseFaqSeven"
              >
                <b>Sample is missing metadata (e.g. location of badger)</b>
              </button>
            </h2>
            <div id="collapseFaqSeven" className="accordion-collapse collapse">
              <div className="accordion-body">
                If location data is missing, it means the information was not
                supplied. This is often due to sensitivities around the BCP
                (Badger Control Policy).
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFaqEight"
                aria-expanded="false"
                aria-controls="collapseFaqEight"
              >
                <b>Sample is causing an error due to missing metadata</b>
              </button>
            </h2>
            <div id="collapseFaqEight" className="accordion-collapse collapse">
              <div className="accordion-body">
                If a sample appears on Nextstrain but lacks a location, a
                'Something went wrong' error message may occur because of
                missing metadata (e.g. location).
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFaqNine"
                aria-expanded="false"
                aria-controls="collapseFaqNine"
              >
                <b>What should I do if I spot an unexpected problem?</b>
              </button>
            </h2>
            <div id="collapseFaqNine" className="accordion-collapse collapse">
              <div className="accordion-body">
                Please report the issue on the ViewBovis User Forum on Microsoft
                Teams.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
