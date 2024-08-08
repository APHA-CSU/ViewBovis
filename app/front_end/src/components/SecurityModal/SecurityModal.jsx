import "bootstrap/js/dist/modal";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../../features/counter/securitySlice";
import { useEffect, useState } from "react";

const SecurityModal = () => {
  const showModal = useSelector((state) => state.security.showModal);
  const [checked, setChecked] = useState(!showModal);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);


  return (
    <div
      role="alertdialog"
      aria-label="Disclaimer"
      className="modal fade show"
      style={{
        display: showModal ? "block" : "none",
        backgroundColor: "rgba(0,0,0,0.9)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div
          className="modal-content"
          style={{
            backgroundColor: "transparent",
            border: "none",
            width: "fit-content",
          }}
        >
          <div class="modal-body">
            <div class="govuk-notification-banner govuk-notification-banner--success">
              <div class="govuk-notification-banner__header">
                <h2
                  class="govuk-notification-banner__title"
                  id="govuk-notification-banner-title"
                >
                  Important Information
                </h2>
              </div>
              <div class="govuk-notification-banner__content">
                <div class="govuk-warning-text">
                  <span class="govuk-warning-text__icon" aria-hidden="true">
                    !
                  </span>
                  <strong class="govuk-warning-text__text">
                    Do not share login details between users
                  </strong>
                </div>
                <div>
                  <p>
                    ViewBovis displays Official Sensitive data which must only
                    be viewed by those with appropriate access. Failure to
                    comply risks shutdown of the ViewBovis service by APHA IT,
                    due to mishandling of Official Sensitive data.
                  </p>
                </div>
                <div class="govuk-form-group">
                  <div
                    class="govuk-checkboxes govuk-checkboxes--small"
                    data-module="govuk-checkboxes"
                  >
                    <div
                      class="govuk-checkboxes__item"
                      style={{ marginLeft: "33%" }}
                    >
                      <input
                        class="govuk-checkboxes__input"
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          setChecked(true);
                          setTimeout(()=>{
                            dispatch(hideModal())
                            document.body.style.overflow = "auto";
                          },2000)
                        }}
                        disabled={checked}
                      />
                      <label
                        class="govuk-label govuk-checkboxes__label"
                        for="checkbox--agree"
                      >
                        I agree to the above
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityModal;
