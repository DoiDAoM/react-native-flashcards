import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

export default function ButtonIOS ({children, onPress, style = {}}) {
    return (
        <TouchableOpacity style={[styles.iosBtn, style]} onPress={onPress}>
           <Text>{children}</Text>
        </TouchableOpacity>
      )
}

const styles = StyleSheet.create({
    iosBtn: {
        backgroundColor: purple,
        padding: 4,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        margin: 10,
    },
})