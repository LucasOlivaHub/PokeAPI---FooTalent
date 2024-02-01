import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchData } from "../../helpers/fetchPokemonDetail";
import './pokemondetails.css'

export const PokemonDetails = () => {

    const [pokemonData, setPokemonData] = useState([])
    // Guardar el nombre del pokemon para buscarlo
    const name = useParams().nombre;

    //Obtener los datos del pokemon
    useEffect(() => {
        getPokemonsData()
    }, [])

    useEffect(() =>{
        console.log('pokemonData:', pokemonData)
    }, [pokemonData])


    /* Obtener los datos del pokemon */
    function getPokemonsData() {
        const data = fetchData(name)
          .then(dataArray => {
            setPokemonData(dataArray);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }

  return (
    <div className="pokemon-details-container">
        <Link className="btn-volver" to={"/"}>Go back</Link>
    {pokemonData.sprites && 
        <section className="pokemon-container">
        
            <article className="pokemon-main">
                <img src={pokemonData.sprites.front_default} />
                <h3 className="pokemon-name">{pokemonData.name}</h3>
            </article>
            <h4>Details:</h4>
            <article className="pokemon-info-container">
                <div className="pokemon-info">
                    <b>Weight:</b> <p>{pokemonData.weight} kg</p>
                    <b>Height:</b> <p>{pokemonData.height} cm</p>
                </div>

                <div className="pokemon-info"> 
                    <b>Abilities: </b> {pokemonData.abilities && 
                    pokemonData.abilities.map((a) => {
                        return <p key={a.ability.name}>{a.ability.name}</p>
                    })}
                </div>

                <div className="pokemon-info"> 
                    <b>Stats: </b> {pokemonData.stats && 
                    pokemonData.stats.map((s) => {
                        return <p className="stat" key={s.stat.name}> ‣ {s.stat.name}: 
                            <i className={
                                s.base_stat < 50
                                ? "low-stat"
                                : s.base_stat >= 50 && s.base_stat <= 75
                                ? "medium-stat"
                                : "good-stat"
                            }>
                            {s.base_stat}
                            </i>
                        </p>
                    })}
                </div>
          

                <div className="pokemon-info"> 
                    <b>Types: </b> {pokemonData.types && 
                    pokemonData.types.map((t) => {
                        return <p key={t.type.name}>{t.type.name}</p>
                    })}
                </div>

               
            </article>
        </section>
    }
    </div>
   
  )
}
