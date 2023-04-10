import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './PokemonDetails.css';

function PokemonDetails( { accessToken, setAccessToken, refreshToken}) {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    async function fetchPokemon() {
      try {        
        const response = await axios.get(`http://localhost:6001/api/v1/pokemon?id=${id}` , {
          headers: {
            'auth-token-access': accessToken,
            'auth-token-refresh': refreshToken
          }
        });        
        setPokemon(response.data[0]);  
        console.log(response.data[0]);      
      } catch (error) {
        if (error.response.status === 401) {
          // if access token is expired, set it to null to trigger a new token request on the next fetch
          const getNewToken = await axios.post(
            'http://localhost:5000/requestNewAccessToken', {}, {
              headers: {
                'auth-token-refresh': refreshToken
              }
            });
          setAccessToken(getNewToken.headers['auth-token-access']);
        } else {
          console.error(error);
        }
      }
    }
    fetchPokemon();
  }, [id , accessToken]);

  if (!pokemon.name) {
    return <div>wtf...</div>;
  }

  const callf = (id) => {
    if (id < 10) {
      return '00';
    } else if (id < 100) {
      return '0';
    } else {
      return '';
    }
  };

  return (
    <>    
    <div className='pokemon-details'>
      <h1>{pokemon.name.english}</h1>
      <img src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${callf(pokemon.id)}${pokemon.id}.png`} alt={pokemon.name.english} />
      <p>HP: {pokemon.base.HP}</p>
      <p>Attack: {pokemon.base.Attack}</p>
      <p>Defense: {pokemon.base.Defense}</p>
      <p>Speed: {pokemon.base.Speed}</p>
      <p>Type: </p>
      <ul className='types'> 
        {pokemon.type.map(type => <li key={type}>{type}</li>)}
      </ul>
    </div>
    </>
  );
}

export default PokemonDetails;
