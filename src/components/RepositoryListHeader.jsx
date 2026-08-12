import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export const ORDERING_OPTIONS = {
  LATEST: 'LATEST',
  HIGHEST_RATED: 'HIGHEST_RATED',
  LOWEST_RATED: 'LOWEST_RATED',
};

const RepositoryListHeader = ({ selectedOrdering, onSelectOrdering }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedOrdering}
        onValueChange={(itemValue) => onSelectOrdering(itemValue)}
      >
        <Picker.Item label="Latest repositories" value={ORDERING_OPTIONS.LATEST} />

        <Picker.Item
          label="Highest rated repositories"
          value={ORDERING_OPTIONS.HIGHEST_RATED}
        />

        <Picker.Item
          label="Lowest rated repositories"
          value={ORDERING_OPTIONS.LOWEST_RATED}
        />
      </Picker>
    </View>
  );
};

export default RepositoryListHeader;