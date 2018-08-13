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
      });
      selection();
  };
function selection(){
  connection.query("SELECT * FROM products", function(err, results) {


  inquirer
        .prompt([
          {
          name: "selectItem",
          type: "input",
         
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message : "Which item would you like to purchase?",
        },
        {
          name: "qnty",
          type: "input",
          message: "What quantity do you need?"
        }
      
      ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.selectItem) {
              chosenItem = results[i];
            }
          }
          console.log(answer);

          if (chosenItem.stock_quantity > parseInt(answer.qnty)) {
            // bid was high enough, so update db, let the user know, and start over
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: answer.qnty
                },
                {
                  item_id: chosenItem.item_id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Order placed successfully!");
                start();
              }
            );
          }
          else {
            // bid wasn't high enough, so apologize and start over
            console.log("Your order is too large, please try again...");
            start();
          }
        });
      });
}