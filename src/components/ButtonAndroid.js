import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

export default function ButtonAndroid ({children, onPress, style = {}}) {
    return (
        <TouchableOpacity style={[styles.androidBtn, style]} onPress={onPress}>
           <Text >{children}</Text>
        </TouchableOpacity>
      )
}

const styles = StyleSheet.create({
    androidBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        margin: 10
    },
})