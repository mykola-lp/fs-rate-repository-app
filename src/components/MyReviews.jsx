import { FlatList, View, StyleSheet } from 'react-native';

import MyReviewItem from './MyReviewItem';

import useAuthenticatedUser from '../hooks/useAuthenticatedUser';

import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.separator,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const MyReviewsContainer = ({ reviews }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <MyReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  );
};

const MyReviews = () => {
  const { user } = useAuthenticatedUser({ includeReviews: true });

  return <MyReviewsContainer reviews={user?.reviews} />;
};

export default MyReviews;