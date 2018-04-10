const newCourse = (
  state = { chatBots: [], courses: [], open: false },
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
    default:
      return state;
  }
};

export default newCourse;
