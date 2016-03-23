import _ from 'underscore'
import {
  ADD_TO_CART,
  REMOVE_FROM_CART
} from '../actions'

const initialState = {
    quantity: 0,
    addedIds: [],
    quantityById: {}
}

function addedIds(state = initialState.addedIds, action) {
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
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    default:
      return state;
  }
}

function quantityById(state = initialState.quantityById, action) {
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

function getQuantity(state = initialState.quantityById, action) {
  const values = _.values(quantityById(state, action))
  if(values.length >= 1) {
    return values.reduce((one, two) => {
      return one + two
    })
  } else {
    return 0
  }
}

function getProduct(products, id) {
  return _.findWhere(products, { id: id })
}

export function getCartProducts(state) {
  return state.cart.addedIds.map(id => {
    return Object.assign(
      {},
      getProduct(state.products.items, id),
      { quantity: state.cart.quantityById[id] }
    )
  })
}

export default function cart(state = initialState, action) {
  switch(action.type) {
    default:
      return {
        quantity: getQuantity(state.quantityById, action),
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      };
  }
}
