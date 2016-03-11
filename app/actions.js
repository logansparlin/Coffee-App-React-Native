// import stuff here
import _ from 'underscore'

export const REQUEST_PRODUCTS = "REQUEST_PRODUCTS"
export const FETCH_PRODUCTS = "FETCH_PRODUCTS"
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS"
export const ADD_TO_CART = "ADD_TO_CART"
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"
export const GET_QUANTITY = "GET_QUANTITY"

function requestProducts() {
  return {
    type: REQUEST_PRODUCTS
  }
}

function receiveProducts(products) {
  return {
    type: RECEIVE_PRODUCTS,
    items: products,
    receivedAt: Date.now()
  }
}


function fetchProducts() {
  return (dispatch) => {
    dispatch(requestProducts())
    return fetch('http://solutions.starbucks.com/Umbraco/Api/ProductApi/GetAllProducts')
      .then(req => req.json())
      .then((json) => {
        let products = json.allProducts.filter(product => {
          if(product.IsCoffee) {
            return true
          }
        }).map(product => {
          return {
            id: product.ProductInformation.ProductID,
            name: product.ProductInformation.Name,
            SKU: {
              value: product.SkuInformation[product.SkuInformation.length-1].Value,
              number: product.SkuInformation[product.SkuInformation.length-1].SKUNumber,
              UOM: product.SkuInformation[product.SkuInformation.length-1].UOM
            }
          }
        })

        dispatch(receiveProducts(products))
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

export function updateCart(id, quantity) {
  return (dispatch, getState) => {
      if(quantity >= 1) {
        dispatch(addToCart(id, quantity))
      } else {
        dispatch(removeFromCart(id))
      }
  }
}
