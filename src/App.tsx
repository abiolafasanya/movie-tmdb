import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Movies from './pages/Movies/Movies';
import Movie from './pages/Movie/Movie';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
