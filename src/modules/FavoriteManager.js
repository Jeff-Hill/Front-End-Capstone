import APIManager from "./APIManager.js"
const remoteURL = "http://localhost:5002";


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
  },

  removeAndList(resource, id) {
      return APIManager.delete(resource, id).then(() => this.getAll(resource));
    },

    getAllByUser(resource) {
      return fetch(`${remoteURL}/${resource}?favoriterId=${sessionStorage.getItem("userId")}`).then(e => e.json())
    },


}