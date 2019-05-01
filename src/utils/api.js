import { AsyncStorage } from 'react-native'
import { formatDeck } from './helpers'

export const DECK_STORAGE_KEY = 'FLASHCARDS_DECK_STORAGE'

export function fetchDecks () {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
      .then((decks) => JSON.parse(decks))
  }

export function addDeck (title) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(
    formatDeck(title)
  ))
}

export function removeDeck (id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then((results) => {
      const data = JSON.parse(results)
      data[id] = undefined
      delete data[id]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
  })
}

export function addQuestion (info) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then((results) => {
    const { question, answer, id } = info
    const data = JSON.parse(results)
    data[id].questions = data[id].questions.concat([{question, answer}])
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
  })
}





