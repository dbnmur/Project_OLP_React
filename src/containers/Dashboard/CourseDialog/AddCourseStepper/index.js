import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';

import CustomSelect from '../../../CustomSelect';
import {
  registerTitle,
  registerDescription
} from '../../../../modules/actions';

const styles = theme => ({
  root: {
    minWidth: '90%',
    height: '300px'
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

class AddCourseStepper extends React.Component {
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
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <NewCourseInfo />;
      case 1:
        return (
          <CustomSelect
            value={this.state.courseCreation.group}
            title="Select chat bot"
            menuItems={this.props.groups}
          />
        );
      case 2:
        return <NewCourseSummary />;
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
            {this.getStepContent(activeStep)}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={this.handleBack}
                className={classes.button}>
                Back
              </Button>
              <Button
                variant="raised"
                color="primary"
                onClick={
                  activeStep === steps.length - 1
                    ? this.props.myClick
                    : this.handleNext
                }
                className={classes.button}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let NewCourseSummary = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h1>{description}</h1>
    </div>
  );
};

const mapStateFinishToProps = state => {
  return {
    title: state.newCourse.title,
    description: state.newCourse.description
  };
};

NewCourseSummary = connect(mapStateFinishToProps, {})(NewCourseSummary);

let NewCourseInfo = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange
}) => {
  return (
    <form className="loginForm" autoComplete="off">
      <TextField
        id="title"
        fullWidth
        label="Course title"
        margin="normal"
        value={title || ''}
        onChange={e => {
          e.preventDefault();
          onTitleChange(e.target.value);
        }}
      />
      <TextField
        id="description"
        label="Description"
        type="text"
        fullWidth
        margin="normal"
        value={description || ''}
        onChange={e => {
          e.preventDefault();
          onDescriptionChange(e.target.value);
        }}
      />
    </form>
  );
};

const mapStateToProps = state => {
  return {
    title: state.newCourse.title,
    description: state.newCourse.description
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTitleChange: text => {
      dispatch(registerTitle(text));
    },
    onDescriptionChange: description => {
      dispatch(registerDescription(description));
    }
  };
};

NewCourseInfo = connect(mapStateToProps, mapDispatchToProps)(NewCourseInfo);

export default withStyles(styles)(AddCourseStepper);
