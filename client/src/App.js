import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import Detail from './components/Detail';
import GameCreate from './components/GameCreate';
import axios from 'axios';
axios.defaults.baseURL = 'https://henry-video-games-production.up.railway.app/'

function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route path={'/home'}>
      <Home/>
    </Route>
    <Route path={'/create'}>
      <GameCreate/>
    </Route>
    <Route path={'/videogame/:id'} component={Detail}/>
    <Route path={'/'}>
      <LandingPage/>
    </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
