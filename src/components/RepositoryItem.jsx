import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <Text>{repository.fullName}</Text>
      <Text>{repository.description}</Text>
      <Text>{repository.language}</Text>
      <Text>{repository.forksCount}</Text>
      <Text>{repository.stargazersCount}</Text>
      <Text>{repository.reviewCount}</Text>
      <Text>{repository.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;