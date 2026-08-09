import { Pressable, StyleSheet } from 'react-native';

import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

const Button = ({ onPress, children }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text} fontWeight="bold">
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;