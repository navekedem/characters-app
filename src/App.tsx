import React from 'react';
import { Header } from './components/Header/header';
import { Main } from './components/main/main';
import { Episodes } from './components/episodes/episodes';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import viewReducer from './reducers';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

const store = createStore(viewReducer);

function App() {
  AOS.init();
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header></Header>
          <main>
            <Routes>
              <Route path="/episodes" element={<Episodes />}>
              </Route>
              <Route path="/" element={<Main />}>
              </Route>
            </Routes >
          </main>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
