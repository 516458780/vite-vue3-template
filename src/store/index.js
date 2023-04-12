import main from './main.js'

const storeModel = {
  main
}

const store = {}

for (const key in storeModel) {
  store[key] = storeModel[key]()
}

export default {
  storeModel,
  store
}
