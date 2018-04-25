const newCourse = (
  state = {
    chatBots: [],
    courses: [],
    open: false,
    isTeacher: false,
    botResponse: {},
    exercises: []
  },
  action
) => {
  switch (action.type) {
    case 'REGISTER_TITLE':
      return {
        ...state,
        title: action.title
      };
    case 'REGISTER_DESCRIPTION':
      return {
        ...state,
        description: action.description
      };
    case 'REGISTER_CHAT_BOT':
      return {
        ...state,
        chatBot: action.chatBot
      };
    case 'ADD_CHAT_BOT':
      return {
        ...state,
        chatBots: [
          ...state.chatBots,
          {
            chatBotId: action.chatBotId,
            name: action.name
          }
        ]
      };
    case 'ADD_COURSE':
      return {
        ...state,
        courses: [
          ...state.courses,
          {
            courseId: action.courseId,
            name: action.name,
            description: action.description,
            chatBotId: action.chatBotId
          }
        ]
      };
    case 'IS_COURSE_DIALOG_OPEN':
      return {
        ...state,
        open: action.open
      };
    case 'IS_TEACHER':
      return {
        ...state,
        isTeacher: action.isTeacher
      };
    case 'CATCH_BOT_RESPONSE':
      return {
        ...state,
        botResponse: action.botResponse
      };
    case 'ADD_EXERCISE':
      return {
        ...state,
        exercises: [
          ...state.exercises,
          {
            ...action.exercise
          }
        ]
      };
    default:
      return state;
  }
};

export default newCourse;
