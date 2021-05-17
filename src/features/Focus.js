import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoudedButton';
import {fontSizes, paddingSizes} from '../utils/sizes'
import {colors} from '../utils/colors'

export const Focus = ({ addSubject }) => {
  const [task, setTask] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> What do you want to focus on? </Text>
        <View style={styles.taskContainer}>
          <TextInput
            style={{ flex: 1, marginRight: 20 }}
            onSubmitEditing={({ nativeEvent }) => setTask(nativeEvent.text)}
          />
           <RoundedButton onPress={()=>addSubject(task)} size={50} title="+" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  titleContainer: {
    flex: 0.5,
    jusrtifyContent: 'center',
    padding: paddingSizes.lg,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: colors.primary,
  },
  taskContainer: {
    paddingTop: paddingSizes.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  focusHistory: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: colors.primary,
  }
});
