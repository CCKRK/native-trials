var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
//var UserViewModel = require("../../shared/view-models/user-view-model");
function workoutListViewModel(items) {
    var viewModel = new ObservableArray(items);
    viewModel.load = function() {
    return fetch(config.apiUrl + "/GetAllItems?userID=1", {
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
          //  console.log(data.Exercises[i].exerciseName);
        };
    });
};
viewModel.empty = function() {
    while (viewModel.length) {
        viewModel.pop();
    }
};

/*viewModel.add = function(newExercise) {
    return fetch(config.apiUrl + "/AddItem", {
        method: "POST",
        body: JSON.stringify({
            exerciseName: newExercise
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
        viewModel.push({ name: newExercise, id: data.Exercises.exerciseID });
    });
};*/
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