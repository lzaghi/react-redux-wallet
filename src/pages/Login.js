import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  };

  verifyEmail = (email) => {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return emailRegex.test(email);
  };

  validateForm = () => {
    const { email, password } = this.state;
    const FIVE = 5;

    const filledForm = this.verifyEmail(email)
      && password.length > FIVE;

    this.setState({ disabled: !filledForm });
  };

  dispatchAndRedirect = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;

    dispatch(loginAction(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, disabled } = this.state;
    return (
      <>
        <h1>TrybeWallet</h1>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          placeholder="E-mail"
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          placeholder="Senha"
          onChange={ this.handleChange }

        />
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.dispatchAndRedirect }
        >
          Entrar
        </button>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
