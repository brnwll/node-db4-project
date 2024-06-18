/*
#### Data Access

Write a data access file that exports an object with the following function:

  - `getRecipeById(recipe_id)`
  - Should resolve a representation of the recipe similar to the one shown in the **Data Model** above.
  - The function will pull information from several tables using Knex and then create a response object using loops, objects, array methods etc.
  - There are many ways to solve this, but from a performance standpoint the fewer trips to the database the better!
*/

const db = require("../data/db-config.js");

function getRecipeById(recipe_id) {
  return db("recipes as r")
    .leftJoin("steps as s", "r.recipe_id", "s.recipe_id")
    .leftJoin("recipe_ingredients as ri", "r.recipe_id", "ri.recipe_id")
    .leftJoin("ingredients as i", "ri.ingredient_id", "i.ingredient_id")
    .select(
      "r.recipe_id",
      "r.recipe_name",
      "s.step_number",
      "s.step_instructions",
      "i.ingredient_name",
      "ri.quantity"
    )
    .where("r.recipe_id", recipe_id)
    .orderBy("s.step_number");
}

module.exports = {
  getRecipeById,
};
