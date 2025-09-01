const baseUrl = "http://localhost:3001";

function checkReponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkReponse);
}

function addItems(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weatherType,
    }),
  }).then(checkReponse);
}

function removeItems(item) {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
  }).then(checkReponse);
}

export { getItems, addItems, removeItems, checkReponse };
