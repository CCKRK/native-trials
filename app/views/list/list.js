
var dialogsModule = require("ui/dialogs");
var swipeDelete = require("../../shared/utils/ios-swipe-delete");
var socialShare = require("nativescript-social-share");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;
var workoutListViewModel = require("../../shared/view-models/workout-list-view-model");
var workoutList = new workoutListViewModel([]);
var pageData = new observableModule.fromObject({
    workoutList: workoutList,
    newExercise: ""
});


exports.loaded = function(args) {
    page = args.object;
    if (page.ios) {
        var listView = page.getViewById("workoutList");
        swipeDelete.enable(listView, function(index) {
            workoutList.delete(index);
        });
    }
    page.bindingContext = pageData;
    var listView = page.getViewById("workoutList");
    workoutList.empty();
    pageData.set("isLoading", true);
    workoutList.load().then(function() {
        pageData.set("isLoading", false);
        listView.animate({
            opacity: 1,
            duration: 1000
        });
    });
};
//have to redo add function to interact with sql
exports.add = function() {
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
};
exports.share = function() {
    var list = [];
    for (var i = 0, size = workoutList.length; i < size ; i++) {
        list.push(workoutList.getItem(i).name);
    }
    var listString = list.join(", ").trim();
    socialShare.shareText(listString);
};
exports.delete = function(args) {
    var item = args.view.bindingContext;
    var index = workoutList.indexOf(item);
    workoutList.delete(index);
};