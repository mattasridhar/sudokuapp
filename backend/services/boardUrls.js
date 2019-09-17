const express = require('express');
const router = express.Router();

router.get('/test', (req, res, next) => {
    console.log("Testing Board API")
    res.send("Board Service Test Successfull");
});

router.get('/board', (req, res, next) => {
    console.log("Testing Board API")
    res.send("Board Service Test Successfull");
});

module.exports = router;