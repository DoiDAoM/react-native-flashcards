import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { black, white, red, green } from '../utils/colors'
import ButtonAndroid from './ButtonAndroid'
import ButtonIOS from './ButtonIOS'
import TextButton from './TextButton'
import RemainingQuestions from './RemainingQuestions'
import {
    clearLocalNotification,
    setLocalNotification
  } from '../utils/helpers'

class ScorePage extends Component { 
      state = {
        questionIndex: 0,
        correctAnswerCount : 0,
        incorrectAnswerCount: 0,
        isShowingQuestion: true,
    }

    onBackToDeckClick = () => {
        const { navigation } = this.props
        navigation.goBack()
    }

    componentDidMount = () => {
        clearLocalNotification()
        .then(setLocalNotification)
    }

    render() {
        const { correctAnswerCount, incorrectAnswerCount, id, onRestartClick } = this.props
        const correctAnswerRate = 100 * correctAnswerCount / (correctAnswerCount + incorrectAnswerCount)

        return ( 
            <View style={styles.container}> 
                <View>
                    <Text style={styles.yourScoreText}> 
                        Your score: 
                    </Text>
                    <Text style={styles.scoreText} > 
                        {correctAnswerRate} %
                    </Text>
                    
                </View>


                {Platform.OS === 'ios' ?
                <View>
                    <ButtonIOS style={styles.correctBtn} onPress={onRestartClick}> 
                        <Text style={styles.btnText}> Restart Quiz </Text>
                    </ButtonIOS>
                    <ButtonIOS style={styles.incorrectBtn} onPress={this.onBackToDeckClick}> 
                        <Text style={styles.btnText}> Back to Deck </Text>
                    </ButtonIOS>
                 </View> : 
                 <View>
                    <ButtonAndroid style={styles.correctBtn} onPress={onRestartClick} > 
                        <Text style={styles.btnText}> Restart Quiz </Text>
                    </ButtonAndroid>
                    <ButtonAndroid style={styles.incorrectBtn} onPress={this.onBackToDeckClick} > 
                        <Text style={styles.btnText}> Back to Deck </Text>
                    </ButtonAndroid>
                </View>
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
        justifyContent: 'space-between',
    },
    yourScoreText: {
        color: black,
        fontSize: 30,
        textAlign: 'center',
    },
    scoreText: {
        color: red,
        fontSize: 60,
        textAlign: 'center',
    },
    correctBtn: {
        backgroundColor: green,
    },
    incorrectBtn: {
        backgroundColor: red,
    },
    btnText: {
        color: white,
        fontSize: 24,
        textAlign: 'center',
    }
      
})

function mapStateToProps ({decks}, {navigation}) {
    const { id } = navigation.state.params
    const deck = decks[id]
    return {
        id,
    }
}

export default connect(mapStateToProps)(ScorePage)