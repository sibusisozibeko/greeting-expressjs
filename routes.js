module.exports = function(greetedNames) {
  // this function checks the database for names and display them on the homepage
  async function homePage(req, res, next) {
    try {
      let count = await greetedNames.countNames();
      await greetedNames.returnName();
      await greetedNames.usernamecounter();
      res.render("home", { count });
    } catch (error) {
      next(error.stack);
    }
  }

  //thi one shows a name and a counter
  async function greetcount(req, res, next) {
    try {
      let textarea = req.body.myTextarea;
      let radio = req.body.radioz;

      if (textarea === "") {
        req.flash("error", "please enter name!");
      } else if (radio == undefined) {
        req.flash("error", "please select a button!");
      }
      let greet = await greetedNames.greetedNames(radio, textarea);
      console.log(await greetedNames.countNames());
      let count = await greetedNames.countNames();

      res.render("home", {
        greet,
        count
      });
    } catch (error) {
      next(error.stack);
    }
  }
  //this one shows names
  async function showname(req, res, next) {
    try {
      let greeted = await greetedNames.returnName();
      res.render("greetings", { greeted });
    } catch (error) {
      next(error.stack);
    }
  }
  //this one clears a counter and anme
  async function clearcountandnames(req, res, next) {
    try {
      await greetedNames.clearBtn();
      res.redirect("/");
    } catch (error) {
      next(error.stack);
    }
  }
  //shows name greeted and message
  async function returnmessagedb(req, res, next) {
    try {
      let greeted = await greetedNames.returnName();
      let message = await greetedNames.usernamecounter(req.params.username);
      console.log(message);
      res.render("greetings", { greeted, message });
    } catch (error) {
      next(error.stack);
    }
  }
  //button returning to home
  async function returntohome(req, res, next) {
    try {
      res.redirect("/");
    } catch (error) {
      next(error.stack);
    }
  }

  return {
    homePage,
    greetcount,
    showname,
    clearcountandnames,
    returnmessagedb,
    returntohome
  };
};
