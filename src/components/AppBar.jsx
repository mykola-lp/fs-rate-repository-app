import { useContext } from 'react';

import { View, StyleSheet, ScrollView, Pressable } from 'react-native';

import { useApolloClient } from '@apollo/client/react';
import Constants from 'expo-constants';

import AuthStorageContext from '../contexts/AuthStorageContext';

import useAuthenticatedUser from '../hooks/useAuthenticatedUser';

import AppBarTab from './AppBarTab';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 15,
    paddingBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.appBarBackground,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const { user } = useAuthenticatedUser();

  const isSignedIn = !!user;

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabsContainer}>
        <AppBarTab text="Repositories" to="/" />

        {isSignedIn && <AppBarTab text="Create a review" to="/review" />}
        {isSignedIn && <AppBarTab text="My reviews" to="/myreviews" />}

        {isSignedIn ? (
          <Pressable onPress={signOut}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        ) : (
          <>
            <AppBarTab text="Sign in" to="/signin" />
            <AppBarTab text="Sign up" to="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;