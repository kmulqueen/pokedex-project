const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  image: { type: String, required: true },
  region: { type: String },
  type: { type: [String], required: true },
  category: { type: String },
  bio: { type: String, required: true },
  abilities: { type: [Object] },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  weaknesses: { type: [String], required: true },
  evolutions: { type: [Object] },
});

const PokemonModel = mongoose.model("Pokemon", pokemonSchema);
module.exports = PokemonModel;
