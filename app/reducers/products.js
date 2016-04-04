import _ from 'underscore'
import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  GET_QUANTITY
} from '../actions'

const initialState = {
  isFetching: false,
  isLoaded: false,
  items: []
}

function products(state = initialState, action) {
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
        account: action.account, 
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export default products
