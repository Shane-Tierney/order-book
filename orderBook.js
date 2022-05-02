const v8 = require('v8')
const structuredClone = (o) => v8.deserialize(v8.serialize(o))

const reconcileOrder = (existingBook, newOrder) => {
  let activeReqs = structuredClone(existingBook)
  let newReq = structuredClone(newOrder)


  let dealArray = []
  let noDealArray = []


  if (activeReqs.length === 0) {
    noDealArray.push(newReq)

    return noDealArray
  }


  for (let i = 0; i < activeReqs.length; i++) {
    const currentReq = activeReqs[i]

    if (typeMatch(newReq, currentReq) && priceMatch(newReq, currentReq)) {
      const dealMade = makeDeal(newReq, currentReq)

      if (dealMade.quantity > 0) {
        dealArray.push(dealMade)
      }
    } else {
      noDealArray.push(currentReq)
    }
  }

  if (newReq.quantity > 0) {
    dealArray.push(newReq)
  }

  let returnArray = [...noDealArray, ...dealArray]

  return returnArray
}
const typeMatch = (newReq, currentReq) => {
  if (newReq.type !== currentReq.type) return true
}

const priceMatch = (newReq, currentReq) => {
  if (buyDeal(newReq, currentReq) || sellDeal(newReq, currentReq)) {
    return true
  }
}

const buyDeal = (newReq, currentReq) => {
  if (newReq.type === 'buy' && currentReq.price <= newReq.price) return true
}

const sellDeal = (newReq, currentReq) => {
  if (newReq.type === 'sell' && currentReq.price >= newReq.price) return true
}

const makeDeal = (newReq, currentReq) => {
  const quantityRemaining = calculateQuantity(newReq, currentReq)

  currentReq.quantity -= quantityRemaining
  newReq.quantity -= quantityRemaining

  return currentReq
}

const calculateQuantity = (newReq, currentReq) => {
  return Math.min(newReq.quantity, currentReq.quantity)
}

module.exports = reconcileOrder
