
//exports.loaded = function(args) {
//}
var frameModule = require("ui/frame");
//var ObservableArray = require("data/observable-array").ObservableArray;
var observableModule = require("data/observable")
var routineListViewModel = require("../../shared/view-models/workout-list-view-model");
var routineList = new routineListViewModel([]);
var pageData = new observableModule.fromObject({
    routineList: routineList
});
var drawer;
var view = require("ui/core/view");
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pageLoaded(args) {
    var page = args.object;
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
exports.pageLoaded = pageLoaded;