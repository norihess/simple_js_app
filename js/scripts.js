//IIFE
let pokemonRepository = (function(){
//list of pokemon
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; 

let modalContent = document.querySelector(".modal-content");
      
function add(pokemon){
   if (
      typeof pokemon === "object" &&
      "name" in pokemon 
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

//create this inside repository so people can access it from outside
function getAll() {
    return pokemonList;
}
    
function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-group');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button');
    listpokemon.append(button);
    pokemonList.append(listpokemon);
     button.setAttribute("data-target", "#Modal");
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

let nameElement = $("<h1>" + pokemon.name + "</h1>");

let imageElementFront = $('<img class="modal-img" style="width:50%">');
imageElementFront.attr("src", pokemon.imageUrlFront);
let imageElementBack = $('<img class="modal-img" style="width:50%">');
imageElementBack.attr("src", pokemon.imageUrlBack);

    let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");

    let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
//
//    let abilitiesElement = $(
//      "<p>" + "abilities : " +
//      pokemon.abilities.map((pokemon) => pokemon.ability) + "</p>"
//    );
    let typesElement = $(
      "<p>" + "types : " + pokemon.types + "</p>");
    
modalTitle.append(nameElement);
modalBody.append(imageElementFront);
modalBody.append(imageElementBack);
modalBody.append(heightElement);
modalBody.append(weightElement);
//modalBody.append(abilitiesElement);
modalBody.append(typesElement);
  }

    
//let closeButtonElement = document.createElement('button');
//    closeButtonElement.classList.add('modal-close');
//    closeButtonElement.innerText = 'Close';
//    closeButtonElement.addEventListener('click', hideModal);
//
//////details of pokemon
//    let pokemonName = document.createElement('h1');
//        pokemonName.classList.add('pokemon-name');
//        pokemonName.innerText = pokemon.name;
//
//    let pokemonSprite = document.createElement('img');
//        pokemonSprite.classList.add('pokemon-sprite');
//        pokemonSprite.src = pokemon.imageUrl;
//    
//    let pokeHeight = document.createElement('p');
//        pokeHeight.classList.add('pokemon-height');
//        pokeHeight.innerText = pokemon.height;
//    
//    let contentElement = document.createElement('p');
//        contentElement.classList.add('pokemon-types');
//        contentElement.innerText = pokemon.types;
//
////    //creating boxes 
//    modal.appendChild(closeButtonElement);
//    modal.appendChild(pokemonName); //changed
//    modal.appendChild(pokemonSprite); modal.appendChild(pokeHeight);
//    modal.appendChild(contentElement);
//    modalContainer.appendChild(modal);
//
//    modalContainer.classList.add('is-visible');
//  }
//    
//
//  function hideModal() {
//    modalContainer.classList.remove('is-visible');
//  }
//
//  window.addEventListener('keydown', (e) => {
//    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
//      hideModal();  
//    }
//  });
//  modalContainer.addEventListener('click', (e) => {
//    // Since this is also triggered when clicking INSIDE the modal
//    // We only want to close if the user clicks directly on the overlay
//    let target = e.target;
//    if (target === modalContainer) {
//      hideModal();
//    }
//  });
//
//  document.querySelector('#modal-container').addEventListener('click', () => {
//    showModal();
//  });
//    
function showDetails(item) {
    loadDetails(item).then(function () {
//        console.log(pokemon);
        showModal(item);
  });
}
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

