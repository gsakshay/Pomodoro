import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { fontSizes, paddingSizes } from '../utils/sizes';
import { colors } from '../utils/colors';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoudedButton';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd, clearTask }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => setProgress(progress);

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.os == 'ios') {
      console.log('ios_vibration');
    } else {
      Vibration.vibrate(2000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setIsStarted(false);
    setProgress(1);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: paddingSizes.xxxl }}>
        <Text style={styles.title}> Focusing on: </Text>
        <Text style={styles.task}> {focusSubject} </Text>
      </View>
      <ProgressBar
        progress={progress}
        color={colors.secondary}
        style={{ height: 10, marginTop: 20 }}
      />
      <View style={styles.buttonWrapper}>
        <Timing time={10} onChangeTime={changeTime} />
        <Timing time={20} onChangeTime={changeTime} />
        <Timing time={30} onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearTask}>
        <RoundedButton
          title="clear"
          size={50}
          onPress={() => clearTask()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: paddingSizes.lg,
  },
  title: {
    color: colors.primary,
    fontSize: fontSizes.xl,
    textAlign: 'center',
  },
  task: {
    fontSize: fontSizes.xl,
    color: colors.secondary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
