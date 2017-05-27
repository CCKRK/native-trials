var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;
var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");

var workoutList = new GroceryListViewModel([]);
var pageData = new observableModule.fromObject({
    workoutList: workoutList
});

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    workoutList.empty();
    workoutList.load();
};