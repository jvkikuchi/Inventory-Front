import React from 'react';
import {QueryClientProvider, QueryClient} from 'react-query';
import {Routes} from './src/route';
import {NativeBaseProvider} from 'native-base';
import {ClerkProvider} from '@clerk/clerk-expo';

const reactQueryClient = new QueryClient();
function App(): JSX.Element {
  return (
    <ClerkProvider publishableKey='pk_test_Zm9uZC1za2luay01LmNsZXJrLmFjY291bnRzLmRldiQ'>
      <QueryClientProvider client={reactQueryClient}>
        <NativeBaseProvider>
          <Routes />
        </NativeBaseProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
