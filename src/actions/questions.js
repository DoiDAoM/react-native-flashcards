export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION'
import { addQuestion } from '../utils/api'

function addNewQuestion(info) {
    return {
        type: ADD_NEW_QUESTION,
        info,
    }
}

export function handleAddNewQuestion(info) {
    return (dispatch) => {
        return addQuestion(info)
        .then(() => {
            dispatch(addNewQuestion(info))
        })
    }
}
