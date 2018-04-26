export const registerDescription = description => {
  return {
    type: 'REGISTER_DESCRIPTION',
    description
  };
};

export const registerTitle = title => {
  return {
    type: 'REGISTER_TITLE',
    title
  };
};

export const registerChatBot = chatBot => {
  return {
    type: 'REGISTER_CHAT_BOT',
    chatBot
  };
};

export const addChatBot = ({ chatBotId, name }) => {
  return {
    type: 'ADD_CHAT_BOT',
    chatBotId,
    name
  };
};

export const addCourse = ({ name, description, chatBotId, courseId }) => {
  return {
    type: 'ADD_COURSE',
    courseId,
    name,
    description,
    chatBotId
  };
};

export const toggleCourseDialog = open => {
  return {
    type: 'IS_COURSE_DIALOG_OPEN',
    open
  };
};

export const isTeacher = isTeacher => {
  return {
    type: 'IS_TEACHER',
    isTeacher
  };
};

export const catchBotResponse = botResponse => {
  return {
    type: 'CATCH_BOT_RESPONSE',
    botResponse: {
      ...botResponse
    }
  };
};

export const addExercise = exercise => {
  return {
    type: 'ADD_EXERCISE',
    exercise: {
      ...exercise
    }
  };
};
