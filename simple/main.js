const recipes = await fetch("./sample.json").then((r) => r.json())
const recipesContainer = document.querySelector("#recipes")
console.log(recipes)