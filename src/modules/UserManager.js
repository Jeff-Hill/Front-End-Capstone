import APIManager from "./APIManager.js"
const remoteURL = "http://localhost:5002"



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

  removeAndList(resource, id) {
        return APIManager.delete(resource, id)
        .then( () => this.getAll(resource))
  },

  put(resource, resourceObjId) {
    return APIManager.put(resource, resourceObjId)
  },
  expandCity(resource) {
        return APIManager.allWithCity(resource)
  },
  getWithSellerProfile (resource, id) {

      return fetch(`${remoteURL}/${resource}/${id}?_embed=sellerProfiles`).then(e => e.json())

},


}