import APIManager from "./APIManager.js"


export default {
  get(resource, id) {
        return APIManager.get(resource, id)
  },

  getAll(resource) {
        return APIManager.all(resource)
  },

  post(resource, resourceObj) {
        return APIManager.post(resource, resourceObj)
  },

  remove(resource, id) {
        return APIManager.delete(resource, id)

  },

  put(resource, resourceObjId) {
    return APIManager.put(resource, resourceObjId)
  }


}