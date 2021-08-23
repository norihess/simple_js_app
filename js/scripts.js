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

function add(){
  return pokemonRepository.add(item);
}
//create this inside repository so people can access it from outside
function getAll() {
return pokemonList;
}
return {
getAll: getAll,
add: add,
};
    
document.querySelector(ul);
})();


pokemonRepository.getAll().forEach(function(pokemon){
    // document.write('<p>' + pokemonList.name + ' (height:' + pokemonList.height +')</p>');
    console.log(pokemon)
    });

////for loop with array
////Ninetales and Houndoom
//for (let i = 0; i < pokemonList.length; i++){
//    if (pokemonList[i].height < 2 && pokemonList[i].height > 1){
//        document.write('<p>' + pokemonList[i].name + ' (height:' + pokemonList[i].height +')</p>')
//    }
//    //Zekrom and Reshiram
//     else if(pokemonList[i].height < 4 && pokemonList[i].height > 2){
//        document.write('<p>' + pokemonList[i].name + ' (height:' + pokemonList[i].height +'-Wow that is big!</p>')
//     }
//}

//let pokemonList = function(){
//    let pokemonList = [];
//    
//    function add(pokemon) {
//        pokemonList.push(pokemon);
//    }
//    
//    function getAll() {
//        return pokemonList;
//    }
//    
//    return{
//        add: add,
//        getAll: getAll
//    };
//})();

//pokemonList.forEach (function(pokemonList){
//  document.write('<p>' + pokemonList.name + ' (height:' + pokemonList.height +')</p>');});
