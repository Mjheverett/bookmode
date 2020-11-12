module.exports = app => {
    const recommendations = require("../controllers/recommendation.controller.js");
        var router = require("express").Router();
    // Create a new recommendation
    router.post("/add", recommendations.create);
    // Get recommendations by sent 
    router.get("/sent/:userId", recommendations.findAllSent);
    // Get recommendationsby received
    router.get("/received/:userId", recommendations.findAllReceived);
    app.use('/recommendations', router);
    };
