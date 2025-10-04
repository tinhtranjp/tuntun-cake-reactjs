export const renderBackGroundQuantity = (qtt) => {
  if (qtt > 30) {
    return "success"
  } else if (qtt > 10) {
    return "warning"
  } else {
    return "error"
  }
}
export const renderBackGroundPrice = (price) => {
  if (price > 500000) {
    return "primary"
  } else if (price > 100000) {
    return "success"
  } else if (price > 10000) {
    return "warning"
  } else {
    return "default"
  }
}
