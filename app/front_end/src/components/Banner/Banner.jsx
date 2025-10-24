import React from "react";

const Banner = () => {
  return (
    <div className="row alpha-side-margin">
      <div className="govuk-phase-banner ">
        <div>
          <strong className="govuk-tag govuk-phase-banner__content__tag">
            BETA
          </strong>
          <span>
            This is a new service &ndash; your{" "}
            <a
              className="text-hyperlink"
              href="https://forms.office.com/e/RXTi1RzGnF"
              target="_blank"
              rel="noreferrer"
            >
              feedback
            </a>{" "}
            will help us to improve it.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
