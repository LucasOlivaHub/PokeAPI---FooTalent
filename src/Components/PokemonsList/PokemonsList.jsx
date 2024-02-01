
import { PokemonItem } from './PokemonItem/PokemonItem'
import './pokemonslist.css'

export const PokemonsList = ({pokemonslist}) => {


  return (
    <article className='pokemons-list-container'>
              {pokemonslist && pokemonslist.map(p => {
                return <PokemonItem pokemon={p} key={p.name}/>
              })}
    </article>
  )
}
