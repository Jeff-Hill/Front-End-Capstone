import APIManager from "./APIManager.js";
const remoteURL = "http://localhost:5002";

export default {
  get(resource, id) {
    return APIManager.get(resource, id);
  },

  getAll(resource) {
    return APIManager.all(resource);
  },

  post(resource, resourceObj) {
    return APIManager.post(resource, resourceObj);
  },

  removeAndList(resource, id) {
    return APIManager.delete(resource, id).then(() => this.getAll(resource));
  },
  delete(resource, id) {
    return APIManager.delete(resource, id);
  },

  put(resource, resourceObjId) {
    return APIManager.put(resource, resourceObjId);
  },

  expandCity(resource) {
    return APIManager.allWithCity(resource);
  },

  getWithSellerProfile(resource, id) {
    return fetch(`${remoteURL}/${resource}/${id}?_embed=sellerProfiles`).then(
      e => e.json()
    );
  },
  getUserByCity(resource, cityId) {
    return fetch(`${remoteURL}/${resource}?cityId=${cityId}`).then(e =>
      e.json()
    );
  },

  getUserByNeedsWood(resource, userNeedsWood) {
      return fetch(`${remoteURL}/${resource}?userNeedsWood=${userNeedsWood}`).then(e =>
        e.json()
      );
    },

  getUserByType(resource, userSeller) {
      return fetch(`${remoteURL}/${resource}?userSeller=${userSeller}`).then(e =>
        e.json()
      );
    },

  getUserBuyer(resource) {
      return fetch(`${remoteURL}/${resource}?userSeller=false`).then(e =>
        e.json()
      );
    },

  getBuyerByCity(resource, cityId) {
      return fetch(`${remoteURL}/${resource}?userSeller=false&cityId=${cityId}`).then(e =>
        e.json()
      );
    },

  getBuyerNeedsWood(resource, userNeedsWood) {
      return fetch(`${remoteURL}/${resource}?userSeller=false&userNeedsWood=${userNeedsWood}`).then(e =>
        e.json()
      );
    },

  getUserSeller(resource) {
      return fetch(`${remoteURL}/${resource}?userSeller=true`).then(e =>
        e.json()
      );
    },

  getSellerByCity(resource, cityId) {
      return fetch(`${remoteURL}/${resource}?userSeller=true&cityId=${cityId}`).then(e =>
        e.json()
      );
    }
};
