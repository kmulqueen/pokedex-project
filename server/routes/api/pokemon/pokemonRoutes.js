const router = require("express").Router();
const pokemonController = require("../../../controllers/pokemonController");

router.route("/id/:id").get(pokemonController.getPokemonById);
router.route("/number/:number").get(pokemonController.getPokemonByNumber);

router
  .route("/")
  .get(pokemonController.getAllPokemon)
  .post(pokemonController.createEntry);

module.exports = router;
