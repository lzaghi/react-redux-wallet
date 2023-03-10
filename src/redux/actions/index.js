// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const FETCHING = 'FETCHING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDITING = 'EDITING';
export const EDITED = 'EDITED';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const fetchCurrencies = () => ({
  type: FETCHING,
});

export const fetchSuccess = (json) => ({
  type: FETCH_SUCCESS,
  data: json,
});

export const fetchFail = (error) => ({
  type: FETCH_FAIL,
  error,
});

export const fetchAPI = () => (dispatch) => {
  dispatch(fetchCurrencies());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => dispatch(fetchSuccess(json)))
    .catch((error) => dispatch(fetchFail(error)));
};

export const addExpense = (expenses, item) => ({
  type: ADD_EXPENSE,
  item: item ? [...expenses, item] : [...expenses],
});

export const startEditing = (itemID) => ({
  type: EDITING,
  idToEdit: itemID,
});

export const finishEditing = () => ({
  type: EDITED,
});
