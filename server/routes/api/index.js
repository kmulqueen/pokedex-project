const router = require("express").Router();
const pokemonRoutes = require("./pokemon/pokemonRoutes");

router.use("/pokemon", pokemonRoutes);

module.exports = router;
