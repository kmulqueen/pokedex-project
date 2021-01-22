const PokemonModel = require("../models/PokemonModel");

module.exports = {
  getAllPokemon: async function (req, res) {
    const pokemon = await PokemonModel.find({});
    if (pokemon.length) {
      res.json(pokemon);
    } else {
      res.status(404).json({ msg: "No Pokemon found..." });
    }
  },
  createEntry: async function (req, res) {
    try {
      const {
        name,
        number,
        type,
        bio,
        height,
        weight,
        weaknesses,
        next_evolution,
        prev_evolution,
      } = req.body;
      const newPokemon = new PokemonModel({
        name,
        number,
        type,
        bio,
        height,
        weight,
        weaknesses,
        next_evolution: next_evolution ? next_evolution : null,
        prev_evolution: prev_evolution ? prev_evolution : null,
      });

      const pokemonEntry = await newPokemon.save();
      res.json(pokemonEntry);
    } catch (error) {
      res.status(422).json(error);
    }
  },
};
