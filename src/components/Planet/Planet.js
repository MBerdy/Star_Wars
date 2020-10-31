import React from 'react';

import classes from './Planet.module.css'
const Planet = (props) => {
    return(
        <div onClick={props.clicked} className={classes.Planet}>
            <h3>Name: <b>{props.name}</b></h3>
            <p>Climate: <b>{props.climate}</b></p>
            <p>Population: <b>{props.population}</b></p>
        </div>
    )
}

export default Planet;