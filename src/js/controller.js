
import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import bookMarkView from './views/bookMarkView.js'
import paginationView from './views/paginationView.js'
import addRecipeView from './views/addRecipeView.js'

// import icons from '../img/icons.svg' // parcel 1
// import icons from 'url:../img/icons.svg' // parcel 2
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime';

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

// if (module.hot) {
//   module.hot.accept()
// }
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1)
    if (!id) return

    recipeView.renderSpinner()
    // 1. Loading recipe
    await model.loadRecipe(id)
    const { recipe } = model.state

    // 2. Rendering recipe
    recipeView.render(model.state.recipe)

    bookMarkView.render(model.state.bookMarks)


  }
  catch (err) {
    recipeView.renderError()
  }
}


const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner()
    // 1. Get search query
    const query = searchView.getQuery()
    if (!query) return

    // 2. Load search results
    await model.loadSearchResults(query)

    // 3. render results
    // console.log(model.state.search.results)
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage(model.state.search.page))

    // 4. Render initial pagination buttons
    paginationView.render(model.state.search)

  } catch (err) {
    resultsView.renderError()
    // console.log(err)
  }
}
// ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));

// controlSearchResults()

const controlPagination = function (goToPage) {
  // 1. Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage))

  // 2. Render NEW pagination buttons
  paginationView.render(model.state.search)

}

const controlServings = function (newServings) {
  // Update the recpe serving (in state)
  model.updateServings(newServings)

  // Update the recipe view
  recipeView.render(model.state.recipe)
}


const controlAddBookmark = function () {

  // 1. Add/ delete bookmart
  if (!model.state.recipe.bookMarks) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)

  // 2. Update recipe view
  recipeView.render(model.state.recipe)
  // 3. Render bookmarks 
  console.log(model.state.bookMarks)

  if (model.state.bookMarks.length === 0) bookMarkView.renderError()
  else bookMarkView.render(model.state.bookMarks)


}

const controlBookmark = function () {
  bookMarkView.render(model.state.bookMarks)
}

const controlAddRecipe = function (newRecipe) {
  console.log(newRecipe)

  // Upload the new recipe data
}

const init = function () {
  bookMarkView.addHandlerRender(controlBookmark)
  recipeView.addHandleRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandleSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)

}

init()
