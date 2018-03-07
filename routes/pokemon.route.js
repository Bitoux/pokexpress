module.exports = function(app){
    let pokemons = require('../controllers/pokemon.controller.js');

    // Create a new pokemon
    app.post('/pokemons', pokemons.create);

    // Retrieve all pokemon
    app.get('/pokemons', pokemons.findAll);

    // Retrieve a single pokemon
    app.get('/pokemons/:pokemonId', pokemons.findOne);

    // Update a pokemon
    app.put('/pokemons/:pokemonId', pokemons.update);

    // Delete a pokemon
    app.delete('/pokemons/:pokemonId');
}