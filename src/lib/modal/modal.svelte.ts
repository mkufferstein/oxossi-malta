import type {
  Component,
} from 'svelte'

const clearState = {component: null, controls: null, properties: null}

let store : {
  component: Component<any, {}, string> | null,
  controls: Array<{class: string, callback: CallableFunction}> | null,
  properties: Record<string, any> | null
} = $state(clearState)

export const modal = {
  set component (newModal: Component<any, {}, string> | null) { store.component = newModal},
  get component () : Component<any, {}, string> | null { return store.component },
  set controls (newControls: Array<{class: string, callback: CallableFunction}> | null) { store.controls = newControls},
  get controls () : Array<{class: string, callback: CallableFunction}> | null { return store.controls },
  set properties (newProperties: Record<string, any> | null) {store.properties = newProperties},
  get properties () : Record<string, any> | null { return store.properties },
  clear: () => {
    store.component = clearState.component
    store.controls = clearState.controls
    store.properties = clearState.properties
  }
}