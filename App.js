import { StatusBar } from 'expo-status-bar';

import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';
import { PaperProvider } from 'react-native-paper';

import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';

import AuthStorageContext from './src/contexts/AuthStorageContext';

import Main from './src/components/Main';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <PaperProvider>
      <StatusBar style="light" />

      <NativeRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
    </PaperProvider>
  );
};

export default App;
