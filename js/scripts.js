//IIFE
let pokemonRepository = (function(){
//list of pokemon
let pokemonList = [
{
    name: 'Ninetales',
    height: 1.1,
    types: ['fire']
    },
{
    name: 'Houndoom',
    height: 1.4,
    types: ['fire', 'dark']
    },
{
    name: 'Zekrom',
    height: 2.9,
    types: ['dragon', 'electric']
    },
{
    name: 'Reshiram',
    height: 3.2,
    types: ['dragon', 'fire']
    }
];

function add(pokemon){
   if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
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
function showDetails(pokemon){
    console.log(pokemon);
}

function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    
//    button.querySelector('button');
    button.addEventListener('click', function(pokemon){
        showDetails(pokemon);
    });
};
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };
//targets the class
document.querySelector('.show-more')
    //adds element to the div class
    .addEventListener('click', function(pokemon){
        document.querySelector('additional-information')
            //adds toggle element that is visible when clicked on
            .classList.toggle('is-visible');
});
})();
    



//pokemonRepository.getAll().forEach(function(pokemon){
//    // document.write('<p>' + pokemonList.name + ' (height:' + pokemonList.height +')</p>');
//    console.log(pokemon)
//    });
console.log(pokemonRepository.getAll());

pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
    
    pokemonRepository.addListItem(pokemon);
 
});
