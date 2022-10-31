import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    return (
      <form>
        <input
          data-testid="value-input"
          type="number"
          name="expense"
          placeholder="Despesa"
        />
      </form>
    );
  }
}

export default WalletForm;
