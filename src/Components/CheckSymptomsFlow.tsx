import React, { useState } from 'react';
import InfoAlert from './LocationModal/InfoAlert';
import ShortQuestionAlert from './LocationModal/ShortQuestionAlert';

interface SymptomsFlowProps {
  location: any;
  toggleFilter: Function;
  setFlowFinished: Function;
}

function CheckSymptomsFlow({
  location,
  toggleFilter,
  setFlowFinished,
}: SymptomsFlowProps) {
  const [showNeedHelp, setShowNeedHelp] = useState(false);
  const [showMapUpdatedAlert, setShowMapUpdatedAlert] = useState(false);
  const [showNavigateAwayAlert, setShowNavigateAwayAlert] = useState(true);
  const [
    showSelfAssessmentCompletedAlert,
    setShowSelfAssessmentCompletedAlert,
  ] = useState(false);

  function mapUpdateAgreed() {
    setShowMapUpdatedAlert(false);
    setFlowFinished();
    setShowNavigateAwayAlert(true);
  }

  function completedAssessment() {
    setShowSelfAssessmentCompletedAlert(false);
    setShowNeedHelp(true);
  }

  function didNotCompleteAssessment() {
    setShowSelfAssessmentCompletedAlert(false);
  }

  function needHelp() {
    toggleFilter('is_collecting_samples', true);
    setShowNeedHelp(false);
    setShowMapUpdatedAlert(true);
  }

  function doesNotNeedHelp() {
    setShowNeedHelp(false);
  }

  function navigateAwayAgreed() {
    setShowNavigateAwayAlert(false);
    window.open(
      location.location_contact_url_covid_screening_tool === '' ||
        location.location_contact_url_covid_screening_tool === null ||
        location.location_contact_url_covid_screening_tool.length < 4
        ? 'https://www.apple.com/covid19/'
        : location.location_contact_url_covid_screening_tool,
      '_blank'
    );
    setShowSelfAssessmentCompletedAlert(true);
  }

  return (
    <div>
      <InfoAlert
        showAlert={showNavigateAwayAlert}
        okClicked={navigateAwayAgreed}
        title="Navigating to the Symptom Checker"
        body="I’m about to open another window that will load the symptom checker used by this testing location. Once you complete the assessment, come back here to continue. Click OK to continue."
      />
      <ShortQuestionAlert
        showAlert={showSelfAssessmentCompletedAlert}
        yesSelected={completedAssessment}
        noSelected={didNotCompleteAssessment}
        questionText="Were you able to complete the self-assessment?"
      />
      <ShortQuestionAlert
        showAlert={showNeedHelp}
        yesSelected={needHelp}
        noSelected={doesNotNeedHelp}
        questionText="Based on the results of the self-assessment: do you need help finding a testing location near you?"
      />
      <InfoAlert
        showAlert={showMapUpdatedAlert}
        okClicked={mapUpdateAgreed}
        title="Map Updated"
        body="I’ve updated the map, the remaining pins represent locations that are capable of perform the actual test. Carefully review the instructions for each location and select the one that seems to be a good fit. I will highlight any locations with additional requirements or special features, such as appointments or telemedicine visits."
      />
    </div>
  );
}

export default CheckSymptomsFlow;
