import React from 'react';

import Planet from '../../components/Planet/Planet';
import classes from './Planets.module.css';

class Planets extends React.Component {

    // Using the planet card ID I pass all fetched data about selected planet throught passing query params to the FullDescr(Planet Full Decription) component.
    // Another way is passing only ID to the FullDescr component and then fetch data of selected planet.
    // I think my implementation is better because it helps to avoid fetching data again and again.

    planetSelectedHandler = (id) => {
        const queryParams = [];
        const planet = this.props.planets[id];
        for(let i in planet) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(planet[i]))
        }
        
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/planets/' + id,
            search: '?' + queryString
        });
      }

    render() {        
        let planets;
        if (this.props.planets) {
            planets = this.props.planets.map((planet, id) => (
                <Planet
                    key={planet.name}
                    name={planet.name}
                    climate={planet.climate}
                    population={planet.population}
                    clicked={() => this.planetSelectedHandler(id)} />))
        } 
        return (
            <React.Fragment>
                <h1 className={classes.Header}>Planets</h1>
                <div className={classes.Planets}>
                    {planets}
                </div>
            </React.Fragment>

        );
    }
}
export default Planets;