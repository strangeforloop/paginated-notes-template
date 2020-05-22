const BASE_URL = "https://5ec6cb575961a20016a9ea49.mockapi.io";
const PAGE_LIMIT = 10;

const getNotes = async (page) => {
    // console.log('calling get notes');
    // try {
    //     await fetch(`${BASE_URL}/notes/?page=${page}&limit=${PAGE_LIMIT}`, {
    //     method: 'GET'
    //   }).then(response => response.json()).then((data) => {
    //     console.log('data being returned', data);
    //     return data;
    //   })
    // } catch (e) {
    //   console.log(e);
    // }
  var response = await fetch(`${BASE_URL}/notes/?page=${page}&limit=${PAGE_LIMIT}`);
  return response;
}

export { getNotes };