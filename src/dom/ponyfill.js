export function closest(element, selector) {
  if (element.closest) {
    return element.closest(selector)
  }
  let el = element
  while (el) {
    if (this.matches(el, selector)) {
      return el
    }
    el = el.parentElement
  }
  return null
}

export function matches(element, selector) {
  const nativeMatches =
    element.matches ||
    element.webkitMatchesSelector ||
    element.msMatchesSelector
  return nativeMatches.call(element, selector)
}
