const express = require('express');
const router = express.Router();
const request = require('request-promise')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/hw2')
const db = mongoose.connection
db.once('open', function () {
    console.log('Connection successful.')
})
const Schema = mongoose.Schema
const stringSchema = new Schema({
    string: String,
    length: Number
})
const stringModel = mongoose.model('Strings', stringSchema)

router.get('/', function(req, res, next){
    let arr = Person.find({}, '-_id -__v', function(err, result){
        res.json(result)
    })
})

/* GET home page. */
router.get('/:str', function(req, res, next) {
    let input = req.params.str
    const inputString = new stringModel({string: input}, function (err, result){
        if (result.length == 0){
            let mymodel = new stringModel({string: input, length: input.length})
            mymodel.save(function(err){
                if (err) console.log('Error saving')

                console.log('Saved')
                res.json({string: input, length: input.length})
            })
        }
        else{
            console.log('Exists in DB')
            res.json({string: input, length: input.length})
        }
    })
});


router.post('/', function(req, res, next){
    let input = req.body.string
    if (req.body.string == undefined){
        let errMsg = {
            message: 'Please provide a string'
        }
        res.json(errMsg)
    }
    else{
        const inputString = stringModel.find({string: input}, function (err, result){
            if (result.length == 0) {
                let mymodel = new Person({string: input, length: input.length})
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

router.delete('/:str', function(req, res, next){
    const input = req.body.string
    const inputString = stringModel.find({string: input}, function (err, result){
        if (result.length == 0){
            let errMsg = {
                message: 'String not found in DB'
            }
            res.json(errMsg)
        }
        else{
            stringModel.deleteOne({string: input}, function (err){
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
