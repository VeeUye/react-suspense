// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {PokemonDataView, fetchPokemon, PokemonErrorBoundary } from '../pokemon'
import {Suspense} from 'react'

let pokemon
let pokemonError

const pokemonPromise = fetchPokemon('piachu').then(
    result => (pokemon = result),
    error => (pokemonError = error)
)

function PokemonInfo() {
    if (pokemonError) {
        throw pokemonError
    }
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
                <PokemonErrorBoundary>
                    <Suspense fallback={<div>Loading Pokeman...</div>}>
                        <PokemonInfo />
                     </Suspense>
                </PokemonErrorBoundary>
            </div>
         </div>
  )
}

export default App
