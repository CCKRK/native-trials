var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;
var workoutListViewModel = require("../../shared/view-models/workout-list-view-model");
var workoutList = new workoutListViewModel([]);
var pageData = new observableModule.fromObject({
    workoutList: workoutList
    //newExercise: ""
});

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    workoutList.empty();
    workoutList.load();
};
//have to redo add function to interact with sql
/*exports.add = function() {
    // Check for empty submissions
    if (pageData.get("newExercise").trim() === "") {
        dialogsModule.alert({
            message: "Enter a new exercise",
            okButtonText: "OK"
        });
        return;
    }

    // Dismiss the keyboard
    page.getViewById("newExercise").dismissSoftInput();
    workoutList.add(pageData.get("newExercise"))
        .catch(function() {
            dialogsModule.alert({
                message: "An error occurred while adding an item to your list.",
                okButtonText: "OK"
            });
        });

    // Empty the input field
    pageData.set("newExercise", "");
};*/