var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require('application-settings');
var token = appSettings.getString('token','defaultValue');
function workoutListViewModel(items) {
    var viewModel = new ObservableArray(items);
    viewModel.load = function() {
        //console.log(token);
    return fetch(config.apiUrl + "/GetAllItems?userID=" + token, {
        headers: {
         //   "Authorization": "None" //+ config.token
        }
    })
    .then(handleErrors)
    .then(function(response){
        return response.json();
    }).then(function(data){
        for (var i = 0; i < data.Exercises.length; i++) {
            viewModel.push({
                name: data.Exercises[i].exerciseName,
                id: data.Exercises[i].exerciseID
            });
        };
    });
};
viewModel.empty = function() {
    while (viewModel.length) {
        viewModel.pop();
    }
};

viewModel.add = function(newExercise) {
    return fetch(config.apiUrl + "/AddItem", {
        method: "POST",
        body: JSON.stringify({
            exerciseName: newExercise,
            userID: token
        }),
        headers: {
            //"Authorization": "Bearer " + config.token,
            "Content-Type": "application/json"
        }
    })
    .then(handleErrors)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        viewModel.push({ name: newExercise, id: this.exerciseID });
    });
};
viewModel.delete = function(index) {
    return fetch(config.apiUrl + "/RemoveItem", {
        method: "DELETE",
        body: JSON.stringify({
            exerciseID: viewModel.getItem(index).id
        }),
        headers: {
           // "Authorization": "Bearer " + config.token,
            "Content-Type": "application/json"
        }

        //console.log(viewModel.getItem(index).id + ' the odd viewmodelobj');
    })
    .then(handleErrors)
    .then(function() {
        viewModel.splice(index, 1);
    });
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
module.exports = workoutListViewModel;