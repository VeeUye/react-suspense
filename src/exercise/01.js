// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {PokemonDataView, fetchPokemon} from '../pokemon'
import {Suspense} from 'react'

let pokemon

const pokemonPromise = fetchPokemon('pikachu').then(p => (pokemon = p))

function PokemonInfo() {
    if (!pokemon) {
        throw pokemonPromise
    }

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
          <Suspense fallback={<div>Loading Pokeman...</div>}>
              <PokemonInfo />
          </Suspense>

      </div>
    </div>
  )
}

export default App
