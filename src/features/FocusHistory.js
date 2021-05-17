import React from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import { fontSizes, paddingSizes } from '../utils/sizes';
import { colors } from '../utils/colors';
import { RoundedButton } from '../components/RoudedButton';

export const FocusHistory = ({ history, onClear }) => {
  const clear = () => onClear();

  const HistoryItem = ({ item, index }) => {
    return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
  };

  return (
    <SafeAreaView style={styles.historyBar}>
      <Text style={styles.title}> Tasks focused: </Text>
      {history.length ? (
        <>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={styles.list}
            data={history}
            renderItem={HistoryItem}
          />
          <View style={styles.clearContainer}>
            <RoundedButton size={50} title="Clear" onPress={() => onClear()} />
          </View>
        </>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  historyBar: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    flex: 1,
    alignItems: 'center',
  },
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md,
  }),
  title: {
    color: colors.secondary,
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: paddingSizes.md,
  },
});
