import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchbar: {
    marginBottom: 10,
  },
});

export const ORDERING_OPTIONS = {
  LATEST: 'LATEST',
  HIGHEST_RATED: 'HIGHEST_RATED',
  LOWEST_RATED: 'LOWEST_RATED',
};

const RepositoryListHeader = ({
  selectedOrdering,
  onSelectOrdering,
  searchKeyword,
  onChangeSearchKeyword,
}) => {
  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchbar}
        placeholder="Search"
        onChangeText={onChangeSearchKeyword}
        value={searchKeyword}
      />

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