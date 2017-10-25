/* eslint-disable no-param-reassign */
export default function(breakpoints, overlap) {
  const mq = [''].concat(breakpoints)
  function flatten(obj) {
    if (Array.isArray(obj)) {
      return obj.map(flatten)
    }

    return Object.keys(obj).reduce((slots, key) => {
      if (Array.isArray(obj[key])) {
        let prior
        obj[key].forEach((v, index) => {
          // Optimize by removing duplicated media query entries
          // when they are explicitly known to overlap.
          if (overlap && prior === v) {
            return
          }

          if (v == null) {
            // Do not create entries for undefined values as this will
            // generate empty media media quries
            return
          }

          prior = v

          if (index === 0) {
            slots[key] = v
          } else if (!slots[mq[index]]) {
            slots[mq[index]] = { [key]: v }
          } else {
            slots[mq[index]][key] = v
          }
        })
      } else if (typeof obj[key] === 'object') {
        slots[key] = flatten(obj[key])
      } else {
        slots[key] = obj[key]
      }
      return slots
    }, {})
  }

  return (...values) => values.map(flatten)
}
