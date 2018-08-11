var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
  
  function start() {
      connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
          console.log(results[i].item_id + " | " + results[i].product_name + " | " + "$" + results[i].price);
        }
      })
      selection();
  };
function selection(){
  inquirer
        .prompt([
          {
          name: "selectItem",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
            }
            return choiceArray;
          },
          message : "Which item would you like to purchase?"
        },
        {
        name :"item",
        type : "input",
        message : "how many items?"
        }
        ])
}