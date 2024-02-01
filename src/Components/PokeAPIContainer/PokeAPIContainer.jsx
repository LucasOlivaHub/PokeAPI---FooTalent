import { useEffect, useState } from 'react'
import { PokemonsList } from '../PokemonsList/PokemonsList'
import pikachudetective from '../../assets/pikachu-detective.png'
import './pokeapicontainer.css'
import { fetchData } from '../../helpers/fetchPokemonDetail';

export const PokeAPIContainer = () => {

  const [pokemonsList, setPokemonsList] = useState([]);
  const [pokemonsCopy, setPokemonsCopy] = useState([]);

  /* Estados para la búsqueda de pokemones */
  const [pokemonsData, setPokemonsData] = useState([]);
  const [search, setSearch] = useState("");

/* Cargar pokemones normalmente */
  useEffect(() => {
    /* Si no hay busqueda, recargar pokemones */
    if(search === "") {
      getPokemons();
    }
  }, [search]); // Observar cuando cambia search para actualizar pokemones


/* Una vez cargada la lista de pokemones, obtener sus datos para el peso y altura */  
useEffect(() => {
    getPokemonsData();
}, [pokemonsList]) // Observar cuando cambia pokemonslist para actualizar datos


/* Busqueda pokemons por search */
function searchFilter(filter) {
  setSearch(filter); //Indicar al estado de search que se está buscando algo
  
  /* Filtrar por busqueda en search */
  if (filter) {
    const filteredPokemons = pokemonsCopy.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()));
    /* Actualizar los pokemones con el search */
    setPokemonsList(filteredPokemons);
  } else {
    // Si no hay búsqueda, restaurar la lista original
    getPokemons();
  }
}

/* Filtros por peso y altura */

function filterByWeight(filtro) {
  //Filtrar por peso según el value del select
    if(filtro === "mayor-peso") {
      const sortedPokemons = pokemonsData.sort((a, b) => b.weight - a.weight);
      setPokemonsList(sortedPokemons);
    } else if (filtro === "menor-peso") {
      const sortedPokemons = pokemonsData.sort((a, b) => a.weight - b.weight);
      setPokemonsList(sortedPokemons);
    } else if (filtro === "nofilter") {
      getPokemons();
    }
}

function filterByHeight(filtro) {
  //Filtrar por altura según el value del select
  if(filtro === "mayor-altura") {
    const sortedPokemons = pokemonsData.sort((a, b) => b.height - a.height);
    setPokemonsList(sortedPokemons);
  } else if (filtro === "menor-altura") {
    const sortedPokemons = pokemonsData.sort((a, b) => a.height - b.height);
    setPokemonsList(sortedPokemons);
  } else if (filtro === "nofilter") {
    getPokemons();
  }
}

/* Funcion para cargar todos los pokemones */
function getPokemons() {
  const fetchData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
      const data = await response.json();

      /* verificar que no haya un search activo */
      if (search) {
        const filteredPokemons = pokemonsCopy.filter((p) => p.name.includes(search));
        /* Actualizar los pokemones con el search */
        setPokemonsList(filteredPokemons);
      } else {
        // Si no hay busqueda, actualizar la lista con todos los pokemones
        setPokemonsList(data.results);
      }
     // Actualizar copia para busquedas con filter (height-weight)
      setPokemonsCopy(data.results)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //llamar a la función para cargar los pokemones
  fetchData();
}

/* Funcion para cargar los datos de los pokemones (una vez cargados) */
function getPokemonsData() {
  const promises = pokemonsList.map(p => fetchData(p.name));
  
  Promise.all(promises)
    .then(dataArray => {
      setPokemonsData(dataArray);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}



  return (
    <main>
        <section className='pokeapi-container'>
          <article className='title-container'>
            <h2 translate='no'>PokeAPI</h2>
            <p>Search for pokemons, find it all</p>
          </article>

          <article className='filters-container'>
              <input className='search-filter' type='search' value={search}
              onInput={(e) => searchFilter(e.target.value)} 
              placeholder='Search by name...'/>

              <div className='filtersby-container'>
                  <select className='filter-weight' onChange={(e) => filterByWeight(e.target.value)}>
                    <option value={"nofilter"}>--Filter by weight--</option>
                    <option value={"menor-peso"}>Lower weight</option>
                    <option value={"mayor-peso"}>Higher weight</option>
                  </select>

                  <select className='filter-height' onChange={(e) => filterByHeight(e.target.value)}>
                    <option value={"nofilter"}>Filter by height</option>
                    <option value={"menor-altura"}>Lower height</option>
                    <option value={"mayor-altura"}>Higher height</option>
                  </select>
              </div>
          </article>
          {(pokemonsList.length === 0 && search.length > 0) ?
          <div className='search-error'>
            <img className='search-error-pikachu' src={pikachudetective} loading='lazy'/>
            <p>Oops! We didn&apos;t find &quot;<b>{search}</b>&quot;, try again</p>
          </div>
            :
            <>
            <br/>
             <span className='current-pokemons-text'>Current pokemons: {pokemonsList.length}</span>
            <PokemonsList pokemonslist={pokemonsData}/>
            </>
          }
         
        </section>
    </main>
  )   
}
