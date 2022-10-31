// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const FETCHING = 'FETCHING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const fetchCurrencies = () => ({
  type: FETCHING,
});

export const fetchSuccess = (json) => ({
  type: FETCH_SUCCESS,
  data: Object.keys(json).filter((currency) => currency !== 'USDT'),
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
