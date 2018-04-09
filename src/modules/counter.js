const newCourse = (state = {}, action) => {
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
    case 'REGISTER_GROUP':
      return {
        group: action.group
      };
    default:
      return state;
  }
};

export default newCourse;
