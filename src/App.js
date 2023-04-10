import Search from "./Search";
import FilteredPokemons from "./FilteredPokemons";
import { useEffect, useState } from "react";
import Pagination from './Pagination';
import axios from 'axios';
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Route as ReactDOMRoute } from 'react-router';
import PokemonDetails from './PokemonDetails';

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [typeSelectedArray, setTypeSelectedArray] = useState([]);
  const [searchName, setSearchName] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    async function getPokemons() {
      const res = await axios.get('http://localhost:6001/api/v1/pokemons/', {
        headers: {
          'auth-token-access': accessToken,
          'auth-token-refresh': refreshToken
        }
      });
      setPokemons(res.data);
    }
    if (accessToken) {
      getPokemons();
    }
  }, [accessToken]);



  return (
    <>
      <Router>
        {loggedIn ? (
          <>      
              <Login
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              user={user}
              setUser={setUser}
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              refreshToken={refreshToken}
              setRefreshToken={setRefreshToken}
              isRegistering={isRegistering}
              setIsRegistering={setIsRegistering}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
            <Search
              setTypeSelectedArray={setTypeSelectedArray}
              typeSelectedArray={typeSelectedArray}
              setPageNumber={setPageNumber}
              searchName={searchName}
              setSearchName={setSearchName}
            />
            <FilteredPokemons
              pokemons={pokemons}
              setPokemons={setPokemons}
              filteredPokemons={filteredPokemons}
              setFilteredPokemons={setFilteredPokemons}
              pageNumber={pageNumber}
              typeSelectedArray={typeSelectedArray}
              searchName={searchName}
            />
            <Pagination
              filteredPokemons={filteredPokemons}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
                 <Routes>
              {/* <Route path="/" element={< />} /> */}
              <Route
                path="/pokemon/:id"
                element={<PokemonDetails accessToken={accessToken} refreshToken={refreshToken} setAccessToken={setAccessToken} />}
              />
            </Routes>
 
          </>
        ) : (
          <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            user={user}
            setUser={setUser}
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            refreshToken={refreshToken}
            setRefreshToken={setRefreshToken}
            isRegistering={isRegistering}
            setIsRegistering={setIsRegistering}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        )}
      </Router>
    </>
  );
}

export default App;