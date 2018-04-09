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

export const registerGroup = group => {
  return {
    type: 'REGISTER_GROUP',
    group
  };
};
