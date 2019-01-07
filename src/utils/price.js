function getRateSum(persons) {
  let sum = 0
  for (let person of persons) {
    // skip fied price person
    if (!person.fixed) sum += Number(person.rate)
  }
  return sum
}
function getFixedPrice(persons) {
  let fixedPriceSum = 0
  for (let person of persons) {
    // skip fied price person
    if (person.fixed) fixedPriceSum += Number(person.price)
  }
  return fixedPriceSum
}
export function getAveragePrice(price, persons) {
  // calc fiexd price sum
  let fixedPriceSum = getFixedPrice(persons)
  // calc average price
  let rateSum = getRateSum(persons)

  return (price - fixedPriceSum) / rateSum
}
