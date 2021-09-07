//IIFE
let pokemonRepository = (function(){
//list of pokemon
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let searchInput = $('#search-bar');
//let modalContent = $('.modal-content');

function add(pokemon){
   if (
      typeof pokemon === 'object' &&
      'name' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

//create this inside repository so people can access it from outside
function getAll() {
    return pokemonList;
}

function addListItem(pokemon){
    let pokemonList = $('.pokemon-group');
    let listpokemon = document.createElement('li');
    let button =
    document.createElement('button');
    button.innerText = pokemon.name;

    $('button').addClass('button');
    $('button').attr('data-target', '#pokemonModal');
    $('button').attr('data-toggle', 'modal');
    $('button').attr('style', 'color: #000000');

//    button.setAttribute("data-target", "#pokemonModal");
//    button.setAttribute("data-toggle", "modal");
//    button.setAttribute("style", "color: #000000");
    listpokemon.append(button);
    pokemonList.append(listpokemon);

//    $('button').on('click', function(){
//        showDetails(pokemon);
//    });
    button.addEventListener('click', function() {
        showDetails(pokemon);
    });
}
function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

 function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }) .then(function(details) {
        // adding the details to the items
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
//        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
      }).catch(function (e) {
      console.error(e);
    });
  }
//modal
function showModal(pokemon) {
//    modalOpen.innerHTML = '';

    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
//    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();
//    let modal = document.createElement('div');
//    modal.classList.add('modal');

let nameElement = $('<h1>' + pokemon.name + '</h1>');

let imageElementFront = $('<img class="modal-img" style="width:50%">');
imageElementFront.attr('src', pokemon.imageUrlFront);
let imageElementBack = $('<img class="modal-img" style="width:50%">');
imageElementBack.attr("src", pokemon.imageUrlBack);

    let heightElement = $('<p>' + 'height : ' + pokemon.height + '</p>');

    let weightElement = $('<p>' + 'weight : ' + pokemon.weight + '</p>');

    let typesElement = $(
      '<p>' + 'types : ' + pokemon.types + '</p>');

modalTitle.append(nameElement);
modalBody.append(imageElementFront);
modalBody.append(imageElementBack);
modalBody.append(heightElement);
modalBody.append(weightElement);
//modalBody.append(abilitiesElement);
modalBody.append(typesElement);
  }

function showDetails(item) {
    loadDetails(item).then(function () {
//        console.log(pokemon);
        showModal(item);
  });
}
//search bar
     searchInput.addEventListener("input", function() {
       let listPokemon = $("li");
       let value = searchInput.value.toUpperCase();

       pokemonRepository.forEach(function(pokemon) {
         if (pokemon.innerText.toUpperCase().indexOf(value) < 0) {
           pokemon.style.display = "none";
         }
       });

    return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
//    hideModal: hideModal,
//    showDetails: showDetails,
    showModal: showModal
  };
})();


pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
