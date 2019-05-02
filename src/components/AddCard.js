import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import ButtonAndroid from './ButtonAndroid'
import ButtonIOS from './ButtonIOS'
import { handleAddNewQuestion } from '../actions/questions'

class AddCard extends Component { 
    static navigationOptions = ({ navigation }) => {
        const { id } = navigation.state.params
        return {
            headerBackTitle: id
        }
    }

    state = {
        question: '', 
        answer: '',
    }

    onSubmit = () => {
        const { dispatch, id, navigation } = this.props
        const { question, answer } = this.state

        dispatch(handleAddNewQuestion({ question, answer, id }))
        .then(() => {
            navigation.goBack()
        })
    }

    render() {
        return ( 
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled> 
                <View>
                    <TextInput
                    editable = {true}
                    onChangeText={(text) => this.setState({question: text})}
                    style={styles.textInput}
                    placeholder="Question"
                    />
                    <TextInput
                    editable = {true}
                    onChangeText={(text) => this.setState({answer: text})}
                    style={styles.textInput}
                    placeholder="Answer"
                    />
                </View>
                {Platform.OS === 'ios' ?
                 <ButtonIOS style={styles.submitBtn} onPress={this.onSubmit}> 
                    <Text style={styles.btnText}> Submit </Text>
                 </ButtonIOS> : 
                <ButtonAndroid style={styles.submitBtn} onPress={this.onSubmit} > 
                    <Text style={styles.btnText}> Submit </Text>
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
    submitBtn: {
        marginBottom: Platform === 'ios' ? 40 : 120,
    },
    btnText: {
        color: white,
        fontSize: 24,
        textAlign: 'center',
    }
      
})

function mapStateToProps ({}, {navigation}) {
    const { id } = navigation.state.params

    return {
        id,
    }
}

export default connect(mapStateToProps)(AddCard)