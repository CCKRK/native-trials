
//exports.loaded = function(args) {
//}
var frameModule = require("ui/frame");
//var ObservableArray = require("data/observable-array").ObservableArray;
var observableModule = require("data/observable");

var swipeDelete = require("../../shared/utils/ios-swipe-delete");
var routineListViewModel = require("../../shared/view-models/workout-list-view-model");
var routineList = new routineListViewModel([]);
var pageData = new observableModule.fromObject({
    routineList: routineList,
    newExercise: ""
});
var drawer;
var view = require("ui/core/view");
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pageLoaded(args) {
    var page = args.object;
        if (page.ios) {
        var listView = page.getViewById("routineList");
        swipeDelete.enable(listView, function(index) {
            routineList.delete(index);
        });
    }
    drawer = view.getViewById(page, "sideDrawer");
    page.bindingContext = pageData;
    var listView = page.getViewById("routineList");
    routineList.empty();
    pageData.set("isLoading", true);
    routineList.load().then(function() {
        pageData.set("isLoading", false);
        listView.animate({
            opacity: 1,
            duration: 1000
        });
    });
}
exports.toggleDrawer = function() {
    drawer.toggleDrawerState();
};
exports.gotolist = function(){
	frameModule.topmost().navigate("views/list/list");
};
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
    routineList.add(pageData.get("newExercise"))
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
        list.push(routineList.getItem(i).name);
    }
    var listString = list.join(", ").trim();
    socialShare.shareText(listString);
};
exports.delete = function(args) {
    var item = args.view.bindingContext;
    var index = routineList.indexOf(item);
    routineList.delete(index);
};*/
exports.pageLoaded = pageLoaded;