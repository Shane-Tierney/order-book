const reconcileOrder = (book, order) => {
  if (book.length === 0) {
    book.push(order)
  }

  return book
}

module.exports = reconcileOrder
