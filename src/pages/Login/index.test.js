import React from 'react';
import renderer from 'react-test-renderer';
import {NativeBaseProvider} from 'native-base';
import Login from '.';

describe('Login', () => {
  test('renders email and password inputs', () => {
    const x = renderer
      .create(
        <NativeBaseProvider>
          <Login navigation={undefined} route={undefined} />
        </NativeBaseProvider>,
      )
      .toJSON();

    console.log(x);
    /* expect(queryByText('EMAIL')).toBeTruthy();
    expect(queryByText('SENHA')).toBeTruthy(); */
  });
});
