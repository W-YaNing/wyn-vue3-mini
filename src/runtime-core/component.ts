import { PublicInstanceProxyHandlers } from './componentPublicInstance'


export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    el: null
  }
  return component
}

export function setupComponent(instance) {
  // TODO:
  // initProps
  // initSlots

  setupSatefulComponent(instance)
}

function setupSatefulComponent(instance) {
  const Component = instance.type

  instance.proxy = new Proxy({ _ : instance}, PublicInstanceProxyHandlers)

  const { setup } = Component

  if(setup) {
    const setupResult = setup()
    handleSetupResult(instance, setupResult)
  }

}

function handleSetupResult(instance, setupResult) {
  // function object
  // TODO function 
  if(typeof setupResult === 'object') {
    instance.setupState = setupResult
  }

  finishComponentSetup(instance)
}

function finishComponentSetup(instance) {
  const Component = instance.type

  instance.render = Component.render

}