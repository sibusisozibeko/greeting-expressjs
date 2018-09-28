module.exports = function NamesGreeted(pool) {
  //when the greet button is pressed check if this user was already greeted befo  //by looking if the userName exists in namesGreeted if not increment this counter and update the screen
  async function greetedNames(language, name) {
    name = name.toUpperCase();

    if (name != "") {
      let found = await pool.query("SELECT * FROM greet WHERE username=$1", [
        name
      ]);
      if (found.rowCount === 0) {
        //console.log("insert");
        await pool.query(
          "INSERT INTO greet (username, greet_count)values($1, $2)",
          [name, 0]
        );
      }
      // else {
      //console.log("update");
      await pool.query(
        "UPDATE greet SET greet_count = greet_count + 1 WHERE username=$1",
        [name]
      );
      // }
      if (language === "IsiXhosa") {
        return "Molo, " + name;
      }
      if (language === "English") {
        return "Hello, " + name;
      }

      if (language === "Afrikaans") {
        return "Hallo, " + name;
      }
    }
  }
  async function usernamecounter(username) {
    let found = await pool.query(
      "SELECT username, greet_count FROM greet WHERE username=$1",
      [username]
    );
    return found.rows[0];
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
    // console.log(count.rows[0].count);
    return count.rows[0].count;
  }

  async function clearBtn() {
    await pool.query("DELETE FROM greet");
  }

  return {
    //  getGreetingNames,

    greetedNames,
    clearBtn,
    //  namesGreeted,
    countNames,
    usernamecounter,
    // setName,
    // setLang,
    returnName,
    returnLanguage
  };
};
