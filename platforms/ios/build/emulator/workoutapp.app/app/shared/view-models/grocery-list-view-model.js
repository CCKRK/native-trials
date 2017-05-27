var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
//var http = req
function GroceryListViewModel(items) {
    var viewModel = new ObservableArray(items);
    viewModel.load = function() {
        return fetch(config.apiURL + "/GetAllItems/?UserID=1", {
            method: "POST",
            body: JSON.stringify({
                userID: 1,
            }),
            headers: {
                "Content-Type": "application/json"
            
            } 
        })
        .then(handleErrors)
        .then(function (response) {
            return response.json();
        }).then(function(data) {
            data.items.forEach(function (workout) {
                viewModel.push({
                    name: workout.itemName,
                    id: workout.itemID
                });
            });
        });
    };
/*    viewModel.load = function() {
        return fetch(config.apiUrl + "Groceries", {
            headers: {
                "Authorization": "Bearer " + config.token
            }
        })
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            data.Result.forEach(function(grocery) {
                viewModel.push({
                    name: grocery.Name,
                    id: grocery.Id
                });
            });
        });
    };

    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };    
/*        //}
        //} 
        //return fetch(config.apiUrl + "/GetAllItems", {
        //    method : "GET",
            headers: {
               //"Authorization": "Bearer " + config.token
               "?userID=1"
            //"Content-Type": "application/json"
            }
        })
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            data.items.forEach(function(grocery) {
                viewModel.push({
                    name: grocery.itemName,
                    id: grocery.itemID
                });
            });
        });*/
    

    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.status);
    }
    return response;
}
}
module.exports = GroceryListViewModel;