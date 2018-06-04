const express = require('express');
const router = express.Router();
const request = require('request-promise')

/* GET home page. */
router.get('/:str', function(req, res, next) {
    const input = req.params.str
    const result = {
        string: input,
        length: input.length
    }
    res.send(result)
});

router.post('/', function(req, res, next){
    const input = req.body.string
    const result = {
        string: input,
        length: input.length
    }
    res.send(result)
})

module.exports = router;

router.use('/hw1', router);
