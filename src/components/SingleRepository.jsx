import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

import useRepository from '../hooks/useRepository';

import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.separator,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const SingleRepositoryContainer = ({ repository, onEndReached }) => {
  if (!repository) {
    return null;
  }

  const reviewNodes = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={
        <RepositoryItem repository={repository} showGithubButton />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository(id);

  return (
    <SingleRepositoryContainer repository={repository} onEndReached={fetchMore} />
  );
};

export default SingleRepository;