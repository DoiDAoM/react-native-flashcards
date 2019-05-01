import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { black, white } from '../utils/colors'
import { handleFetchDecks } from '../actions/decks'

export default function DeckListItem (props) {
    const { deckName, itemCount, onDeckClick, navigation } = props
    return (
 
        <TouchableOpacity 
            style={styles.item}
            onPress={() => navigation.navigate(
                'DeckDetail',
                { id: deckName }
                )} > 
            <Text style={styles.textName}> {deckName} </Text>
            <Text style={styles.textCount}> {itemCount} cards </Text>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
    },
    textName: {
        color: black,
        fontSize: 40,
        textAlign: 'center',
    },
    textCount: {
        color: black,
        fontSize: 24,
        textAlign: 'center',
    }

      
})

