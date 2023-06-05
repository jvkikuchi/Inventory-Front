import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Login from '.';
import {NativeBaseProvider} from 'native-base';

jest.mock('@clerk/clerk-expo', () => ({
  useSignIn: () => ({
    signIn: {
      create: jest.fn().mockResolvedValue({createdSessionId: 'session-id'}),
    },
    setActive: jest.fn(),
  }),
}));

const inset = {
  frame: {x: 0, y: 0, width: 0, height: 0},
  insets: {top: 0, left: 0, right: 0, bottom: 0},
};

describe('Login', () => {
  test('renders email and password inputs', () => {
    const {queryByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Login navigation={undefined} route={undefined} />,
      </NativeBaseProvider>,
    );
    screen.debug();

    expect(queryByText('EMAIL')).toBeTruthy();
    expect(queryByText('SENHA')).toBeTruthy();
  });
});
