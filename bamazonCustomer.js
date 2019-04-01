
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
    //console.log("connected as id " + connection.threadId + "\n");
});

var display = function () {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        //show table of items available for purchase
        console.table(results);
    })
};

var buy = function () {
    // query the database for all products available for purchase
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the products, prompt the user for which they'd like to purchase
        inquirer.prompt([
            {
                name: "product",
                type: "list",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                },
                message: "What product (by ID) would you like to purchase?"
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to purchase?"
            }
        ]).then(function (answer) {
            var chosenProduct;
            for (var i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.product) {
                    chosenProduct = results[i];
                }
            }

            if (chosenProduct.stock_quantity > parseInt(answer.amount)) {
                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        stock_quantity: chosenProduct.stock_quantity - parseInt(answer.amount)
                    },
                    {
                        id: chosenProduct.id
                    }], function (error) {
                        if (error) throw err;
                        console.log("\n\n");
                        console.log("==============================================");
                        console.log("Product purchased successfully!");
                        console.log("==============================================");
                        console.log("Purchase Summary");
                        console.log("-----------------------------");
                        console.log("Item Name: " + chosenProduct.product_name);
                        console.log("Item Count: " + parseInt(answer.amount));
                        console.log("-----------------------------");
                        console.log("Total: " + "$" + (chosenProduct.price * parseInt(answer.amount)));
                        console.log("==============================================");
                        console.log("\n\n");
                        display();
                        buy();
                    })
            } else {
                console.log("==============================================");
                console.log("Insufficient quantity!");
                console.log("==============================================");
                display();
                buy();
            }
        });
    });
};

display();
buy();

