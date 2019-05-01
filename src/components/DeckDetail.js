import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { purple, white, black } from '../utils/colors'
import { handleDeleteDeck } from '../actions/decks'
import DeckListItem from './DeckListItem';
import ButtonAndroid from './ButtonAndroid'
import ButtonIOS from './ButtonIOS'
import TextButton from './TextButton'

class DeckDetail extends Component {

    state = {
        isMount : true,
    }

    onAddCardPress = () => {
        const { navigation, id } = this.props
        navigation.navigate('AddCard',{ id })
    }

    onStartQuizPress = () => {
        const { navigation, id } = this.props
        navigation.navigate('QuizPage',{ id })
    }

    onDeletePress = () => {
        const { dispatch, navigation, id } = this.props
        dispatch(handleDeleteDeck(id)).then(() => 
        navigation.goBack())
        
        this.setState({
            isMount: false
        })
        
    }
    
    render() {
        const { deck } = this.props
        const { isMount } = this.state

        if (!isMount) return null

        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.textName}> {deck.title} </Text>
                    <Text style={styles.textCount}> {deck.questions.length} cards </Text>
                </View>
                {Platform.OS === 'ios' ?
                    <View>
                        <ButtonIOS 
                        style={styles.submitBtn} 
                        onPress={this.onAddCardPress}> 
                            <Text style={styles.btnText}> Add Card </Text>
                        </ButtonIOS>
                        <ButtonIOS style={styles.submitBtn} onPress={this.onStartQuizPress}> 
                            <Text style={styles.btnText}> Start Quiz </Text>
                        </ButtonIOS>
                        <TextButton onPress={this.onDeletePress}>
                            <Text> Delete Deck </Text>
                        </TextButton>
                    </View> : 
                    <View>
                        <ButtonAndroid 
                        style={styles.submitBtn} 
                        onPress={this.onAddCardPress} > 
                            <Text style={styles.btnText}> Add Card </Text>
                        </ButtonAndroid>
                        <ButtonAndroid style={styles.submitBtn} onPress={this.onStartQuizPress} > 
                            <Text style={styles.btnText}>  Start Quiz </Text>
                        </ButtonAndroid>
                        <TextButton onPress={this.onDeletePress}>
                            <Text> Delete Deck </Text>
                        </TextButton>
                    </View>
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
        justifyContent: 'space-between',
        paddingTop: 120,
        paddingBottom: 120,
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
    },
    btnText: {
        color: white,
        fontSize: 24,
        textAlign: 'center',
    },
    btnContainer: {

    }

      
})

function mapStateToProps ({decks}, {navigation}) {
    const { id } = navigation.state.params
    const deck = decks[id]

    return {
        deck,
        id,
    }
}
export default connect(mapStateToProps)(DeckDetail)