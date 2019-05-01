import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { handleFetchDecks } from '../actions/decks'
import DeckListItem from './DeckListItem';

class DeckList extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(handleFetchDecks())
    }

    render() {
        const { decks, deckIds, navigation } = this.props
        const listItems = deckIds.map((deckId) => {
            return (
                <DeckListItem 
                    key = {deckId}
                    navigation= {navigation}
                    deckName = {deckId}
                    itemCount = {decks[deckId].questions.length} 
                />
            )
        })

        return (
            <ScrollView> 
                {listItems}
            </ScrollView>
        )
    }

}

function mapStateToProps ({decks}) {
    const deckIds = Object.keys(decks)
    return {
        decks,
        deckIds,
    }
}

export default connect(mapStateToProps)(DeckList)