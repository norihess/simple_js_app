//IIFE
let pokemonRepository = (function(){
//list of pokemon
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';    

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

//fetch function
function loadList(){
    //fetching url of api creating a pomise reuslting a response
    return fetch(apiUrl).then(function(response){
        return response.json();
        //everything is being converted to json
    }).then(function(json){
        //josn presents all the date from api
        //json(main object).results(keys).forEach(items)
        json.results.forEach(function(item){
            let pokemon = {
                //2 keys:values
                name: item.name,
                detailsUrl: item.url
            };
            //add looks back to add function up top
            add(pokemon);
        });
    }).catch(function(e){
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
      console.log(item);
    });
  }

    return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    ShowDetails: showDetails
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

