import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';

import Main from './src/components/Main';

const App = () => {
  return (
    <>
      <StatusBar style="light" />

      <NativeRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Main />
      </NativeRouter>
    </>
  );
};

export default App;