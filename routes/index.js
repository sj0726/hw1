const express = require('express');
const router = express.Router();
const request = require('request-promise')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/HW2')
const db = mongoose.connection
db.once('open', function () {
    console.log('Connection successful.')
})
const Schema = mongoose.Schema
const stringa = new Schema({
    string: String,
    length: Number
})
const Model = mongoose.model('Person', stringa)

router.get('/', function(req, res, next){
    let arr = Model.find({}, '-_id -__v', function(err, result){
        res.json(result)
    })
})

/* GET home page. */
router.get('/:str', function(req, res, next) {
    let mine = req.params.str
    const jsonthing = Model.find({string: mine}, function (err, result) {
        if (result.length == 0){
            let mymodel = new Model({string: mine, length: mine.length})
            mymodel.save(function(err){
                if (err) console.log('Error saving')

                console.log('Saved')
                res.json({string: mine, length: mine.length})
            })
        }
        else {
            console.log('Exists in DB')
            res.json({string: mine, length: mine.length})
        }
    });
})


router.post('/', function(req, res, next){
    let input = req.body.string
    if (req.body.string == undefined){
        let errMsg = {
            message: 'Please provide a string'
        }
        res.json(errMsg)
    }
    else{
        const inputString = Model.find({string: input}, function (err, result){
            if (result.length == 0) {
                let mymodel = new Model({string: input, length: input.length})
                mymodel.save(function (err){
                    if (err) console.log('Error Saving')

                    console.log('Saved')
                    res.json({string: input, length: input.length})
                })
            }
            else{
                console.log('Exists in DB')
                res.json({string: input, length: input.length})
            }
        });
    }
})

router.delete('/', function(req, res, next){
    const input = req.body.string
    const inputString = Model.find({string: input}, function (err, result){
        if (result.length == 0){
            let errMsg = {
                message: 'String not found in DB'
            }
            res.json(errMsg)
        }
        else{
            Model.deleteOne({string: input}, function (err){
                if (err){
                    console.log('Error Deleting')
                }
                else{
                    let errMsg = {
                        message: 'Successfully Deleted'
                    }
                    res.json(errMsg)
                }
            })
        }
    })
})

module.exports = router;

