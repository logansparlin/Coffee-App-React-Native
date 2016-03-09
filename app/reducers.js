import { combineReducers } from 'redux'
import { Actions } from 'react-native-router-flux'
import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS
} from './actions'

function products(state = {
  isFetching: false,
  isLoaded: false,
  items: []
}, action) {
  switch(action.type) {
    case REQUEST_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: true,
        isLoaded: false
      })
    case RECEIVE_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  products
})

export default rootReducer
