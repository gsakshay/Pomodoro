import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { Focus } from './src/features/Focus';
import { FocusHistory } from './src/features/FocusHistory';
import {Timer} from './src/features/Timer'
import {paddingSizes} from './src/utils/sizes'
import {colors} from './src/utils/colors'

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const status = {
  complete: 1,
  cancel: 2
}

const App = () => {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([])

  const addHistory = (subject, status) => {
    setFocusHistory((history)=>[...history, {subject, status, key: subject}])
  }

  const onClear = () => setFocusHistory([])

  const saveFocusHistory = async() => {
    try{
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory))
    }catch(e){
      console.log(e)
    } 
  }

  
  const loadFocusHistory = async() => {
    try{
      const history = await AsyncStorage.getItem('focusHistory');

      if(history && JSON.parse(history).length){
        setFocusHistory(JSON.parse(history))
      }
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    saveFocusHistory()
  }, [focusHistory])

  useEffect(()=>{
    loadFocusHistory()
  }, [])
 
  return (
    <View style={styles.container}>
      {focusSubject ?
      (<Timer focusSubject={focusSubject} onTimerEnd={()=>{
        addHistory(focusSubject, status.complete)
        setFocusSubject(null)
      }} clearTask={()=>{
        addHistory(focusSubject, status.cancel)
        setFocusSubject(null)
        }}/>) : 
      (<>
      <Focus addSubject = {setFocusSubject} history = {focusHistory}/>
      <FocusHistory history={focusHistory} onClear={onClear}/> 
      </>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: paddingSizes.lg
  },
});

export default App;