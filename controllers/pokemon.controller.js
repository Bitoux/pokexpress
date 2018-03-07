let Pokemon = require('../models/pokemon.model');


// Create a pokemon
exports.create = function(req, res){
    if(!req.body.content){
        return res.status(400).send({
            message: "Pokemon can not be empty"
        });
    }

    let pokemon = new Pokemon({
        name: req.body.name,
        number: req.body.number,
        description: req.body.description,
        picture: req.body.picture,
        types: req.body.types
    });

    pokemon.save(function(err, data){
        if(err){
            console.log(err);
            res.status(500).send({
                message: "Some error occured while creating the Pokemon"
            });
        }else{
            res.send(data);
        }
    });
    
};


// Find all pokemons
exports.findAll = function(req, res){
    Pokemon.find(function(err, pokemons){
        if(err){
            console.log(err);
            res.status(500).send({
                message: "Some error occured while retrieving data"
            });
        }else{
            res.send(pokemons);
        }
    });
};


// Find one Pokemon by id
exports.findOne = function(req, res){
    Pokemon.findById(req.params.pokemonId, function(err, pokemon){
        if(err){
            console.log(err);
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "Pokemon not found with id " + req.params.pokemonId
                });
            }else{
                return res.status(500).send({
                    message: "Error retrieving pokemon with id " + req.params.pokemonId
                });
            }
        }
        
        if(!pokemon){
            return res.status(404).send({
                message: "pokemon not found with id " + req.params.pokemonId
            });
        }

        res.send(pokemon);
    });
};

// Update a pokemon
exports.update = function(req, res){
    Pokemon.findById(req.params.pokemonId, function(err, pokemon){
        if(err){
            console.log(err);
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "Pokemon not found with id " + req.params.pokemonId
                });
            }

            return res.status(500).send({
                message: "Error finding pokemon with id " + req.params.pokemonId
            });
        }

        if(!pokemon){
            return res.status(404).send({
                message: "Pokemon not found with id " + req.params.pokemonId
            });
        }

        pokemon.name = req.body.name;
        pokemon.number = req.body.number;
        pokemon.description = req.body.description;
        pokemon.picture = req.body.description;
        pokemon.types = req.body.types;

        pokemon.save(function(err, data){
            if(err){
                res.status(500).send({
                    message: "Could not update pokemon with id " + req.params.pokemonId
                });
            }else{
                res.send(data);
            }
        });

    });
};

exports.delete = function(req, res){
    Pokemon.findByIdAndRemove(req.params.pokemonId, function(err, pokemon){
        if(err){
            console.log(err);
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "Pokemon not found with id " + req.params.pokemonId
                });
            }
            return res.status(500).send({
                message: "Could not delete pokemon id " + req.params.pokemonId
            });
        }

        if(!pokemon){
            return res.status(404).send({
                message: "Pokemon not found id " + req.params.pokemonId
            });
        }

        res.send({
            message: "Note deleted successfully!"
        });
    });
};