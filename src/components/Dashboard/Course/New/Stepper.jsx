import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import axios from 'axios';

import CustomSelect from '../../../CustomSelect';
import CourseNewSummary from './Summary';
import CourseNewInfo from './Info';
import { toggleCourseDialog, addCourse } from '../../../../modules/actions';

const styles = theme => ({
  root: {
    minWidth: '90%',
    height: '450px'
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return [
    'Provide general course information',
    'Select Chat Bot for this course',
    'Confirm course creation'
  ];
}

class CourseNewStepper extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      courseCreation: {
        title: '',
        description: '',
        group: []
      }
    };

    this.getStepContent = this.getStepContent.bind(this);
    this.postNewCourse = this.postNewCourse.bind(this);
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <CourseNewInfo />;
      case 1:
        return (
          <CustomSelect
            required
            value={this.state.courseCreation.group}
            title="Select chat bot"
          />
        );
      case 2:
        return <CourseNewSummary />;
      default:
        return 'Unknown step';
    }
  }

  isStepOptional = step => {
    return step === 1;
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  postNewCourse() {
    axios
      .post('/api/courses', {
        chatBotId: this.props.chatBotId,
        name: this.props.title,
        description: this.props.description
      })
      .then(response => {
        this.props.onFinish(false);
        this.props.onCourseAdd(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          <div>
            <div style={{ height: '250px' }}>
              {this.getStepContent(activeStep)}
            </div>
            <div style={{ marginTop: '45px' }}>
              <Button
                disabled={activeStep === 0}
                onClick={this.handleBack}
                className={classes.button}>
                Back
              </Button>
              <Button
                disabled={!this.props.title}
                variant="raised"
                color="primary"
                onClick={
                  activeStep === steps.length - 1
                    ? this.postNewCourse
                    : this.handleNext
                }
                className={classes.button}>
                {activeStep === steps.length - 1 ? 'Add course' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToStepperProps = state => {
  return {
    title: state.newCourse.title,
    description: state.newCourse.description,
    chatBotId: state.newCourse.chatBot,
    open: state.newCourse.open,
    error: state.newCourse.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFinish: open => {
      dispatch(toggleCourseDialog(open));
    },
    onCourseAdd: course => {
      dispatch(addCourse(course));
    }
  };
};

export default withStyles(styles)(
  connect(mapStateToStepperProps, mapDispatchToProps)(CourseNewStepper)
);
