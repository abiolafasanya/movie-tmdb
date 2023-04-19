import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Movies from './pages/Movies/Movies';
import Movie from './pages/Movie/Movie';
import Contact from './pages/Contact';
import Tv from './pages/Tv/Tv';
import Actors from './pages/Actors/Actors';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Movies />} />
        <Route path="/tv-shows" element={<Tv />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
