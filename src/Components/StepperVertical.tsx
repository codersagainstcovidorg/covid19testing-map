import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }),
);

function getSteps() {
  return ['Get the facts', 'Make an appointment', 'Find your way'];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return `If you're feeling well or only have mild symptoms, it's best to 
              touch base with your local health department before seeing a doctor.
              That's because people who live in areas with limited COVID-19 testing 
              capacity will require approval from public health officials before 
              they are tested.`;
    case 1:
      return `If you have fever, chills, cough, headache or another flu-like symptom
              do NOT walk into a clinic or hospital. You may be turned away
              and asked to make an appointment. Many providers around the country
              offer telemedicine visits for COVID-19 evaluations at no charge. 
              Some providers even allow patients to book appointments online. Click 
              around the map to find the healthcare provider that meets your needs.
              `;
    case 2:
      return `If you are eligible for testing based on public health guidelines, you'll 
              be given directions to the nearest COVID-19 specimen collection area. 
              This may be an isolated area within the same healthcare facility, 
              a nearby clinical lab, or even a specially-designated area at a your local 
              DMV office. The key thing to remember is to follow directions and to allow
              yourself plenty of time to get there - especially if your are given an 
              appointment for this part of the process.`;
    default:
      return 'Unknown step';
  }
}

export const VerticalLinearStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Depending on the number of pending tests in your area, 
            it may take up to a few days to get results. Make sure to 
            STRICTLY adhere to the self-isolation guidelines set forth by 
            your doctor and/or public health department. Unless you are explicitly
            told otherwise, you MUST complete your self-isolation period - even if
            your test result is negative for COVID-19. 
            </Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}