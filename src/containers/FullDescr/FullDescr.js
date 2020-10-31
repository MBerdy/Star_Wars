import React from 'react';

import classes from './FullDescr.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import * as GetResidents from './../../utilities/getResidents';

class FullDescr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedPlanet: {},
            residents: [],
            isLoading: true,
            error: false
        }
    }

    //Getting all information of selected planet throught the query params by parsing them.
    //After that I fetch data about residents.
    //To avoid accumulation of code I took out the logic of fetching data in the getResidents.js file.

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const planets = {};
        for (let param of query.entries()) {
            planets[param[0]] = param[1];
        }

        const residentsURL = planets.residents.split(',');

        new Promise((resolve, reject) => {
            GetResidents.getResidents(residentsURL, [], resolve, reject, 0)
        })
            .then(response => {
                this.setState({ residents: response, loadedPlanet: planets, isLoading: false })
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    goBackHandler = () => {
        this.props.history.goBack();
    }

    render() {
        let residents;
        if (!this.state.isLoading && this.state.residents) {
            residents = (<React.Fragment>
                <h3 className={classes.Title}>Residents: </h3>
                {this.state.residents.map(r => (
                    <div className={classes.Resident} key={r}>{r}</div>
                ))}
            </React.Fragment>);
        } else if (!this.state.residents) {
            residents = <h3 className={classes.Title}>There is no resident</h3>
        }

        let fullDescription;
        if (this.state.isLoading) {
            fullDescription = <Spinner />
        } else {
            fullDescription = (<React.Fragment>
                <h3 className={classes.Title}>Name: {this.state.loadedPlanet.name}</h3>
                <ul className={classes.DescrList}>
                    <li><span>Rotation Period:</span> {this.state.loadedPlanet.rotation_period} </li>
                    <li><span>Diameter:</span> {this.state.loadedPlanet.diameter} </li>
                    <li><span>Climate:</span> {this.state.loadedPlanet.climate} </li>
                    <li><span>Gravity:</span> {this.state.loadedPlanet.gravity} </li>
                    <li><span>Population:</span> {this.state.loadedPlanet.population} </li>
                </ul>
                {residents}
                <button onClick={this.goBackHandler} className={classes.Button}>Go back to Planets</button>
            </React.Fragment>)
        }

        return (
            <div className={classes.FullDescr}>
                {this.state.error ? <ErrorMessage />  : fullDescription}

            </div>
        )
    }
}

export default FullDescr;