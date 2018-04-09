const newCourse = (state = { chatBots: [] }, action) => {
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
    default:
      return state;
  }
};

export default newCourse;
