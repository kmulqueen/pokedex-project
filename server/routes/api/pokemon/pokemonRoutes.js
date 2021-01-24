const router = require("express").Router();
const pokemonController = require("../../../controllers/pokemonController");

router
  .route("/")
  .get(pokemonController.getAllPokemon)
  .post(pokemonController.createEntry)
  .delete(pokemonController.deleteAll);

module.exports = router;
