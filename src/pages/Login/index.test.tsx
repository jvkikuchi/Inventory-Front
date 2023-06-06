import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import Login from '.';
import {NativeBaseProvider} from 'native-base';
import {Alert} from 'react-native';

const mockSignInError = new Error('Sign-in error');
// @ts-expect-error forcing an error array with custom error message to test alert
mockSignInError.errors = [{message: 'Custom error message'}];

jest.mock('@clerk/clerk-expo', () => ({
  useSignIn: () => ({
    signIn: {
      create: jest.fn().mockImplementation(async () => {
        // Throw the custom error on a specific test
        if (global.throwSignInError) {
          throw mockSignInError;
        }

        return {
          createdSessionId: 'session-id',
        };
      }),
    },
    setActive: jest.fn(),
  }),
}));

const inset = {
  frame: {x: 0, y: 0, width: 0, height: 0},
  insets: {top: 0, left: 0, right: 0, bottom: 0},
};

describe('Login', () => {
  test('it should render email and password inputs', () => {
    render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Login navigation={undefined} route={undefined} />
      </NativeBaseProvider>,
    );

    expect(screen.queryByText('EMAIL')).toBeTruthy();
    expect(screen.queryByText('SENHA')).toBeTruthy();
  });

  test('handles success form submission', async () => {
    const mockNavigate = jest.fn();
    const navigation = {navigate: mockNavigate};
    const {getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        {/* @ts-ignore ignoring the type of the function that its passed to the component*/}
        <Login navigation={navigation} route={undefined} />
      </NativeBaseProvider>,
    );

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginButton = screen.getByRole('button', {name: 'ENTRAR'});

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Tabs');
    });
  });

  test('handles error on form submission', async () => {
    // Set the global flag to throw an error
    global.throwSignInError = true;
    const alertSpy = jest.spyOn(Alert, 'alert');
    const mockNavigate = jest.fn();
    const navigation = {navigate: mockNavigate};
    const {getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        {/* @ts-ignore ignoring the type of the function that its passed to the component*/}
        <Login navigation={navigation} route={undefined} />
      </NativeBaseProvider>,
    );

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginButton = screen.getByRole('button', {name: 'ENTRAR'});

    fireEvent.changeText(emailInput, 'test');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Custom error message');
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    // Reset the global flag
    global.throwSignInError = false;
  });
});
