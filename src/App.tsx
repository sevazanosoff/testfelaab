import React, { Suspense } from 'react';

import PostList from './pages/PostList';
import PostFullPage from './pages/PostFullPage';

import Loading from './components/ui/Loading/Loading';
import './styles/App.scss'
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Suspense fallback={<Loading />}><PostList /></Suspense>} />
      <Route path='/post/:id' element={<Suspense fallback={<Loading />}><PostFullPage /></Suspense>} />
    </Routes>
  );
}

export default App;
