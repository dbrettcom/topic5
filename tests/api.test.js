const axios = require('axios');
API_URL="http://localhost:5000/api"

test('test device array', () => {
  return axios.get(`${API_URL}/devices`)
    .then(resp => resp.data)
    .then(resp => {
      console.log(resp[2]);
      expect(resp[2].user).toEqual('Dan');
    });
  });