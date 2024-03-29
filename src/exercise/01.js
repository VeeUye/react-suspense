// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {PokemonDataView, fetchPokemon, PokemonErrorBoundary } from '../pokemon'
import {Suspense} from 'react'
import {createResource} from '../utils'

const pokemonResource = createResource(fetchPokemon('pikachu'))


function PokemonInfo() {
    const pokemon = pokemonResource.read()
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
