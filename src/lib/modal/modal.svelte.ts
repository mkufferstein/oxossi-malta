import type {
  Component,
} from 'svelte'

const clearState = {component: null, properties: null}

let store : {component: Component | null, properties: Record<string, any> | null} = $state(clearState)

export const modal = {
  set component (newModal: Component | null) { store.component = newModal},
  get component () : Component | null { return store.component },
  set properties (newProperties: Record<string, any> | null) {store.properties = newProperties},
  get properties () : Record<string, any> | null { return store.properties },
  clear: () => {
    store.component = clearState.component
    store.properties = clearState.properties
  }
}