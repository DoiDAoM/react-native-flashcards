import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import ButtonAndroid from './ButtonAndroid'
import ButtonIOS from './ButtonIOS'
import { handleAddNewDeck } from '../actions/decks'

class AddDeck extends Component { 

    state = {
        title: '', 
    }

    onSubmit = (entry) => {
        const { dispatch, navigation } = this.props
        const { title } = this.state

        dispatch(handleAddNewDeck(title)).then(() => 
        navigation.navigate('DeckDetail',{ id: title }))
    }

    render() {
        return ( 
            <View style={styles.container}> 
                <Text style={styles.questionText}> What is the title of your new deck? </Text>
                <TextInput
                 editable = {true}
                 onChangeText={(text) => this.setState({title: text})}
                 style={styles.textInput}
                />
                {Platform.OS === 'ios' ?
                 <ButtonIOS style={styles.submitBtn} onPress={this.onSubmit}> 
                    <Text style={styles.btnText}> Create Deck </Text>
                 </ButtonIOS> : 
                <ButtonAndroid style={styles.submitBtn} onPress={this.onSubmit} > 
                    <Text style={styles.btnText}> Create Deck </Text>
                </ButtonAndroid>
                } 
            </View>
        )

    }

}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        padding: 20,
        marginTop: 40,
    },
    questionText: {
        fontSize: 30,
    },
    textInput: {
        marginTop: 60,
        borderWidth: 1,
        borderRadius: 4,
        height: 40,
        fontSize: 30,
        padding: 5,
    },
    submitBtn: {
        marginTop: 300,
    },
    btnText: {
        color: white,
        fontSize: 24,
        textAlign: 'center',
    }
      
})

export default connect()(AddDeck)