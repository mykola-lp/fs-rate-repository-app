import { Pressable, StyleSheet } from 'react-native';

import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

const Button = ({ onPress, children, color = 'primary' }) => {
  return (
    <Pressable
      style={[styles.container, { backgroundColor: theme.colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text} fontWeight="bold">
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;