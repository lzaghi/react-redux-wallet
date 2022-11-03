import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('testa componente Login', () => {
  it('testa presença de elementos da Pagina de Login ao renderizar App', () => {
    renderWithRouterAndRedux(<App />);

    const title = screen.getByRole('heading', { name: /trybewallet/i, level: 1 });
    expect(title).toBeInTheDocument();

    const email = screen.getByPlaceholderText('E-mail');
    const password = screen.getByPlaceholderText('Senha');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Entrar');
  });

  it('testa se botão inicia desabilitado e habilita dadas as condições', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    const email = screen.getByPlaceholderText('E-mail');
    const password = screen.getByPlaceholderText('Senha');
    userEvent.type(email, 'lalala');
    userEvent.type(password, '12345');

    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);
    userEvent.type(email, 'alguem@alguem.com');
    userEvent.type(password, '123456');

    expect(button).toBeEnabled();
  });

  it('testa se ao clicar no botão habilitado, redireciona para a Carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button');

    const email = screen.getByPlaceholderText('E-mail');
    const password = screen.getByPlaceholderText('Senha');
    userEvent.type(email, 'alguem@alguem.com');
    userEvent.type(password, '123456');

    userEvent.click(button);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});
