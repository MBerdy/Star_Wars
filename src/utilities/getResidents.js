import axios from 'axios';

export const getResidents = (urls, residents, resolve, reject, i) => {
    if (!urls[i]) {
        resolve(null)
    } else {
        axios.get(urls[i])
            .then(response => {
                const retrivedResidents = residents.concat(response.data.name);
                ++i;
                if (i < urls.length) {
                    getResidents(urls, retrivedResidents, resolve, reject, i)
                } else {
                    resolve(retrivedResidents)
                }
            })
            .catch(error => {
                console.log(error)
                reject('Something went wrong...');
            })
    }
}

