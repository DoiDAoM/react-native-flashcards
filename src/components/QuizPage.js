import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { black, white, red, green } from '../utils/colors'
import ButtonAndroid from './ButtonAndroid'
import ButtonIOS from './ButtonIOS'
import TextButton from './TextButton'
import RemainingQuestions from './RemainingQuestions'
import ScorePage from './ScorePage'


class QuizPage extends Component { 
      state = {
        questionIndex: 0,
        correctAnswerCount : 0,
        incorrectAnswerCount: 0,
        isShowingQuestion: true,
    }

    onCorrectClick = () => {
        const { questionIndex, correctAnswerCount } = this.state
        this.setState({
            questionIndex: questionIndex + 1,
            correctAnswerCount: correctAnswerCount + 1
        })
    }
    onIncorrectClick = () => {
        const { questionIndex, incorrectAnswerCount } = this.state
        this.setState({
            questionIndex: questionIndex + 1,
            incorrectAnswerCount: incorrectAnswerCount + 1
        })
    }

    onShowAnswer = () => {
        const { isShowingQuestion } = this.state
        this.setState({
            isShowingQuestion: !isShowingQuestion,
        })
    }

    onRestartClick = () => {
        this.setState({
            questionIndex: 0,
            correctAnswerCount: 0,
            incorrectAnswerCount : 0,
            isShowingQuestion : true,
        })
    }

    render() {
        const { deck, navigation, id} = this.props
        const { questionIndex, correctAnswerCount, incorrectAnswerCount, isShowingQuestion } = this.state

        if (deck.questions.length === 0) {
            return (
                <View>
                    <Text style={styles.questionText}> 
                        Sorry, you can not take a quiz because there are no cards in the deck.
                    </Text>
                </View>
            )
        } else if (deck.questions.length < questionIndex+1) {
            return (
                <ScorePage
                    navigation = {navigation}
                    id = {id}
                    correctAnswerCount = {correctAnswerCount}
                    incorrectAnswerCount = {incorrectAnswerCount}
                    onRestartClick = {this.onRestartClick}
                />  
            )
        }

        return ( 
            <View style={styles.container}> 
              
                <RemainingQuestions 
                totalCount={deck.questions.length}
                questionIndex={questionIndex}
                />
                <View>
                    <Text style={styles.questionText}> 
                        {isShowingQuestion ? deck.questions[questionIndex].question : deck.questions[questionIndex].answer} 
                    </Text>
                    <TextButton onPress={this.onShowAnswer}> 
                        <Text style={styles.answerText} > 
                            {isShowingQuestion ? 'See Answer' : 'See Question'} 
                        </Text>
                    </TextButton>
                </View>


                {Platform.OS === 'ios' ?
                <View>
                    <ButtonIOS style={styles.correctBtn} onPress={this.onCorrectClick}> 
                        <Text style={styles.btnText}> Correct </Text>
                    </ButtonIOS>
                    <ButtonIOS style={styles.incorrectBtn} onPress={this.onIncorrectClick}> 
                        <Text style={styles.btnText}> Incorrect </Text>
                    </ButtonIOS>
                 </View> : 
                 <View>
                    <ButtonAndroid style={styles.correctBtn} onPress={this.onCorrectClick} > 
                        <Text style={styles.btnText}> Correct </Text>
                    </ButtonAndroid>
                    <ButtonAndroid style={styles.incorrectBtn} onPress={this.onIncorrectClick} > 
                        <Text style={styles.btnText}> Incorrect </Text>
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
    questionText: {
        color: black,
        fontSize: 50,
        textAlign: 'center',
    },
    answerText: {
        color: red,
        fontSize: 30,
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
        deck,
    }
}

export default connect(mapStateToProps)(QuizPage)