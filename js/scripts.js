//IIFE
let pokemonRepository = (function(){
//list of pokemon
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; 
let modalContainer = document.querySelector('#modal-container');

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
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    addEventListener('click', function() {
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
function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function(response){
        return response.json();
    }).then(function(details){
        //adding details to item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    }).catch(function(e){
        console.error(e);
    });
}
function showDetails(item) {
    loadDetails(item).then(function () {
        showModal(item);
  });
}
 
//modal
function showModal() {
    //populating name
    let pokemonName = modalContainer.querySelector('.pokemon-name');
    pokemonName.innerText = pokemonList.name;

    //populating types
    let pokemonTypes = modalContainer.querySelector('pokemon.type');
    //remove previous types if any
    pokemonTypes.innerHTML = "";
    pokemon.types.forEach((type) => {
      console.log(type.type.name);
      let listItem = document.createElement("li");
      listItem.innerText = type.type.name;
      pokemonTypes.appendChild(listItem);
    });

    //populating img
    let pokemonImage = modalContainer.querySelector(".pokemon-img");
    pokemonImage.setAttribute("src", pokemon.imageUrl);
    pokemonImage.setAttribute(
      "alt",
      `Official artwork representing ${pokemon.name}`
    );

    //populating height and weight
    let pokemonHeight = modalContainer.querySelector(".pokemon-height");
    let pokemonWeight = modalContainer.querySelector(".pokemon-weight");
    pokemonHeight.innerText = pokemon.height;
    pokemonWeight.innerText = pokemon.weight;

    //populating abilities
    let abilityList = document.querySelector(".ability-list");
    abilityList.innerHTML = "";

    pokemon.abilities.forEach((ability) => {
      console.log(ability.ability.name);
      let abilityItem = document.createElement("li");
      abilityItem.innerText = ability.ability.name;
      abilityList.appendChild(abilityItem);
    });

    if (modalContainer.classList.contains("is-not-visible")) {
    modalContainer.classList.remove("is-not-visible");
    }
    modalContainer.classList.add("is-visible");
  }

  function hideModal(item) {
    if (modalContainer.classList.contains("is-visible")) {
    modalContainer.classList.remove("is-visible");
    modalContainer.classList.add("is-not-visible");
    }
  }

  //event listeners

  //addEvent takes care of binding the click event with the event handler
  function showOnClick(button, pokemon) {
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  let closeBtn = document.querySelector('#modal-close');
  addEventListener("click", hideModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
    return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  };
    
    

})();
    



//pokemonRepository.getAll().forEach(function(pokemon){
//    // document.write('<p>' + pokemonList.name + ' (height:' + pokemonList.height +')</p>');
//    console.log(pokemon)
//    });

//console.log(pokemonRepository.getAll());

//console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

