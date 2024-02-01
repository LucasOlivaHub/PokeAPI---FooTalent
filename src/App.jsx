import './App.css'
import { PokeAPIContainer } from './Components/PokeAPIContainer/PokeAPIContainer'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { PokemonDetails } from './Components/PokemonDetails/PokemonDetails'
import { Footer } from './Components/Footer/Footer'


function App() {

  return (
    <div className="background">
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={ <PokeAPIContainer/>} />
          <Route path='/pokemon/:nombre' element={ <PokemonDetails/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
     
    </div>
  )
}

export default App
