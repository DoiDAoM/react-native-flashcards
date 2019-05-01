import { ADD_NEW_QUESTION } from '../actions/questions'
import { ADD_NEW_DECK, RECEIVE_DECKS, DELETE_DECK } from '../actions/decks'

export default function decks (state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks
      }
    case ADD_NEW_DECK:
      return {
        ...state,
        [action.title]: {
            title: action.title,
            questions: [],
        },
    }
    case DELETE_DECK:
    delete state[action.id]
      return {
        ...state,
    }
    case ADD_NEW_QUESTION:
      const { question, answer, id } = action.info
      return {
        ...state,
        [id]: {
          ...state[id],
          questions: state[id].questions.concat([ {question, answer}]),
        },
    }
    default :
      return state
  }
}