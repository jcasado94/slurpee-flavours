
const storesEndpoint = 'http://localhost:3001/stores/'

export default {
  getAllStores() {
    return fetch(storesEndpoint).then(data => data.json());
  }
}