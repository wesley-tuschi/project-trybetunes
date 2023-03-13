import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/search" exact component={ Search } />
        <Route path="/album/:id" exact component={ Album } />
        <Route path="/favorites" exact component={ Favorites } />
        <Route path="/profile" exact component={ Profile } />
        <Route path="/profile/edit" exact component={ ProfileEdit } />
        <Route path="*" exact component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
