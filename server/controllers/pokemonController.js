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
        image,
        type,
        category,
        region,
        abilities,
        bio,
        height,
        weight,
        weaknesses,
        evolutions,
      } = req.body;
      const newPokemon = new PokemonModel({
        name,
        number,
        image,
        region,
        category,
        type,
        bio,
        abilities,
        height,
        weight,
        weaknesses,
        evolutions: evolutions ? evolutions : null,
      });

      const pokemonEntry = await newPokemon.save();
      res.json(pokemonEntry);
    } catch (error) {
      res.status(422).json(error);
    }
  },
  deleteAll: async function (req, res) {
    await PokemonModel.deleteMany();
    res.json({ msg: "All Pokemon deleted..." });
  },
};
