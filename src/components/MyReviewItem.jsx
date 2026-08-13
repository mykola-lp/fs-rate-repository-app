import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: theme.colors.itemBackground,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
  },
  infoContainer: {
    flexShrink: 1,
  },
  date: {
    marginTop: 4,
    marginBottom: 8,
  },
});

const MyReviewItem = ({ review }) => {
  const { rating, repository, createdAt, text } = review;

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText} fontWeight="bold">
          {rating}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text fontWeight="bold">{repository.fullName}</Text>

        <Text style={styles.date} color="textSecondary">
          {format(new Date(createdAt), 'dd MMM yyyy')}
        </Text>

        <Text>{text}</Text>
      </View>
    </View>
  );
};

export default MyReviewItem;