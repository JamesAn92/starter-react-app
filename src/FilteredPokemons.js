import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './FilteredPokemons.css'

function FilteredPokemons({ searchName, pokemons, filteredPokemons, setFilteredPokemons, pageNumber, typeSelectedArray }) {

    useEffect(() => {
        setFilteredPokemons(
            pokemons.filter((pokemon) =>
                typeSelectedArray.every((type) => pokemon.type.includes(type))
            )
            .filter((pokemon) => pokemon.name.english.toLowerCase().includes(searchName.toLowerCase()))
        );
    }, [pokemons, typeSelectedArray, setFilteredPokemons, searchName]);

    const pokemonPerPage = 10;
    const start = (pageNumber - 1) * pokemonPerPage;
    const end = start + pokemonPerPage;
    const pokemonsPerPage = filteredPokemons.slice(start, end);

    const callf = (id) => {
        if (id < 10) {
            return '00';
        } else if (id < 100) {
            return '0';
        } else {
            return '';
        }
    }

    return (
        <div>
            <h1>Page number {pageNumber}</h1>
            <div className='pokemons'> 
            {
                pokemonsPerPage.map((pokemon, index) => {
                    if (typeSelectedArray.every(type => pokemon.type.includes(type))) {
                        return (
                            <div key={index} className='pokemon-img'>
                                <Link to = {`/pokemon/${pokemon.id}`}>
                                    <p>{pokemon.name.english}</p>
                                    <img src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${callf(pokemon.id)}${pokemon.id}.png`} alt={pokemon.name.english} />
                                    <ul className='types'>
                                        {pokemon.type.map(type => <li key={type}>{type}</li>)}
                                    </ul>
                                </Link>
                            </div>
                        )
                    } else {
                        return null;
                    }
                })
            }
            </div>
        </div>
    )

}


export default FilteredPokemons