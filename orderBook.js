const v8 = require('v8')
const structuredClone = (o) => v8.deserialize(v8.serialize(o));

const reconcileOrder = (existingBook, newOrder) => {
  let activeReqs = structuredClone(existingBook)
  let newReq = structuredClone(newOrder)


  let dealArray = []
  let noDealArray = []


  if (activeReqs.length === 0) {
    noDealArray.push(newReq)

    return noDealArray
  }
}

module.exports = reconcileOrder
