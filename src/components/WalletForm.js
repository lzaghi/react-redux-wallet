import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense, fetchAPI, finishEditing } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveExpenses = () => {
    const { dispatch } = this.props;
    dispatch(fetchAPI());

    const { expenses, data } = this.props;
    const expenseItem = { id: expenses.length, ...this.state, exchangeRates: data };
    dispatch(addExpense(expenses, expenseItem));

    this.setState({ value: '', description: '' });
  };

  updateExpenses = () => {
    const { dispatch, expenses, idToEdit } = this.props;

    const updatedItem = { ...expenses[idToEdit], ...this.state };

    expenses[idToEdit] = updatedItem;

    dispatch(addExpense(expenses));
    this.setState({ value: '', description: '' });

    dispatch(finishEditing());
  };

  render() {
    const { isFetching, currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      isFetching
        ? <p>Carregando...</p>
        : (
          <form>
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              placeholder="Valor"
              onChange={ this.handleChange }
            />
            <input
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              placeholder="Descrição"
              onChange={ this.handleChange }
            />
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((curr, index) => (
                <option key={ index }>{curr}</option>
              ))}
            </select>
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
            { editor
              ? (
                <button
                  type="button"
                  onClick={ this.updateExpenses }
                >
                  Editar despesa
                </button>
              )
              : (
                <button
                  type="button"
                  onClick={ this.saveExpenses }
                >
                  Adicionar despesa
                </button>
              )}
          </form>
        )
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  expenses: state.wallet.expenses,
  data: state.wallet.data,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.defaultProps = {
  data: {},
};

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  data: PropTypes.shape(),
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
