import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Splash from './components/Splash';
import Home from './components/Home';
import Player from './components/Player';
import NotFound from './components/NotFound';
import 'materialize-css/dist/css/materialize.min.css';

function App() {
  const [userData, setuserData] = useState({
    "User": {},
    "AuthToken": {}
  })

  const updateUser = (data) =>{
    setuserData({
      "User": data.User,
      "AuthToken": data.AuthorizationToken
    })
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/BSG_task/">
          <Splash updateUser={updateUser}/>
        </Route>
        <Route exact path="/BSG_task/home">
          <Home userData={userData}/>
        </Route>
        <Route path="/BSG_task/player/:id">
          <Player userData={userData}/>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
