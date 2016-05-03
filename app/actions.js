// import stuff here
import _ from 'underscore'

export const REQUEST_PRODUCTS = "REQUEST_PRODUCTS"
export const FETCH_PRODUCTS = "FETCH_PRODUCTS"
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS"
export const ADD_TO_CART = "ADD_TO_CART"
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"
export const GET_QUANTITY = "GET_QUANTITY"
export const REQUEST_TRAINEES = "REQUEST_TRAINEES"
export const RECEIVE_TRAINEES = "RECEIVE_TRAINEES"
export const SEND_INVITE = "SEND_INVITE"
export const PLACE_ORDER = "PLACE_ORDER"

function requestProducts() {
  return {
    type: REQUEST_PRODUCTS
  }
}

function receiveProducts(res) {
  console.log(res)
  return {
    type: RECEIVE_PRODUCTS,
    items: res.products,
    account: res.account,
    receivedAt: Date.now()
  }
}


function fetchProducts() {
  return (dispatch) => {
    dispatch(requestProducts())
    return fetch('http://hotfix.sbx.marln.com/umbraco/api/OrderApi/GetLastCompletedOrder?&accountNumber=1000007')
      .then(req => req.json())
      .then((json) => {
        let products = json.order.OrderItems.map(product => {
          return {
            id: product.ProductID,
            name: product.Name,
            SKU: {
              value: product.Size,
              number: product.SKUNumber,
              UOM: product.UOM
            }
          }
        })

        let account = {
          address: json.order.ShipToAddress1,
          city: json.order.ShipToCity,
          state: json.order.ShipToState,
          postalCode: json.order.ShipToPostalCode,
          accountjNumber: json.order.AccountNumber,
          email: json.order.EmailAddress,
          phone: json.order.Telephone,
          name: json.order.CustomerName
        }

        console.log(products)
        console.log(account)

        dispatch(receiveProducts({products, account}))
      })
  }
}

function shouldFetchProducts(state) {
  let products = state.products.items.length >= 1;
  if (!products) {
    return true
  } else if (products.isFetching) {
    return false
  } else {
    // invalidate and call fetch again here if data is different ??
    return true
  }
}

export function fetchProductsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchProducts(getState())) {
      return dispatch(fetchProducts())
    }
  }
}

function addToCart(id, quantity) {
  return {
    type: ADD_TO_CART,
    id,
    quantity
  }
}

function removeFromCart(id) {
  return {
    type: REMOVE_FROM_CART,
    id
  }
}

export function getQuantity() {
  return {
    type: GET_QUANTITY
  }
}

function requestTrainees() {
  return {
    type: REQUEST_TRAINEES
  }
}

function receiveTrainees(trainees) {
  return {
    type: RECEIVE_TRAINEES,
    trainees: trainees,
    receivedAt: Date.now()
  }
}

function fetchTrainees() {
  return (dispatch) => {
    dispatch(requestTrainees())
    return fetch('http://hotfix.sbx.marln.com/umbraco/api/invitesApi/GetByAccount?operatorUserId=5665&usersCultureAlias=en-US&accountNumber=1000007')
      .then(req => req.json())
      .then((json) => {
        console.log(json)
        dispatch(receiveTrainees(json))
      })
  }
}

function shouldFetchTrainees(state) {
  let products = state.products.items.length >= 1;
  if (!products) {
    return true
  } else if (products.isFetching) {
    return false
  } else {
    // invalidate and call fetch again here if data is different ??
    return true
  }
}

export function fetchTraineesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTrainees(getState())) {
      return dispatch(fetchTrainees())
    }
  }
}

export function sendInvite(invite) {
  return {
    type: SEND_INVITE,
    invite: Object.assign({}, invite, {
      dateInvited: Date.now()
    })
  }
}

export function updateCart(id, quantity) {
  return (dispatch, getState) => {
      if(quantity >= 1) {
        dispatch(addToCart(id, quantity))
      } else {
        dispatch(removeFromCart(id))
      }
  }
}

export function placeOrder(products) {
  return {
    type: PLACE_ORDER,
    order: products
  }
}
