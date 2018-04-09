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
