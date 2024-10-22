import {Route, Switch } from 'react-router-dom';
import Home from './home';
import Register from './Registration/register';
import Login from './Login/login';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/login' component={Login}/>
    </Switch>
  );
}

export default App;
