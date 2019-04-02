
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Port; if not 3306
    port: 3306,

    // Username, which is root for these exercises
    user: "root",

    // Password (none here)
    password: "",
    database: "bamazon_db"
});

// Make connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

var display = function () {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // Show items available for purchase in a table
        console.table(results);
    })
};

var buy = function () {
    // Query the database for all products available for purchase
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // With the product list shown, prompt user with a purchase request
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
                message: "What product would you like to purchase?"
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
                        item_id: chosenProduct.item_id
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

// Function calls
display();
buy();

