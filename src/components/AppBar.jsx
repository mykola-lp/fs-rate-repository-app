import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useApolloClient, useQuery } from '@apollo/client/react';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import Text from './Text';

import { GET_ME } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useContext } from 'react';
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
  const { data } = useQuery(GET_ME);

  const isSignedIn = !!data?.me;

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabsContainer}>
        <AppBarTab text="Repositories" to="/" />

        {isSignedIn && <AppBarTab text="Create a review" to="/review" />}

        {isSignedIn ? (
          <Pressable onPress={signOut}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        ) : (
          <AppBarTab text="Sign in" to="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
