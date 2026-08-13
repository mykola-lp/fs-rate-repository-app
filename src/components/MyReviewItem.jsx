import { View, StyleSheet, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';

import { format } from 'date-fns';

import Text from './Text';
import Button from './Button';

import useDeleteReview from '../hooks/useDeleteReview';

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
  divider: {
    height: 1,
    backgroundColor: theme.colors.separator,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: theme.colors.itemBackground,
    gap: 10,
  },
  actionButton: {
    flex: 1,
  },
});

const MyReviewItem = ({ review, onDeleted }) => {
  const { id, rating, repository, createdAt, text } = review;
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const handleViewRepository = () => {
    navigate(`/repositories/${repository.id}`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'CANCEL',
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: async () => {
            await deleteReview(id);
            onDeleted?.();
          },
        },
      ],
    );
  };

  return (
    <View>
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

      <View style={styles.divider} />

      <View style={styles.actionsContainer}>
        <View style={styles.actionButton}>
          <Button onPress={handleViewRepository}>View repository</Button>
        </View>

        <View style={styles.actionButton}>
          <Button color="error" onPress={handleDelete}>
            Delete review
          </Button>
        </View>
      </View>
    </View>
  );
};

export default MyReviewItem;