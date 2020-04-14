import React, { useEffect, useState } from 'react';
import InfoAlert from './LocationModal/InfoAlert';
import ShortQuestionAlert from './LocationModal/ShortQuestionAlert';
import ActionType from './ActionType';

interface AppointmentFlowProps {
  urlToRender: string;
  setFlowFinished: Function;
  actionType: ActionType;
}

function AppointmentFlow({
  urlToRender,
  actionType,
  setFlowFinished,
}: AppointmentFlowProps) {
  const isWebsite =
    actionType === ActionType.Visit || actionType === ActionType.WebAppointment;
  const [showWebAlert, setShowWebAlert] = useState(isWebsite);
  const [showPhoneAlert, setShowPhoneAlert] = useState(!isWebsite);
  const [showPhoneFeedback, setShowPhoneFeedback] = useState(false);
  const [showAppointmentFeedback, setShowAppointmentFeedback] = useState(false);
  const [showTelmedFeedback, setShowTelmedFeedback] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showClosing, setShowClosing] = useState(false);
  const [showErrorReport, setShowErrorReport] = useState(false);
  function modalClose() {
    setFlowFinished();
  }
  return (
    <div>
      {isWebsite ? (
        <InfoAlert
          showAlert={showWebAlert}
          okClicked={() => {
            setShowWebAlert(false);
            window.open(urlToRender, '_blank');
            if (actionType === ActionType.Visit) {
              setShowTelmedFeedback(true);
            } else {
              setShowAppointmentFeedback(true);
            }
          }}
          modalClose={modalClose}
          title="Navigating Away"
        >
          I’m about to open another window to a website with instructions on how
          to proceed. Once you’re finished, please return here to wrap things
          up. Click OK to continue.
        </InfoAlert>
      ) : (
        <ShortQuestionAlert
          showAlert={showPhoneAlert}
          yesSelected={() => {
            setShowPhoneAlert(false);
            window.open(urlToRender, '_blank');
            if (actionType === ActionType.CallAppointment) {
              setShowAppointmentFeedback(true);
            } else {
              setShowPhoneFeedback(true);
            }
          }}
          noSelected={() => {
            setShowPhoneAlert(false);
            modalClose();
          }}
        >
          You’re about to call the testing location to ask for instructions on
          how to proceed. Once you’re finished, please return here to wrap
          things up. Would you like to continue?
        </ShortQuestionAlert>
      )}

      <ShortQuestionAlert
        showAlert={showPhoneFeedback}
        yesSelected={() => {
          setShowPhoneFeedback(false);
          setShowThankYou(true);
        }}
        noSelected={() => {
          setShowPhoneFeedback(false);
          setShowErrorReport(true);
        }}
      >
        Were you able to reach the test location?
      </ShortQuestionAlert>

      <ShortQuestionAlert
        showAlert={showAppointmentFeedback}
        yesSelected={() => {
          setShowAppointmentFeedback(false);
          setShowThankYou(true);
        }}
        noSelected={() => {
          setShowAppointmentFeedback(false);
          setShowErrorReport(true);
        }}
      >
        Did you succeed in booking an appointment?
      </ShortQuestionAlert>

      <ShortQuestionAlert
        showAlert={showTelmedFeedback}
        yesSelected={() => {
          setShowTelmedFeedback(false);
          setShowThankYou(true);
        }}
        noSelected={() => {
          setShowTelmedFeedback(false);
          setShowErrorReport(true);
        }}
      >
        Were you able to complete your telemedicine visit?
      </ShortQuestionAlert>
      <InfoAlert
        showAlert={showThankYou}
        okClicked={() => {
          setShowThankYou(false);
          setShowClosing(true);
        }}
        modalClose={modalClose}
        title="Thank you for your feedback!"
      />
      <InfoAlert
        showAlert={showClosing}
        okClicked={modalClose}
        modalClose={modalClose}
        title="We Appreciate Your Support"
      >
        findcovidtesting.com is built by a team of 500+ volunteers that simply
        want to help others. You can help us by spreading the word with your
        friends, family, and neighbors.
      </InfoAlert>
      <InfoAlert
        showAlert={showErrorReport}
        okClicked={modalClose}
        modalClose={modalClose}
        title="Location Flagged"
      >
        We’ve flagged this location for manual review; you can help us resolve
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        the problem by{' '}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfYpEDiV8MwkBSVa7rKI_OzrmtGvclzgFzvcjxocLJncJOXDQ/viewform"
          target="_blank"
          rel="noopener noreferrer"
        >
          reporting an error
        </a>
        . You can also select another location.
      </InfoAlert>
    </div>
  );
}

export default AppointmentFlow;
