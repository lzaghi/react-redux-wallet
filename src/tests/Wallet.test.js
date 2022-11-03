import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const mock = () => {
  jest.spyOn(global, 'fetch');
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockData),
  }));
};

const CARREGANDO = 'Carregando...';
const ADD_DESPESA = 'Adicionar despesa';
const ALIMENTAÇÃO = 'Alimentação';

describe('testa componente Header', () => {
  it('testa presença de elementos de Header', () => {
    renderWithRouterAndRedux(<Wallet />);

    const emailHeader = screen.getByTestId('email-field');
    expect(emailHeader).toBeInTheDocument();

    const totalHeader = screen.getByTestId('total-field');
    expect(totalHeader).toBeInTheDocument();
    expect(totalHeader).toHaveTextContent('0.00');

    const currencyHeader = screen.getByTestId('header-currency-field');
    expect(currencyHeader).toBeInTheDocument();
    expect(currencyHeader).toHaveTextContent('BRL');
  });
});

describe('testa componente WalletForm', () => {
  it('testa presença de elementos de WalletForm', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const loading = screen.getByText(CARREGANDO);
    expect(loading).toBeInTheDocument();

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    const valueInput = screen.getByPlaceholderText('Valor');
    expect(valueInput).toBeInTheDocument();

    const descriptionInput = screen.getByPlaceholderText('Descrição');
    expect(descriptionInput).toBeInTheDocument();

    const currenciesInput = screen.getByRole('option', { name: 'USD' });
    expect(currenciesInput.selected).toBe(true);

    const methodInput = screen.getByRole('option', { name: 'Dinheiro' });
    expect(methodInput.selected).toBe(true);

    const tagInput = screen.getByRole('option', { name: ALIMENTAÇÃO });
    expect(tagInput.selected).toBe(true);

    const addButton = screen.getByRole('button', { name: ADD_DESPESA });
    expect(addButton).toBeInTheDocument();
  });

  it('testa se botão ADD_DESPESA adiciona item à lista', async () => {
    mock();

    renderWithRouterAndRedux(<Wallet />);

    const loading = screen.getByText(CARREGANDO);
    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    const valueInput = screen.getByPlaceholderText('Valor');
    const descriptionInput = screen.getByPlaceholderText('Descrição');

    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, 'sorvete');

    const addButton = screen.getByRole('button', { name: ADD_DESPESA });
    userEvent.click(addButton);

    expect(screen.getByText('sorvete')).toBeInTheDocument();
    expect(screen.getByText(ALIMENTAÇÃO)).toBeInTheDocument();
    expect(screen.getByText('Dinheiro')).toBeInTheDocument();
    expect(screen.getByText('2.00')).toBeInTheDocument();
    expect(screen.getByText('Dólar Americano/Real Brasileiro')).toBeInTheDocument();
    expect(screen.getByText('4.75')).toBeInTheDocument();
    expect(screen.getAllByText('9.51')).toHaveLength(2);
    expect(screen.getByText('Real')).toBeInTheDocument();
    const buttonExcluir = screen.getByRole('button', { name: 'Excluir' });
    expect(buttonExcluir).toBeInTheDocument();
    const buttonEditar = screen.getByRole('button', { name: 'Editar' });
    expect(buttonEditar).toBeInTheDocument();
  });
});

describe('testa componente Table', () => {
  it('testa se títulos das colunas aparecem ao renderizar a Carteira', () => {
    mock();

    renderWithRouterAndRedux(<Wallet />);

    expect(screen.getByText('Descrição')).toBeInTheDocument();
    expect(screen.getByText('Tag')).toBeInTheDocument();
    expect(screen.getByText('Método de pagamento')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();
    expect(screen.getByText('Moeda')).toBeInTheDocument();
    expect(screen.getByText('Câmbio utilizado')).toBeInTheDocument();
    expect(screen.getByText('Valor convertido')).toBeInTheDocument();
    expect(screen.getByText('Moeda de conversão')).toBeInTheDocument();
    expect(screen.getByText('Editar/Excluir')).toBeInTheDocument();
  });

  it('testa se botão Excluir remove item da lista', async () => {
    mock();

    renderWithRouterAndRedux(<Wallet />);

    const loading = screen.getByText(CARREGANDO);
    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    const valueInput = screen.getByPlaceholderText('Valor');
    const descriptionInput = screen.getByPlaceholderText('Descrição');

    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, 'sorvete');

    const addButton = screen.getByRole('button', { name: ADD_DESPESA });
    userEvent.click(addButton);

    const buttonExcluir = screen.getByRole('button', { name: 'Excluir' });
    userEvent.click(buttonExcluir);

    expect(screen.queryByText('sorvete')).not.toBeInTheDocument();
    expect(screen.queryByText(ALIMENTAÇÃO)).not.toBeInTheDocument();
    expect(screen.queryByText('Dinheiro')).not.toBeInTheDocument();
    expect(screen.queryByText('2.00')).not.toBeInTheDocument();
    expect(screen.queryByText('Dólar Americano/Real Brasileiro')).not.toBeInTheDocument();
    expect(screen.queryByText('4.75')).not.toBeInTheDocument();
    expect(screen.queryByText('Real')).not.toBeInTheDocument();
    expect(buttonExcluir).not.toBeInTheDocument();
    const buttonEditar = screen.queryByRole('button', { name: 'Editar' });
    expect(buttonEditar).not.toBeInTheDocument();
  });

  it('testa se botão Editar permite alterar informações', async () => {
    mock();

    renderWithRouterAndRedux(<Wallet />);

    const loading = screen.getByText(CARREGANDO);
    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    const valueInput = screen.getByPlaceholderText('Valor');
    const descriptionInput = screen.getByPlaceholderText('Descrição');

    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, 'sorvete');

    const addButton = screen.getByRole('button', { name: ADD_DESPESA });
    userEvent.click(addButton);

    const buttonEditar = screen.getByRole('button', { name: 'Editar' });
    userEvent.click(buttonEditar);

    expect(addButton).not.toBeInTheDocument();

    await waitFor(() => {
      const saveEdit = screen.queryByRole('button', { name: 'Editar despesa' });
      expect(saveEdit).toBeInTheDocument();

      userEvent.click(saveEdit);
    });

    expect(screen.queryByText('sorvete')).not.toBeInTheDocument();
    expect(screen.queryByText('2.00')).not.toBeInTheDocument();
  });
});

describe('testa erro', () => {
  it('testa se imprime "Algo deu errado" quando erro é lançado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.reject(mockData),
    }));

    renderWithRouterAndRedux(<Wallet />);

    const loading = screen.getByText(CARREGANDO);
    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    expect(screen.getByText('Algo deu errado!')).toBeInTheDocument();
  });
});
