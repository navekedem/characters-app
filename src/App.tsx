import React from 'react';
import { Header } from './components/Header/header';
import { Main } from './components/main/main';
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
        <Header></Header>
        <Main></Main>
      </div>
    </Provider>
  );
}

export default App;
