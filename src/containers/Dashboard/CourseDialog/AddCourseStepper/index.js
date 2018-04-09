import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import axios from 'axios';

import CustomSelect from '../../../CustomSelect';
import {
  registerTitle,
  registerDescription
} from '../../../../modules/actions';

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
    this.postNewCourse = this.postNewCourse.bind(this);
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <NewCourseInfo />;
      case 1:
        return (
          <CustomSelect
            required
            value={this.state.courseCreation.group}
            title="Select chat bot"
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

  postNewCourse() {
    axios
      .post('/api/courses', {
        chatBotId: this.props.chatBotId,
        name: this.props.title,
        description: this.props.description
      })
      .then(response => {
        console.log(response);
        // TODO: closing and creation working; Don't forget to dispatch an action to clear newCourse information
        this.props.myClick();
      })
      .catch(error => {
        console.log(error);
        this.props.myClick();
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
            {this.getStepContent(activeStep)}
            <div style={{ marginTop: '45px' }}>
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
                    ? this.postNewCourse()
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

const mapStateToStepperProps = state => {
  return {
    title: state.newCourse.title,
    description: state.newCourse.description,
    chatBotId: state.newCourse.chatBot
  };
};

let NewCourseSummary = ({ title, description, chatBot }) => {
  return (
    <div>
      <FormControl readOnly className="courseCreationFormControl" fullWidth>
        <InputLabel htmlFor="name-simple">Course title</InputLabel>
        <Input id="name-simple" value={title} />
      </FormControl>
      <FormControl readOnly className="courseCreationFormControl" fullWidth>
        <InputLabel htmlFor="description-simple">Course description</InputLabel>
        <Input multiline rows={5} id="description-simple" value={description} />
      </FormControl>
      <FormControl readOnly className="courseCreationFormControl" fullWidth>
        <InputLabel htmlFor="bot-simple">Selected chat bot</InputLabel>
        <Input id="bot-simple" value={chatBot.name || ''} />
      </FormControl>
    </div>
  );
};

const mapStateFinishToProps = state => {
  let bot = state.newCourse.chatBots.filter(el => {
    return el.chatBotId === state.newCourse.chatBot;
  });

  return {
    title: state.newCourse.title,
    description: state.newCourse.description,
    chatBot: bot[0]
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
    <form autoComplete="off">
      <TextField
        id="title"
        fullWidth
        label="Course title"
        required
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
        multiline
        rows={5}
        required
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

export default withStyles(styles)(
  connect(mapStateToStepperProps, null)(AddCourseStepper)
);
