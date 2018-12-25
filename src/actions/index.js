import axios from 'axios';

import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from './types';

// RENTALS ACTIONS ------>

const fetchRentalByIdInit = () => {

  return {
    type: FETCH_RENTAL_BY_ID_INIT
  }
}

export const fetchRentalByIdSuccess = (rental) => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  }
}

const fetchRentalsSuccess = (rentals) => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals
  }
}

export const fetchRentals = () => {
  return dispatch => {

    axios.get('/api/v1/rentals')
      .then(res => res.data)
      .then(rentals => dispatch(fetchRentalsSuccess(rentals))
      );
  }
}

export const fetchRentalById = (rentalId) => {

  return function (dispatch) {
    dispatch(fetchRentalByIdInit());

    axios.get(`/api/v1/rentals/${rentalId}`)
      .then(res => res.data)
      .then(rental => dispatch(fetchRentalByIdSuccess(rental))
      );
  }
}

// AUTH ACTIONS --------------------->

export const register = userData => {
  return axios.post('/api/v1/users/register', { ...userData }).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS,
    token
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors
  }
}

export const login = (userData) => {
  return dispatch => {
    return axios.post('/api/v1/users/auth', { ...userData })
    .then(res => res.data)
    .then(token => {
      debugger;
      localStorage.setItem('auth_token', token);
      dispatch(loginSuccess(token));
    })
    .catch(({response}) => {
      debugger;
      dispatch(loginFailure(response.data.errors));
    })
  }
} 