module.exports = function NamesGreeted(nameentered){
  var namesGreeted = nameentered || {};
  //var greetingz ="";
   var names ="";
   var language = "";
   function setName(value){
     names = value;
   }

   function setLang(button){
     language = button;
   }

//when the greet button is pressed check if this user was already greeted befo  //by looking if the userName exists in namesGreeted if not increment this counter and update the screen
function greetedNames(language, name) {
  if(name != ''){
//names = name;
  if (namesGreeted[name] === undefined){
      //count++;
      //add an entry for the user that was greeted in the Object Map
      namesGreeted[name] = 0;
    }  //update the DOM to display the counter
    }
   if (language === 'IsiXhosa') {
    // greetingz === 'Molo ' + name
    return 'Molo, ' + name

  }

   if (language === 'English') {
    // greetingz === 'Hello ' + name
    return 'Hello, ' + name
  }

   if (language === 'Afrikaans') {
    // greetingz === 'hallo ' + name
    return 'Hallo, ' + name

  }


}

  function returnName(){
    return names;
  }

  function returnLanguage(){
    return language;
  }

function getGreetingNames(){
  return namesGreeted;
}
//console.log(namesGreeted);

function countNames() {
return Object.keys(namesGreeted).length;
}
//console.log(countNames());

function clearBtn(){
  return namesGreeted = {};
}

// function counterYam(){
//   return
// }

return{
   getGreetingNames,
   greetedNames,
   clearBtn,
   namesGreeted,
   countNames,
  setName,
  setLang,
  returnName,
  returnLanguage
  }
}
