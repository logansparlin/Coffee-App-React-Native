// import stuff here

export const REQUEST_PRODUCTS = "REQUEST_PRODUCTS"
export const FETCH_PRODUCTS = "FETCH_PRODUCTS"
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS"

function requestProducts() {
  return {
    type: REQUEST_PRODUCTS
  }
}

function receiveProducts(json) {
  return {
    type: RECEIVE_PRODUCTS,
    items: json,
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
            return product
          }
        })
        dispatch(receiveProducts(products))
      })
  }
}

function shouldFetchProducts(state) {
  const products = state.products.items.length >= 1;
  if (!products) {
    return true
  } else if (products.isFetching) {
    return false
  } else {
    // invalidate and call fetch again here if data is different ??
    return false
  }
}

export function fetchProductsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchProducts(getState())) {
      return dispatch(fetchProducts())
    }
  }
}
