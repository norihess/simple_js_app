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
//for loop with array
//Ninetales and Houndoom
for (i = 0; i < pokemonList.length; i++){
    if (pokemonList[i].height < 2 && pokemonList[i].height > 1){
        document.write('<p>' + pokemonList[i].name + ' (height:' + pokemonList[i].height +')</p>')
    }
    //Zekrom and Reshiram
     else if(pokemonList[i].height < 4 && pokemonList[i].height > 2){
        document.write('<p>' + pokemonList[i].name + ' (height:' + pokemonList[i].height +'-Wow that is big!</p>')
     }
}