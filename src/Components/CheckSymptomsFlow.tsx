import React, { useState } from 'react';
import InfoAlert from './LocationModal/InfoAlert';
import ShortQuestionAlert from './LocationModal/ShortQuestionAlert';

interface SymptomsFlowProps {
  location: any;
  setFilter: Function;
  setFlowFinished: Function;
  fromAssistant: boolean;
}

function CheckSymptomsFlow({
  location,
  setFilter,
  setFlowFinished,
  fromAssistant,
}: SymptomsFlowProps) {
  const [showNeedHelp, setShowNeedHelp] = useState(false);
  const [showMapUpdatedAlert, setShowMapUpdatedAlert] = useState(false);
  const [showNavigateAwayAlert, setShowNavigateAwayAlert] = useState(true);
  const [
    showAdditionalAssessmentCheck,
    setShowAdditionalAssessmentCheck,
  ] = useState(false);
  const [showAdditionalRefusedInfo, setShowAdditionalRefusedInfo] = useState(
    false
  );
  const [
    showSelfAssessmentCompletedAlert,
    setShowSelfAssessmentCompletedAlert,
  ] = useState(false);
  const [appleVisited, setAppleVisited] = useState(false);
  const [showFailedCriteria, setShowFailedCriteria] = useState(false);

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
    if (appleVisited) {
      setShowAdditionalRefusedInfo(true);
    } else {
      setShowAdditionalAssessmentCheck(true);
    }
  }

  function needHelp() {
    setFilter('is_collecting_samples', true);
    setShowNeedHelp(false);
    setShowMapUpdatedAlert(true);
  }

  function doesNotNeedHelp() {
    setShowNeedHelp(false);
    setShowFailedCriteria(true);
  }

  function modalClose() {
    setFlowFinished();
  }

  function navigateAwayDismissed() {
    setShowNavigateAwayAlert(false);
    if (fromAssistant) {
      window.open(
        'https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/index.html#',
        '_blank'
      );
    } else {
      const urlToRedirect =
        location.location_contact_url_covid_screening_tool === '' ||
        location.location_contact_url_covid_screening_tool === null ||
        location.location_contact_url_covid_screening_tool.length < 4
          ? 'https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/index.html#'
          : location.location_contact_url_covid_screening_tool;
      if (urlToRedirect === 'https://www.apple.com/covid19/') {
        setAppleVisited(true);
      }
      window.open(urlToRedirect, '_blank');
    }
    setShowSelfAssessmentCompletedAlert(true);
  }
  function navigateAdditionalAgreed() {
    setShowAdditionalAssessmentCheck(false);
    window.open('https://www.apple.com/covid19/');
    setAppleVisited(true);
    setShowSelfAssessmentCompletedAlert(true);
  }
  function navigateAdditionalRefused() {
    setShowAdditionalAssessmentCheck(false);
    setShowAdditionalRefusedInfo(true);
  }

  function additionalRefusedDismissed() {
    setShowAdditionalRefusedInfo(false);
    setFlowFinished();
  }

  function failedCriteriaDismissed() {
    setShowFailedCriteria(false);
    setFlowFinished();
  }

  return (
    <div>
      <InfoAlert
        showAlert={showNavigateAwayAlert}
        okClicked={navigateAwayDismissed}
        modalClose={modalClose}
        title="Launching self-assessment"
      >
        Most locations require that individuals meet specific criteria in order to qualify for 
        testing. A self-assessment (commonly known as a "symptom checker") will launch in a separate 
        window. The assessment will help you determine whether you meet testing criteria. 
        Once you complete the assessment, please return to this page to continue.
      </InfoAlert>
      <ShortQuestionAlert
        showAlert={showSelfAssessmentCompletedAlert}
        yesSelected={completedAssessment}
        noSelected={didNotCompleteAssessment}
      >
        Were you able to complete the self-assessment?
      </ShortQuestionAlert>
      <ShortQuestionAlert
        showAlert={showNeedHelp}
        yesSelected={needHelp}
        noSelected={doesNotNeedHelp}
      >
        Based on the results of the self-assessment: do you need help finding a
        testing location near you?
      </ShortQuestionAlert>
      <ShortQuestionAlert
        showAlert={showAdditionalAssessmentCheck}
        yesSelected={navigateAdditionalAgreed}
        noSelected={navigateAdditionalRefused}
      >
        We regret that you were unable to complete the self-assessment. Would you like to try a
        different assessment check?
      </ShortQuestionAlert>
      <InfoAlert
        showAlert={showMapUpdatedAlert}
        okClicked={mapUpdateAgreed}
        modalClose={modalClose}
        title="Map Updated"
      >
        The map has been updated to include only those locations that are able to 
        perform the actual test. Carefully review the instructions
        for each location, and select the option that seems to be a good fit.
      </InfoAlert>
      <InfoAlert
        showAlert={showAdditionalRefusedInfo}
        okClicked={additionalRefusedDismissed}
        modalClose={modalClose}
        title="Self Assessment Recommended"
      >
        The personalization features require the results of a self-assessment. 
        You may continue using the website, and restart this process later, if 
        you change your mind.
      </InfoAlert>
      <InfoAlert
        showAlert={showFailedCriteria}
        okClicked={failedCriteriaDismissed}
        modalClose={modalClose}
        title="Criteria Not Met"
      >
        According to CDC guidelines, not everyone needs to be tested for
        COVID-19. There are, however, a few locations that are willing to test individuals 
        that do not meet CDC criteria. We will be adding some of these locations in 
        the coming days and weeks. 
      </InfoAlert>
    </div>
  );
}

export default CheckSymptomsFlow;
