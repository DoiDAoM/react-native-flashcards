import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, KeyboardAvoidingView } from 'react-native'
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
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View>
                    <Text style={styles.questionText}>What is the title of your new deck?</Text>
                    <TextInput
                        editable = {true}
                        onChangeText={(text) => this.setState({title: text})}
                        style={styles.textInput}
                    />
                </View>
                {Platform.OS === 'ios' ?
                <ButtonIOS onPress={this.onSubmit} style={styles.submitBtn}> 
                    <Text style={styles.btnText}> Create Deck </Text>
                </ButtonIOS> : 
                <ButtonAndroid onPress={this.onSubmit} style={styles.submitBtn} > 
                    <Text style={styles.btnText}> Create Deck </Text>
                </ButtonAndroid>
                } 
            </KeyboardAvoidingView>
     
        )

    }

}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        padding: 20,
        marginTop: 40,
        justifyContent: 'space-between',
    },
    questionText: {
        fontSize: 30,
    },
    textInput: {
        marginTop: 60,
        borderWidth: 1,
        borderRadius: 4,
        height: 54,
        fontSize: 30,
        padding: 5,
        justifyContent: 'center',
    },
    btnText: {
        color: white,
        fontSize: 24,
        textAlign: 'center',
    },
    submitBtn: {
        marginBottom: Platform === 'ios' ? 40 : 80,
    },
      
})

export default connect()(AddDeck)