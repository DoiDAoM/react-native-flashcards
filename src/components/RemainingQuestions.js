import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { black } from '../utils/colors'

export default function RemainingQuestions ({ totalCount, questionIndex }) {
  return (
    <View style={styles.row} >
       <Text style={[styles.text]}>{questionIndex+1} / </Text>
       <Text style={[styles.text]}>{totalCount}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    text: {
        color: black,
    }
})