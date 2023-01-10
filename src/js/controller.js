
import * as model from './model.js'
import recipeView from './views/recipeView.js'

// import icons from '../img/icons.svg' // parcel 1
// import icons from 'url:../img/icons.svg' // parcel 2
import 'core-js/stable'
import 'regenerator-runtime/runtime'

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1)
    if (!id) return

    recipeView.renderSpinner()
    // 1. Loading recipe
    await model.loadRecipe(id)
    const { recipe } = model.state
    console.log(recipe)
    // 2. Rendering recipe
    recipeView.render(model.state.recipe)

  }
  catch (err) {
    // alert(err.message)
    console.log(err.message)
  }
}

// ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));

window.addEventListener('hashchange', controlRecipes)
window.addEventListener('load', controlRecipes)
