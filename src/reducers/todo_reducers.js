import { combineReducers } from 'redux'
import undoable, { distinctState } from 'redux-undo'

import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters, DELETE_TODO, REMOVE_TODO } from '../actions/todo_actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

const todos = function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      const id = state[state.length - 1] ? state[state.length - 1]['id'] + 1 : 1
      return [
        ...state,
        { 
          id: id,
          text: action.text,
          createdAt: action.createdAt,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ]
    case DELETE_TODO:
      return []
    case REMOVE_TODO:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

const undoableTodos = undoable(todos, {
  filter: distinctState()
})

const todoApp = combineReducers({
  visibilityFilter,
  todos: undoableTodos
})

export default todoApp