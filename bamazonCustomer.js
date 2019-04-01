
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password (none here)
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    buy();
});

function buy() {
    console.log("Inserting a new bid...\n");
    var query = connection.query(
        "INSERT INTO bids_items SET ?",
        {
            name: "",
            price: [],
            quantity: []
        },
        function (err, res) {
            console.log(res.affectedRows + " bid inserted!\n");
            // Call updateBid AFTER the INSERT completes
            updateStock();
        }
    );
    // logs the actual query being run
    console.log(query.sql);
}
function updateStock() {
    console.log("Updating all Rocky Road quantities...\n");
    var query = connection.query(
        "UPDATE bids_items SET ? WHERE ?",
        [
            {
                price: []
            },
            {
                name: ""
            }
        ],
        function (err, res) {
            console.log(res.affectedRows + " bids_items updated!\n");
            // Call deleteBid AFTER the UPDATE completes
            deleteBid();
        }
    );
