import { useState } from 'react';

import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import RepositoryListHeader, { ORDERING_OPTIONS } from './RepositoryListHeader';

import useRepositories from '../hooks/useRepositories';

import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.separator,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const getOrderingVariables = (ordering) => {
  switch (ordering) {
    case ORDERING_OPTIONS.HIGHEST_RATED:
      return {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC'
      };

    case ORDERING_OPTIONS.LOWEST_RATED:
      return {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC'
      };
  
    case ORDERING_OPTIONS.LATEST:

    default:
      return {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC'
      };
  }
};

export const RepositoryListContainer = ({
  repositories,
  selectedOrdering,
  onSelectOrdering,
  searchKeyword,
  onChangeSearchKeyword,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryListHeader
          selectedOrdering={selectedOrdering}
          onSelectOrdering={onSelectOrdering}
          searchKeyword={searchKeyword}
          onChangeSearchKeyword={onChangeSearchKeyword}
        />
      )}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrdering, setSelectedOrdering] = useState(ORDERING_OPTIONS.LATEST);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories } = useRepositories({
    ...getOrderingVariables(selectedOrdering),
    searchKeyword: debouncedSearchKeyword,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrdering={selectedOrdering}
      onSelectOrdering={setSelectedOrdering}
      searchKeyword={searchKeyword}
      onChangeSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;