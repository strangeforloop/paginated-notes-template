const BASE_URL = "https://0f057310-7014-47a7-8edb-26d66a5f7c7a.mock.pstmn.io";
const PAGE_LIMIT = 10;

const getNotes = async (page) => {
  console.log('calling api');
  var response = await fetch(`${BASE_URL}/notes/?page=${page}`);
  // var response = await fetch(`${BASE_URL}/notes/?page=1`);
  console.log(response);
  return response;
}

export { getNotes };