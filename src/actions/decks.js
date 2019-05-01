export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_NEW_DECK = 'ADD_NEW_DECK'
export const DELETE_DECK = 'DELETE_DECK'
import { fetchDecks, addDeck, removeDeck } from '../utils/api'

function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function handleFetchDecks() {
    return (dispatch) => {
        return fetchDecks()
        .then((decks) => {
            dispatch(receiveDecks(decks))
        })
    }
}

function addNewDeck(title) {
    return {
        type: ADD_NEW_DECK,
        title,
    }
}

export function handleAddNewDeck(title) {
    return (dispatch) => {
        return addDeck(title)
        .then(() => {
            dispatch(addNewDeck(title))
        })
    }
}

function deleteDeck(id) {
    return {
        type: DELETE_DECK,
        id,
    }
}

export function handleDeleteDeck(id) {
    return (dispatch) => {
        return removeDeck(id)
        .then(() => {
            dispatch(deleteDeck(id))
        })
    }
}

