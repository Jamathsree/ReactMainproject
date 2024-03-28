import './App.css';
import Comedy from './Components/Comedy';
import Latest from './Components/Latest';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navigator from './Components/Navigator';
import Popular from './Components/Popular';
import { createContext, useState } from 'react';

export const baseUrl = "https://api.themoviedb.org/3/";
export const imageUrl = "https://image.tmdb.org/t/p/original";
export const API_KEY = "9948beaa1978b07ef733bcbe5e8d2849";

export const ComedyMovies = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`;
export const LatestMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`;
export const PopularMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`;

export const DataContext = createContext();

function App() {
  const [data, setData] = useState('');
  

  return (
    <div className="App">

      <DataContext.Provider
        value={{
          data,
          setData,
        }}
      >
        <BrowserRouter>
          <Navigator />
          <Routes>
            <Route path="/" element={<Popular />} />
            <Route path="/latest" element={<Latest />} />
            <Route path="/comedy" element={<Comedy />} />
          </Routes>
        </BrowserRouter>
      </DataContext.Provider>
    </div>
  );
}

export default App;

