export function addTocartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id
  }
}
export function addTocartSuccess(item) {
  return {
    type: '@cart/ADD_SUCCESS',
    item
  }
}
export function removeFromcart(id) {
  return {
    type: '@cart/REMOVE',
    id: id
  }
}

export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id: id,
    amount
  }
}


export function updateAmountSuccess(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    id: id,
    amount
  }
}