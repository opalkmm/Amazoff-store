var sql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");

var connection = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mimithehamham",
  port: 3306,
  database: "amazoffDB",
});

connection.connect(function (err) {
  if (err) throw err;
  //run query to show all available products in stock
  var query = "SELECT item_id, product_name, price FROM products";

  connection.query(query, function (err, res, fields) {
    if (err) throw err;

    // console.log(res);

    //===========create table for res==============
console.log('Products available \n' + new inquirer.Separator() + '\n' + (Table.print(res)));





    userInput();
  });
});

function userInput() {
  inquirer
    .prompt([
      {
        name: "idInput",
        type: "input",
        message: "please type the item id you wish to purchase",
      },
      {
        name: "amountInput",
        type: "input",
        message: "please provide your desired quantity",
      },
    ])
    .then(function (answer) {
      //print input
      console.log(
        "item id : " +
          answer.idInput +
          "\n" +
          new inquirer.Separator() +
          "\npurchase amount : " +
          answer.amountInput
      );

      var query = "SELECT stock_quantity from products WHERE item_id = ?";

      connection.query(query, [answer.idInput], function (err, res) {
        if (err) throw err;
        console.log("stock quantity : " + res[0].stock_quantity);
        const currentQuantity = res[0].stock_quantity;

        //if amountInput < products.stock_quantity
        if (answer.amountInput < res[0].stock_quantity) {
          console.log("your transaction is successful!");
        updateStock(currentQuantity, answer);
        total(answer);


        } else if (answer.amountInput > res[0].stock_quantity) {
          console.log("insufficient quantity");
        }
      });
    });
}
function updateStock(quantity, updateID) {
  //current stock_quantity - amountInput
  var updatedQuant = quantity - updateID.amountInput;
  var query =
    "UPDATE products SET stock_quantity = " +
    updatedQuant +
    " WHERE item_id = " +
    updateID.idInput +
    " ";

  connection.query(query, function (err, res) {
    if (err) throw err;

    var query = "SELECT stock_quantity from products WHERE item_id = ?";

    connection.query(query, [updateID.idInput], function (err, res) {
      if (err) throw err;

      console.log("updated quantity : " + res[0].stock_quantity);
    });
  });
}

function total(answer){

    var query = "SELECT price FROM products WHERE item_id = ?";

    connection.query(query, answer.idInput, function(err, res){
        if (err) throw err;

        console.log("Your total : " + (res[0].price*answer.amountInput));
    }) 
};
