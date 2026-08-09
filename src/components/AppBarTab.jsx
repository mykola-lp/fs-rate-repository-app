import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const AppBarTab = ({ text, to }) => {
  return (
    <Link to={to} component={Pressable}>
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
};

export default AppBarTab;