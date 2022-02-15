import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import DogCreate from './Components/DogCreate';
import Detail from './Components/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/home' exact component={Home}/>
          <Route path='/dog' component={DogCreate}/>
          <Route path='/home/:id' exact component={Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
