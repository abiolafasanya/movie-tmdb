import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Movies from './pages/Movies/Movies';
import Movie from './pages/Movie/Movie';
import Contact from './pages/Contact';
import Tvs from './pages/Tvs/Tvs';
import Actors from './pages/Actors/Actors';
import Actor from './pages/Actor/Actor';
import TvDetails from './pages/Tv/TvDetails';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Movies />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/actor/:id" hasErrorBoundary element={<Actor />} />
        <Route path="/tv/:id" element={<TvDetails />} />
        <Route path="/tv-shows" element={<Tvs />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
