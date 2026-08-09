import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';

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
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabsContainer}>
        <AppBarTab text="Repositories" to="/" />
        <AppBarTab text="Sign in" to="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;