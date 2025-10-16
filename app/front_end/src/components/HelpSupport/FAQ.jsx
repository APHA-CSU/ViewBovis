import { useSelector } from "react-redux";
import { useState } from "react";
import fig23 from "../../imgs/fig23.png";

const FAQ = ({ Footer }) => {
  const showFAQpage = useSelector((state) => state.security.showFAQpage);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      id: "faq1",
      question: "I cannot access ViewBovis",
      answer:
        "The server is available between 6am and 10pm. It is offline outside of these hours.",
    },
    {
      id: "faq2",
      question: "ViewBovis is taking a long time to load / is loading slowly",
      answer:
        "If the application is slow, try switching browsers or clearing your browser cache.",
    },
    {
      id: "faq3",
      question: "I cannot access the SCE Authenticated Portal",
      answer:
        "You must accept the SCE terms and conditions of use to gain access. These are sent annually by email from the SCE.",
    },
    {
      id: "faq4",
      question: "I cannot access the Training Video links",
      answer:
        "The training videos can be found in the Field Epidemiology Knowledge Forum on SharePoint. Navigate to: Libraries → Shared Documents → Training → ViewBovis Training → OFFICIAL-SENSITIVE ViewBovis Training Material → Training Videos.",
    },
    {
      id: "faq5",
      question: "I cannot access the Support Documents",
      answer:
        "Support documents can be found in the Field Epidemiology Knowledge Forum on SharePoint. Navigate to: Libraries → Shared Documents → Training → ViewBovis Training → OFFICIAL-SENSITIVE ViewBovis Training Material. All relevant support documents are available there.",
    },
    {
      id: "faq6",
      question:
        "Why am I receiving ‘Invalid Submission’ message when I search for a sample?",
      answer:
        "An 'Invalid Submission' means the sample does not exist in the ViewBovis database, likely because it has not yet been sequenced. ViewBovis data is updated on the 1st of every month. If WGS (Whole Genome Sequencing) was not completed in time, the sample will appear in the next monthly update.",
    },
    {
      id: "faq7",
      question:
        "Why am I receiving ‘Excluded submission, Reason: low quality data’ message when I search for a sample?",
      answer:
        "‘Low quality data’ samples are excluded from phylogenetic analysis when the sequence data contains too many undetermined bases in the sequence as their inclusion skews the tree structure. However, the underlying reason for this is usually that the cultures sent for sequencing have low level contamination.",
    },
    {
      id: "faq8",
      question: "Sample is missing metadata (e.g. location of badger)",
      answer:
        "  If location data is missing, it means the information was not supplied. This is often due to sensitivities around the BCP(Badger Control Policy).",
    },
    {
      id: "faq9",
      question: "Sample is causing an error due to missing metadata",
      answer:
        "If a sample appears on Nextstrain but lacks a location, a 'Something went wrong' error message may occur because of missing metadata (e.g. location).",
    },
    {
      id: "faq10",
      question: "I cannot filter for multiple samples in Nextstrain",
      answer:
        "  The selected filter categories must be the same to view multiple samples in Nextstrain. For example, Submission: AF-21-06299-21 and Submission: AF-61-04715-19 can be viewed together on Nextstrain. But Submission: AF-21-06299-21 and Identifier: UK202580602658 cannot be viewed together.",
    },
    {
      id: "faq11",
      question:
        "Why do some samples from the same CPH appear ‘out of home range’ even though they are identical and assigned to the same clade?",
      answer:
        "Home ranges for each clade are updated on an annual basis. If samples are from different years, it is possible that the home range may have changed in the intervening period.",
    },

    {
      id: "faq12",
      question: "How do I calculate the SNP distance between samples?",
      answer: (
        <>
          <p>
            To calculate the SNP distance between samples, add together the SNP
            distances between the connecting nodes. For example, using the SNP
            distance between samples A and E in the figure below: from sample A
            to the nearest node is <b>2 SNPs</b>, then from that node to the
            node shared by A and E is <b>1 SNP</b>, and finally from the shared
            node to sample E is <b>5 SNPs</b>. Adding these SNP distances
            together (2 + 1 + 5 = 8) gives a total SNP distance of <b>8 SNPs</b>{" "}
            between A and E.
          </p>
          <img src={fig23} alt="SNP distance diagram" className="faq-snp-img" />
        </>
      ),
    },
    {
      id: "faq13",
      question: "What should I do if I spot an unexpected problem?",
      answer:
        "Please report the issue on the ViewBovis User Forum on Microsoft Teams.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question
      .concat(faq.answer)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  return (
    <div className={showFAQpage ? "container-fluid" : "hidden"}>
      <div>
        <p className="fw-bold fs-4">Frequently Asked Questions</p>
        <div className="faqsearch-box">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && <button onClick={() => setSearchTerm("")}>x</button>}
        </div>

        {filteredFaqs.map((faq, index) => (
          <div className="accordion" key={faq.id}>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${faq.id}`}
                  aria-expanded="true"
                  aria-controls={faq.id}
                >
                  <b>{faq.question}</b>
                </button>
              </h2>
              <div id={faq.id} className="accordion-collapse collapse">
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          </div>
        ))}

        {filteredFaqs.length === 0 && <p>No results found.</p>}
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
