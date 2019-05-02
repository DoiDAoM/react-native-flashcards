import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import reducer from './src/reducers'
import middleware from './src/middleware'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import AddDeck from './src/components/AddDeck'
import AddCard from './src/components/AddCard'
import DeckList from './src/components/DeckList'
import DeckDetail from './src/components/DeckDetail'
import QuizPage from './src/components/QuizPage'
import { white, purple } from './src/utils/colors'
import { setLocalNotification } from './src/utils/helpers'
import CustomStatusBar from './src/components/CustomStatusBar'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      title: 'Add Card',
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  QuizPage: {
    screen: QuizPage,
    navigationOptions: {
      headerTintColor: white,
      title: 'Quiz',
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
  
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
       <CustomStatusBar backgroundColor={purple} barStyle="light-content" />
        <View style={{flex: 1}}>
          <MainNavigator /> 
        </View>
      </Provider>
    )
  }
}
