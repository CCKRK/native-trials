var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require('application-settings');
var token = appSettings.getString('token','defaultValue');
var http = require("http");
function workoutListViewModel(items) {
    var viewModel = new ObservableArray(items);
    viewModel.load = function(dayID){
     return http.request({
        url: config.apiURL + '/GetAllItems?userID=' + token + '&dayID=' + dayID,
        method: "GET"})
     .then(function (response){
        return response.content.toJSON();
     }).then(function(data){
        for (var i =0; i < data.Exercises.length;i++) {
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
viewModel.add = function(newExercise){
 return http.request({
    url: config.apiURL + '/AddItem',
    method: "POST",
    headers: { "Content-Type": "application/json" },
    content: JSON.stringify({ exerciseName: newExercise, userID: token })
})
.then(function (response) {
    return  response.content.toJSON();

    })
    .then(function(data){
        viewModel.push({ name: newExercise, id: this.exerciseID });
    });
};
viewModel.delete = function(index){
    var num = viewModel.getItem(index).id;
    console.log(num);
 return http.request({
    url: config.apiURL + '/RemoveItem' ,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    content: JSON.stringify({ exerciseID: num })
})
 .then(function (response){
    return response.content.toJSON();
 })
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