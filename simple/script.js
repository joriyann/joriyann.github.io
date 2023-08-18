const sample = await fetch("./sample.json").then((r) => r.json());
const recipes = document.querySelector("#recipes");
