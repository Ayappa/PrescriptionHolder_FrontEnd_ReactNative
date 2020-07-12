const initialState = {
  prescriptions: [],
  authToken: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRESCRIPTIONS':
      return {
        ...state,
        prescriptions: action.payload,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        authToken: action.payload,
      };

    default:
      return state;
  }
};
