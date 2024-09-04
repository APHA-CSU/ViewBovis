import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const NextstrainIframe = ({ url, setNextstrainURL }) => {
  const navbarHeight = useSelector((state) => state.security.navbarHeight);

  return (
    <div
      className="container-fluid"
      style={{
        height: `calc(99.5vh - ${navbarHeight}px)`,
      }}
    >
      <button
        style={{ position: "absolute" }}
        className="nextstrain-backbutton"
        onClick={() => {
          setNextstrainURL(null);
        }}
      >
        <span id="back-to-start-page-text">
          <svg
            style={{ marginBottom: "3px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="white"
            class="bi bi-caret-left-fill"
            viewBox="0 0 16 16"
          >
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
          </svg>
          Back
        </span>
      </button>
      <iframe
        title="nextstrain-viewbovis"
        className="nextstrain-iframe-container"
        key={url}
        src={
          "https://hosting.int.sce.network/http/nextstrain-beta.int.sce.network/" +
          url
        }
      ></iframe>
    </div>
  );
};

NextstrainIframe.propTypes = {
  url: PropTypes.string,
  setNextstrainURL: PropTypes.func,
};
export default NextstrainIframe;
