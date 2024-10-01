import "./LoadingScreen.css";
import PropTypes from "prop-types";
const LoadingScreen = ({ message }) => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <p className="loading-text">
        {message}
        {""}
        <span className="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
    </div>
  );
};
LoadingScreen.propTypes = {
  message: PropTypes.string.isRequired,
};
export default LoadingScreen;
