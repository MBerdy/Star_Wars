import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Planets from './containers/Planets/Planets';
import FullDescr from './containers/FullDescr/FullDescr';
import './App.css';
import Spinner from './components/UI/Spinner/Spinner';
import ErrorMessage from './components/UI/ErrorMessage/ErrorMessage';
import * as GetPlanets from './utilities/getPlanets';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: null,
      isLoading: true,
      error: false
    }
  }

  //This is a get request in the parent component that prevents fetching data after every re-rendering Planets component when user comes back to.
  //To avoid accumulation of code I took out the logic of fetching data in the getPlanets.js file.

  componentDidMount() {
    new Promise((resolve, reject) => {
      GetPlanets.getPlanets('https://swapi.dev/api/planets/', [], resolve, reject)
    })
      .then(response => {
        this.setState({ planets: response, isLoading: false })
      })
      .catch(error => {
        this.setState({ error: true })
      })

  }
  render() {
    let planets;
    if (this.state.planets) {
      planets = this.state.planets
    }

    let planetsList;
    if (this.state.isLoading) {
      planetsList = <Spinner />
    } else {
      planetsList = (<BrowserRouter>
        <Switch>
          <Route path='/planets' exact render={(props) => <Planets {...props} planets={planets} />} />
          <Route path='/planets/:id' exact component={FullDescr} />
          <Redirect from='/' to='/planets' />
        </Switch>
      </BrowserRouter>)
    }
    return (
      <div className='App'>
        {this.state.error ? <ErrorMessage /> : planetsList }
      </div>
    );
  }
}

export default App;
