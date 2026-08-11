import { View, Image, StyleSheet, Pressable, Linking } from 'react-native';

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
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
  },
});

const RepositoryItem = ({ repository, showGithubButton = false }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    url,
  } = repository;

  const onOpenInGithub = () => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
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

      {showGithubButton && (
        <Pressable style={styles.button} onPress={onOpenInGithub}>
          <Text style={styles.buttonText} fontWeight="bold">
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;