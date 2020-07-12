import axios from 'axios';
const url = 'https://prescriptionholder.herokuapp.com';

class Request {
  async addPrescription(patient_name, tablets, token) {
    return await axios.post(
      url + '/insertNew',
      {
        patient_name: patient_name,
        tablets: tablets,
      },
      {
        headers: {authToken: token},
      },
    );
  }

  async deletePrescription(patient_name, token) {
    return await axios.post(
      url + '/remove',
      {},
      {
        headers: {authToken: token, pName: patient_name},
      },
    );
  }
  async upDatePrescription(patient_name, tablets, token) {
    return await axios.post(
      url + '/update',
      {
        patient_name: patient_name,
        tablets: tablets,
      },
      {
        headers: {authToken: token},
      },
    );
  }

  async getAllPrescription(token) {
    return await axios.get(url + '/getAll', {
      headers: {authToken: token},
    });
  }

  async login(email, password) {
    return await axios.post(url + '/login', {
      email: email,
      password: password,
    });
  }

  async register(firstName, lastName, email, password) {
    return await axios.post(url + '/registerUser', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
  }
}
export default new Request();
