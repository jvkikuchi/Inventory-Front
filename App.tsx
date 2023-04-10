import React from 'react';
import {QueryClientProvider, QueryClient} from 'react-query';
import {Routes} from './src/route';
import {NativeBaseProvider} from 'native-base';

const reactQueryClient = new QueryClient();

function App(): JSX.Element {

  return (
    <QueryClientProvider client={reactQueryClient}>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

export default App;