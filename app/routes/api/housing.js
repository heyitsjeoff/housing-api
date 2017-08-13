var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Housing = require('../../models/housing');

router.get('/', function(req, res){

    if(req.query._id){

        var id;

        // cast to mongoose id
        try{

            id = mongoose.Types.ObjectId(req.query._id);

        } catch (e){

            res.status(400);
            res.json({
                'success': false,
                'message': 'id was not valid',
                'exception': e.message
            });
            return;

        }

        Housing.findById(id, function(err, house){

            if(err){

                res.status(500);
                res.json({
                    'message': 'there was an exception',
                    'exception': err.message
                });
                return;

            }

            if(!house){
                res.status(400);
                res.json({
                    'success': false,
                    'message': 'no house exists with that id'
                });
            } else {
                res.json(house);
            }


        });

    } else {

        Housing.find({},  function(err, houses){

            if(err){

                res.status(500);
                res.json({
                    'success': false,
                    'message': 'well shit',
                    'exception': err.message
                });
                return;

            }

            if(!houses){
                res.status(204);
                res.json({
                    'message': 'no houses'
                });
            } else {
                res.json(houses);
            }

        });

    }

});



router.post('/', function(req, res){

    var url = req.body.url;

    if(!url){

        res.status(400);
        res.json({
            'message': 'Missing parameter, `url` is required'
        });
        return;

    }

    var house = new Housing(req.body);


    house.save(function(err){

        if(err){

            res.status(500);
            res.json({
                success: false,
                message: 'well shit',
                error: err.message
            });
            return;

        }

        res.json({
            id: house._id
        });


    });

});

router.put('/', function(req, res){

    var url = req.body.url;
    var id = req.body._id;

    if(!url || !id){

        res.status(400);
        res.json({
            'message': 'Missing parameter, `url` and `id` are required'
        });
        return;

    }

    // cast to mongoose id
    try{

        id = mongoose.Types.ObjectId(id);

    } catch (e){

        res.status(400);
        res.json({
            'success': false,
            'message': 'id was not valid',
            'exception': e.message
        });
        return;

    }

    var updatedHouse = new Housing(req.body);

    delete updatedHouse._id;

    Housing.findOneAndUpdate({_id: id}, req.body, {overwrite: true, returnNewDocument: true, new: true}, function(err, updatedHouse) {

        if(err){

            res.status(400);
            res.json({
                'exception': err
            });
            return;

        } else {

            res.status(200);

            console.log(updatedHouse);

            res.json(updatedHouse);

        }

    });

});

router.delete('/', function(req, res){

    var id = req.body.id;

    if(!id){

        res.status(400);
        res.json({
            'message': 'Missing parameter, `id` is required'
        });
        return;

    }

    // cast to mongoose id
    try{

        id = mongoose.Types.ObjectId(id);

    } catch (e){

        res.status(400);
        res.json({
            'success': false,
            'message': 'id was not valid',
            'exception': e.message
        });
        return;

    }

    Housing.findById(id, function(err, house){

        if(err){

            res.status(400);
            res.json({
                'message': err.message
            });
            return;

        }

        if(!house){
            res.status(400);
            res.json({
                'message': 'no house exists with that id'
            });
            return;
        }

        Housing.remove(house, function(err){

            if(err){

                res.status(500);
                res.json({
                    message: 'There was an error while deleting house',
                    error: err.message
                });
                return;

            }

            res.status(200);
            res.json({
                success: true
            })

        });

    });

});

module.exports = router;
