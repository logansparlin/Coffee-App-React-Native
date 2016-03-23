import { combineReducers } from 'redux'
import products from './products'
import cart from './cart'
import training from './training'

const rootReducer = combineReducers({
  products,
  cart,
  training
})

export default rootReducer
export * from './cart'
export * from './products'
