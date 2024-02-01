export const fetchPokemonData = async (pokemon) => {
    try {
      // Hacer la solicitud para obtener la URL de los detalles del Pokémon
      const detailsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
      const detailsData = await detailsResponse.json();

      // Retornar información de los detalles del Pokémon (detailsData)
      return detailsData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

export const fetchData = async (nombre) => {
    try {
      // Llamar a la función fetchPokemonData para obtener los detalles del Pokémon
      const detailsData = await fetchPokemonData(nombre);
      return detailsData //Retornar los detalles del pokemon
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};