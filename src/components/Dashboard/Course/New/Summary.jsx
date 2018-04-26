import React from 'react';
import { connect } from 'react-redux';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

const CourseNewSummary = ({ title, description, chatBot }) => {
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
        <Input id="bot-simple" value={chatBot.name} />
      </FormControl>
    </div>
  );
};

const mapStateFinishToProps = state => {
  let bot;

  if (!state.newCourse.chatBot) {
    bot = '';
  } else {
    bot = state.newCourse.chatBots.filter(el => {
      return el.chatBotId === state.newCourse.chatBot;
    });
    bot = bot[0];
  }

  return {
    title: state.newCourse.title,
    description: state.newCourse.description,
    chatBot: bot
  };
};

export default connect(mapStateFinishToProps, {})(CourseNewSummary);
