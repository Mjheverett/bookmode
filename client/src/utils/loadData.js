import axios from 'axios';

export const loadData = async (input) => {
    let results = [];
    const key = process.env.REACT_APP_GOODREADS_KEY;
    const parseString = require('xml2js').parseString;
    const url = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=${key}&q=${input}&page=1&search=all`;
    axios.get(url)
        .then(res => {
            const data = res.data;
            parseString(data, function (err, result) {
                results = result.GoodreadsResponse['search'][0]['results'][0]['work'];
                console.log("ready to return", results);
            })
        })
}

// const key = process.env.REACT_APP_GOODREADS_KEY
//     const parseString = require('xml2js').parseString;
//     const url =
//     `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=${key}&q=${input}&page=1&search=all`
//     await fetch(url, {
//         headers: {"X-Requested-With" : "XMLHttpRequest"}
//     })
//         .then(response => response.text())
//         .then(data => {
//             return data
//         }).catch(err => console.error(err));