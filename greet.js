module.exports = function NamesGreeted(pool) {
  //when the greet button is pressed check if this user was already greeted befo  //by looking if the userName exists in namesGreeted if not increment this counter and update the screen
  async function greetedNames(language, name) {
    if (name != "") {
      let found = await pool.query("SELECT * FROM greet WHERE username=$1", [
        name
      ]);

      if (found.rowCount === 0) {
        console.log("insert");
        await pool.query(
          "INSERT INTO greet (username, language)values($1,$2)",
          [name, language]
        );
      } else {
        console.log("update");
        await pool.query(
          "UPDATE greet SET greet_count=(greet_count+1), language=$1 WHERE username=$2",
          [language, name]
        );
      }

      // if (namesGreeted[name] === undefined){
      //     //count++;
      //     //add an entry for the user that was greeted in the Object Map
      //     namesGreeted[name] = 0;
      //   }  //update the DOM to display the counter
      //   }
      if (language === "IsiXhosa") {
        // greetingz === 'Molo ' + name
        return "Molo, " + name;
      }

      if (language === "English") {
        // greetingz === 'Hello ' + name
        return "Hello, " + name;
      }

      if (language === "Afrikaans") {
        // greetingz === 'hallo ' + name
        return "Hallo, " + name;
      }
    }
  }
  async function Greetfunctions(username) {
    let found = await pool.query("SELECT * FROM greet WHERE username=$1", [
      username
    ]);
    if (found.rows === []) {
    } else {
      let count = found.rows[0].greet_count;
      let lang = found.rows[0].language;
      let message = `Hello ${username} has been greeted in ${lang} ${count} time(s)`;
      console.log(message);

      return message;
    }
  }

  async function returnName() {
    let selection = await pool.query("SELECT username FROM greet");
    return selection.rows;
  }

  function returnLanguage() {
    return language;
  }

  async function countNames() {
    let count = await pool.query("SELECT COUNT (username) FROM greet");
    console.log(count.rows[0].count);
    return count.rows[0].count;
  }

  async function clearBtn() {
    let clear = await pool.query("DELETE FROM greet");
    return clear.rows[0];
  }

  return {
    //  getGreetingNames,
    greetedNames,
    clearBtn,
    //  namesGreeted,
    countNames,
    Greetfunctions,
    // setName,
    // setLang,
    returnName,
    returnLanguage
  };
};
