// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {PokemonDataView, fetchPokemon, PokemonErrorBoundary } from '../pokemon'
import {Suspense} from 'react'

function createResource(promise) {
    let status = 'pending'
    let result = promise.then(
        resolved => {
            status = 'success'
            result = resolved
        },
        rejected => {
            status = 'error'
            result = rejected
        },
    )
    return {
        read() {
            if (status === 'pending') throw result
            if (status === 'error') throw result
            if (status === 'success') return result
            throw new Error('This should be impossible')
        },
    }
}

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
