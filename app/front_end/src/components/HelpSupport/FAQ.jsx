import { useSelector } from "react-redux";

const FAQ = ({ Footer }) => {
  const showFAQpage = useSelector((state) => state.security.showFAQpage);

  return (
    <div className={showFAQpage ? "container-fluid" : "hidden"}>
      <div>
        <p className="fw-bold fs-4">Frequently Asked Questions</p>
        <div className="accordion">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFaq1"
                aria-expanded="true"
                aria-controls="collapseFaq1"
              >
                <b>I cannot access ViewBovis</b>
              </button>
            </h2>
            <div id="collapseFaq1" className="accordion-collapse collapse">
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
                data-bs-target="#collapseFaq2"
                aria-expanded="false"
                aria-controls="collapseFaq2"
              >
                <b>
                  ViewBovis is taking a long time to load / is loading slowly
                </b>
              </button>
            </h2>
            <div id="collapseFaq2" className="accordion-collapse collapse">
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
                data-bs-target="#collapseFaq3"
                aria-expanded="false"
                aria-controls="collapseFaq3"
              >
                <b>I cannot access the SCE Authenticated Portal</b>
              </button>
            </h2>
            <div id="collapseFaq3" className="accordion-collapse collapse">
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
                data-bs-target="#collapseFaq4"
                aria-expanded="false"
                aria-controls="collapseFaq4"
              >
                <b>I cannot access the Training Video links</b>
              </button>
            </h2>
            <div id="collapseFaq4" className="accordion-collapse collapse">
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
                data-bs-target="#collapseFaq5"
                aria-expanded="false"
                aria-controls="collapseFaq5"
              >
                <b>I cannot access the Support Documents</b>
              </button>
            </h2>
            <div id="collapseFaq5" className="accordion-collapse collapse">
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
                data-bs-target="#collapseFaq6"
                aria-expanded="false"
                aria-controls="collapseFaq6"
              >
                <b>
                  Why am I receiving ‘Invalid Submission’ message when I search
                  for a sample?
                </b>
              </button>
            </h2>
            <div id="collapseFaq6" className="accordion-collapse collapse">
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
                data-bs-target="#collapseFaq7"
                aria-expanded="false"
                aria-controls="collapseFaq7"
              >
                <b>
                  Why am I receiving ‘Excluded submission, Reason: low quality
                  data’ message when I search for a sample?
                </b>
              </button>
            </h2>
            <div id="collapseFaq7" className="accordion-collapse collapse">
              <div className="accordion-body">
                ‘Low quality data’ samples are excluded from phylogenetic
                analysis when the sequence data contains too many undetermined
                bases in the sequence as their inclusion skews the tree
                structure. However, the underlying reason for this is usually
                that the cultures sent for sequencing have low level
                contamination.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFaq8"
                aria-expanded="false"
                aria-controls="collapseFaq8"
              >
                <b>Sample is missing metadata (e.g. location of badger)</b>
              </button>
            </h2>
            <div id="collapseFaq8" className="accordion-collapse collapse">
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
                data-bs-target="#collapseFaq9"
                aria-expanded="false"
                aria-controls="collapseFaq9"
              >
                <b>Sample is causing an error due to missing metadata</b>
              </button>
            </h2>
            <div id="collapseFaq9" className="accordion-collapse collapse">
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
                data-bs-target="#collapseFaq10"
                aria-expanded="false"
                aria-controls="collapseFaq10"
              >
                <b>I cannot filter for multiple samples in Nextstrain</b>
              </button>
            </h2>
            <div id="collapseFaq10" className="accordion-collapse collapse">
              <div className="accordion-body">
                The selected filter categories must be the same to view multiple
                samples in Nextstrain. For example, Submission: AF-21-06299-21
                and Submission: AF-61-04715-19 can be viewed together on
                Nextstrain. But Submission: AF-21-06299-21 and Identifier:
                UK202580602658 cannot be viewed together.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFaq11"
                aria-expanded="false"
                aria-controls="collapseFaq11"
              >
                <b>
                  Why do some samples from the same CPH appear ‘out of home
                  range’ even though they are identical and assigned to the same
                  clade?
                </b>
              </button>
            </h2>
            <div id="collapseFaq11" className="accordion-collapse collapse">
              <div className="accordion-body">
                Home ranges for each clade are updated on an annual basis. If
                samples are from different years, it is possible that the home
                range may have changed in the intervening period.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFaq12"
                aria-expanded="false"
                aria-controls="collapseFaq12"
              >
                <b>What should I do if I spot an unexpected problem?</b>
              </button>
            </h2>
            <div id="collapseFaq12" className="accordion-collapse collapse">
              <div className="accordion-body">
                Please report the issue on the ViewBovis User Forum on Microsoft
                Teams.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
