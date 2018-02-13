/* eslint-disable no-param-reassign */
export default function(breakpoints, { literal, overlap } = {}) {
  const mq = literal ? breakpoints : ['&'].concat(breakpoints)

  function flatten(obj) {
    if (typeof obj !== 'object' || obj == null) {
      return []
    }

    if (Array.isArray(obj)) {
      return obj.map(flatten)
    }

    const slots = {}
    const objects = {}
    const props = {}
    Object.keys(obj).forEach(key => {
      // Check if value is an array, but skip if it looks like a selector.
      // key.indexOf('&') === 0

      let item = obj[key]
      if (!Array.isArray(item) && literal) item = [item]

      if ((literal || Array.isArray(item)) && key.charCodeAt(0) !== 38) {
        let prior
        item.forEach((v, index) => {
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

          if (index === 0 && !literal) {
            props[key] = v
          } else if (slots[mq[index]] === undefined) {
            slots[mq[index]] = { [key]: v }
          } else {
            slots[mq[index]][key] = v
          }
        })
      } else if (typeof item === 'object') {
        objects[key] = flatten(item)
      } else {
        props[key] = item
      }
    })

    // Ensure that all slots and then child objects are pushed to the end
    mq.forEach(el => {
      if (slots[el]) {
        props[el] = slots[el];
      }
    })
    Object.assign(props, objects)
    return props
  }

  return (...values) => values.map(flatten)
}
