import { View, Image, StyleSheet } from 'react-native';

import Text from './Text';
import LanguageTag from './LanguageTag';
import RepositoryStatItem from './RepositoryStatItem';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.itemBackground,
    padding: 15,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 15,
  },
  infoContainer: {
    flexShrink: 1,
  },
  description: {
    marginTop: 4,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
  },
});

const RepositoryItem = ({ repository }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = repository;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />

        <View style={styles.infoContainer}>
          <Text fontWeight="bold">{fullName}</Text>
  
          <Text style={styles.description} color="textSecondary">
            {description}
          </Text>

          <LanguageTag language={language} />
        </View>
      </View>

      <View style={styles.statsRow}>
        <RepositoryStatItem label="Stars" value={stargazersCount} />
        <RepositoryStatItem label="Forks" value={forksCount} />
        <RepositoryStatItem label="Reviews" value={reviewCount} />
        <RepositoryStatItem label="Rating" value={ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;