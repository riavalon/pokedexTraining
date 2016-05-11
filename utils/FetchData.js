const apiUrl = 'http://pokeapi.co/api/v2/pokemon/';

export const makeSearch = (query) => {
  const search = fetch(apiUrl + query)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data
    })
    .catch(error => console.error);

  return search;
};

export const getTopPokemon = () => {
  const search = fetch(apiUrl)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data.results;
    })
    .catch(error => console.error);

  return search;
}
