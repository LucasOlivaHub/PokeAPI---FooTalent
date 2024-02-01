import {  useState } from "react"
import './pokemonitem.css'
import { Link } from "react-router-dom";

export const PokemonItem = ({pokemon}) => {

  const [pokemonInfo, setPokemonInfo] = useState(pokemon);

  return (
    <Link to={`/pokemon/${pokemon.name}`} className="pokemon-item">
      {pokemonInfo && 
        <>
          <img src={pokemonInfo.sprites.front_default} loading="lazy"/> 
          <h3 className="pokemon-name">{pokemonInfo.name}</h3>
          <h4>Id: {pokemonInfo.id}</h4>
          <div className="pokemon-info">
            <span className="pokemon-height">Height: {pokemonInfo.height * 10} cm</span>
            <span className="pokemon-weight">Weight: {pokemonInfo.weight} kg</span>
          </div>
        </>
      }
    </Link>
  )
}
