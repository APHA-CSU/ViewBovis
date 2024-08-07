import PropTypes from "prop-types";

const NextstrainIframe = ({ url, setNextstrainURL }) => {
  return (
    <>
      <div>
        <button
        style={{fontSize:"14px"}}
          className="govuk-button"
          onClick={() => {
            setNextstrainURL(null);
          }}
        >
          <svg
            style={{marginBottom: "3px"}}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="white"
            class="bi bi-caret-left-fill"
            viewBox="0 0 16 16"
          >
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"></path>
          </svg>
          Back
        </button>
      </div>
      <div style={{ height: "70vh" }}>
        {url && (
          <iframe
            title="nextstrain-viewbovis"
            src={"http://localhost:4001/" + url}
            id="nextstrain-iframe"
            height={"100%"}
            width={"100%"}
          ></iframe>
        )}
      </div>
    </>
  );
};

NextstrainIframe.propTypes = {
  url: PropTypes.string,
  setNextstrainURL: PropTypes.string,
};
export default NextstrainIframe;
