import axios from 'axios';

export const getPlanets = (url, planets, resolve, reject) => {
    axios.get(url)
    .then(response => {
        const retrivedPlanets = planets.concat(response.data.results)
        if (response.data.next !== null) {
            getPlanets(response.data.next, retrivedPlanets, resolve, reject)
        } else {
            resolve(retrivedPlanets)
        }
    })
    .catch(error => {
        console.log(error)
        reject('Something went wrong...');
    })
}

