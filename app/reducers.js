import { combineReducers } from 'redux'
import { Actions } from 'react-native-router-flux'
import _ from 'underscore'
import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  GET_QUANTITY
} from './actions'

const initialCartState = {
  quantity: 0,
  addedIds: [],
  quantityById: {}
}

const initialProductState = {
  isFetching: false,
  isLoaded: false,
  items: []
}

function products(state = initialProductState, action) {
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

function addedIds(state = initialCartState.addedIds, action) {
  const { id } = action;
  switch(action.type) {
    case ADD_TO_CART:
      if(state.indexOf(id) !== -1) {
        return state
      } else {
        return [...state, id]
      }
    case REMOVE_FROM_CART:
      const index = state.indexOf(id)
      console.log(index)
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    default:
      return state;
  }
}

function quantityById(state = initialCartState.quantityById, action) {
  switch(action.type) {
    case ADD_TO_CART:
      const { quantity, id } = action;
      return Object.assign({}, state, {
        [id]: quantity
      })
    case REMOVE_FROM_CART:
      return _.omit(state, action.id)
    default:
      return state
  }
}

function getQuantity(state = initialCartState.quantityById, action) {
  const values = _.values(quantityById(state, action))
  if(values.length >= 1) {
    console.log('is greater than 0')
    return values.reduce((one, two) => {
      return one + two
    })
  } else {
    console.log('is not greater than 0')
    return 0
  }
}

function cart(state = initialCartState, action) {
  switch(action.type) {
    default:
      return {
        quantity: getQuantity(state.quantityById, action),
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      };
  }
}

const rootReducer = combineReducers({
  products,
  cart
})

export default rootReducer
