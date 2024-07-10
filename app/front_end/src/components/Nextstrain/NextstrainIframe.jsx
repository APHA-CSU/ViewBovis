import PropTypes from "prop-types";
import { useEffect } from "react";
const NextstrainIframe = ({ url, setNextstrainURL }) => {
  useEffect(() => {
    console.log(url);
  }, [url]);
  return (
    <>
      <div>
      <button
            className="govuk-button"
            onClick={()=> {setNextstrainURL(null)}}
          >
            Back
          </button>
      </div>
      <div style={{height:"70vh"}}>
      {url && ( 
        <iframe
          title="nextstrain-viewbovis"
          src={"http://localhost:4001/" + url}
          id="nextstrain-iframe"
          height={"100%"}
          width={"100%"}
        ></iframe>
      )}</div>
    </>
  );
};

NextstrainIframe.propTypes = { url: PropTypes.string , setNextstrainURL : PropTypes.string};
export default NextstrainIframe;
