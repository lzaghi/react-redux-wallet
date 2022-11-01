import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div className="header">
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">
          {
            expenses.reduce((acc, curr) => (
              acc + (
                Number(curr.value) * (
                  Number(curr.exchangeRates[curr.currency].ask)
                )
              )
            ), 0).toFixed(2)
          }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
