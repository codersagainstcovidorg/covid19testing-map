import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { TESTING_CRITERIA_URL_CDC } from '../constants';
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
        title="Review testing criteria"
      >
        Testing at this location is only offered to individuals that meet specific criteria.
        The CDC publishes {' '}
        <ReactGA.OutboundLink
        eventLabel="Check Symptoms: CDC Testing Criteria"
        to={TESTING_CRITERIA_URL_CDC}
        target="_blank">
         guidance
        </ReactGA.OutboundLink>
        {' '}
        for who should be tested, but decisions about testing are at the discretion 
        of state and local health departments and/or individual clinicians.
        
        To learn whether you are a candidate for COVID-19 testing at this location, 
        you will need to complete a self-assessment. Please return to this page 
        once you are finished. 
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
        Sorry that didn`&apos;`t work out for you... Would you like to try a
        different assessment check?
      </ShortQuestionAlert>
      <InfoAlert
        showAlert={showMapUpdatedAlert}
        okClicked={mapUpdateAgreed}
        modalClose={modalClose}
        title="Map Updated"
      >
        I’ve updated the map, the remaining pins represent locations that are
        capable of perform the actual test. Carefully review the instructions
        for each location and select the one that seems to be a good fit. I will
        highlight any locations with additional requirements or special
        features, such as appointments or telemedicine visits.
      </InfoAlert>
      <InfoAlert
        showAlert={showAdditionalRefusedInfo}
        okClicked={additionalRefusedDismissed}
        modalClose={modalClose}
        title="Self Assessment Recommended"
      >
        Without the results of a self-assessment, we won’t be able to
        personalize the results any further. Please review location details for
        additional information.
      </InfoAlert>
      <InfoAlert
        showAlert={showFailedCriteria}
        okClicked={failedCriteriaDismissed}
        modalClose={modalClose}
        title="Criteria Not Met"
      >
        According to CDC guidelines, not everyone needs to be tested for
        COVID-19. There are limited options if you don’t meet the testing
        criteria.
      </InfoAlert>
    </div>
  );
}

export default CheckSymptomsFlow;
