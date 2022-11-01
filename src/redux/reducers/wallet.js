// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCHING, FETCH_SUCCESS, FETCH_FAIL, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
  error: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCHING:
    return {
      ...state,
      isFetching: true,
    };
  case FETCH_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currencies: Object.keys(action.data).filter((currency) => currency !== 'USDT'),
      data: action.data,
    };
  case FETCH_FAIL:
    return {
      ...state,
      isFetching: false,
      error: action.error,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      isFetching: false,
      expenses: action.item,
    };
  default:
    return state;
  }
};

export default wallet;
