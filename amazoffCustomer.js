var sql = require('mysql');
var inquirer = require('inquirer');

var connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mimithehamham',
    port: 3306,
    database: 'amazoffDB'
})

connection.connect(function(err){
    if(err) throw err;
    //run query to show all available products in stock
showAll();

})

function showAll()
    var query = 'SELECT item_id, product_name, price FROM products;'
