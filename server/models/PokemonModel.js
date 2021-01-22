const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  type: { type: [String], required: true },
  bio: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  weaknesses: { type: [String], required: true },
  next_evolution: { type: Object },
  prev_evolution: { type: Object },
});

const PokemonModel = mongoose.model("Pokemon", pokemonSchema);
module.exports = PokemonModel;
