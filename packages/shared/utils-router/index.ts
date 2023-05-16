import type { RouteLocation } from 'vue-router'

export function redirectToFirstChildName (to:RouteLocation) {
  const currentMatched = to.matched.at(-1)
  const c = currentMatched?.children[0]
  if (c?.name) {
    return {
      name: c.name,
    }
  }
}
