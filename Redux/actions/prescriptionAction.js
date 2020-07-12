//get prescription
import axios from 'axios';
const url = 'https://prescriptionholder.herokuapp.com';

export const getPrescription = payload => async dispatch => {
  //   try {
  //     dispatch({type: 'GET_Prescription', payload: payload});
  //   } catch (err) {}
};

export const getPrescriptions = token => {
  return dispatch => {
    fetch(url + '/getAll', {
      method: 'GET',
      headers: {authToken: token},
    })
      .then(response => response.json())
      .then(json => {
        //console.log(json[0]);
        dispatch({type: 'GET_PRESCRIPTIONS', payload: json[0].patient_list});
      })
      .catch(err => {
        console.log(err);
      });
  };

  //   try {
  //   } catch (err) {}
};

export const setPrescription = prescription => {
  console.log(prescription);
  return {
    type: 'GET_PRESCRIPTIONS',
    payload: prescription,
  };
};

export const setToken = authToken => {
  // console.log('setPrescription  ' + prescription);
  return {
    type: 'SET_TOKEN',
    payload: authToken,
  };
};
