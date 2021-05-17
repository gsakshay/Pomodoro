import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSizes, paddingSizes } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMills = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 5, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);

  const [millis, setMillis] = useState(minutesToMills(minutes));

  const min = Math.floor(millis / 1000 / 60) % 60;
  const sec = Math.floor(millis / 1000) % 60;

  const countDown = () => {
    setMillis((curTime) => {
      if (curTime === 0) {
        clearInterval(interval.current)
        onEnd();
        return curTime;
      } else {
        const timeLeft = curTime - 1000;
        onProgress(timeLeft / minutesToMills(minutes));
        return timeLeft;
      }
    });
  };
  
  useEffect(() => {
    if (!isPaused) {
      interval.current = setInterval(countDown, 1000);
      return () => clearInterval(interval.current);
    } else {
      clearInterval(interval.current);
    }
  }, [isPaused]);

  useEffect(() => {
    setMillis(minutesToMills(minutes));
  }, [minutes]);

  return (
    <View>
      <Text style={styles.text}>
        {formatTime(min)}:{formatTime(sec)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: fontSizes.xxxl - 20,
    fontWeight: 'bold',
    color: colors.white,
    padding: paddingSizes.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
    textAlign: 'center',
  },
});
