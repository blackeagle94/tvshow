import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Episodes from './components/pages/Episodes';
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import Seasons from './components/pages/Seasons';
import Shows from './components/pages/Shows';

function App() {
  return (
    <div className="App">
                    <Home />
      <Switch>
        <Route exact path="/tvshow"><Shows /></Route>
        <Route exact path="/tvshow/seasons"> <Seasons/> </Route>
        <Route path="/tvshow/seasons/episodes"> <Episodes /> </Route>
        <Route path="/tvshow/search"> <Search /> </Route>
      </Switch>
    </div>
  );
}

export default App;
