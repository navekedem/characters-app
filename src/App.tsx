import React from 'react';
import { Header } from './components/Header/header';
import { Main } from './components/main/main';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import viewReducer from './reducers'
import './App.css';

const store = createStore(viewReducer);

function App() {
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
