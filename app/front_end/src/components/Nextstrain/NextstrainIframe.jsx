import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const NextstrainIframe = ({ url, setNextstrainURL }) => {
  const navbarHeight = useSelector((state) => state.security.navbarHeight);

  return (
    <div
      className="container-fluid"
      style={{
        height: `calc(99.5vh - ${navbarHeight}px)`,
        display: "flex",
        alignItems: "stretch"
      }}
    >
      <div
        className="nextstrain-backbutton-container row"
      >
        <button
          className="govuk-button nextstrain-backbutton"
          onClick={() => {
            setNextstrainURL(null);
          }}
        >
          <span className="nextstrain-backbutton-contents">
            <svg
              style={{ marginBottom: "3px", rotate: "90deg" }}
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
          </span>
        </button>
      </div>
      <div className="nextstrain-iframe-container row">
        {url && (
          <iframe
            title="nextstrain-viewbovis"
            src={
              "https://hosting.int.sce.network/http/nextstrain-beta.int.sce.network/" +
              url
            }
            id="nextstrain-iframe"
            height={"100%"}
            width={"100%"}
          ></iframe>
        )}
      </div>
    </div>
  );
};

NextstrainIframe.propTypes = {
  url: PropTypes.string,
  setNextstrainURL: PropTypes.string,
};
export default NextstrainIframe;
