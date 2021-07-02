// console.log('PUG');

fetch(`https://restcountries.eu/rest/v2/name/ukraine`)
    .then(response => {
    return response.json()
    })
    .then(el => {
    console.log(el.map().join());
    })