module.exports = app => {
    const recs = require("../controllers/recommendation.controller.js");
        var router = require("express").Router();
    // Create a new recommendation
    router.post("/add/:userId/:id", recs.create);
    // Get recs by sent 
    router.post("/sent/:userId", recs.findAllSent);
    // Get recs by received
    router.get("/received/:userId", recs.findAllReceived);
    app.use('/recommendations', router);
    };
