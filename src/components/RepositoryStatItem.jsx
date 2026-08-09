import { View, StyleSheet } from 'react-native';

import Text from './Text';

import formatCount from '../utils/formatCount';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

const RepositoryStatItem = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text fontWeight="bold">{formatCount(value)}</Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

export default RepositoryStatItem;