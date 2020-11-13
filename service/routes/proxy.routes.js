module.exports = app => {
    var request = require('request');
    app.get('/proxy/:url?', function(req, res) {
        console.log('params: ',req.query)
        const { url } = req.query
        request(url).pipe(res);
        });
}