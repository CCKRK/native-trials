"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frameModule = require("tns-core-modules/ui/frame");
var drawerModule = require("nativescript-telerik-ui/sidedrawer");
var DrawerTransitionsModel = (function () {
    function DrawerTransitionsModel() {
    }
    DrawerTransitionsModel.prototype.onPushTransitionTap = function (args) {
        this.setDrawerTransition(new drawerModule.PushTransition());
        this.openSideDrawer();
    };
    DrawerTransitionsModel.prototype.openSideDrawer = function (args) {
        var drawer = frameModule.topmost().getViewById("sideDrawer");
        drawer.showDrawer();
    };
    DrawerTransitionsModel.prototype.closeDrawer = function (args) {
        var drawer = frameModule.topmost().getViewById("sideDrawer");
        drawer.closeDrawer();
    };
    DrawerTransitionsModel.prototype.setDrawerTransition = function (transition) {
        var drawer = frameModule.topmost().getViewById("sideDrawer");
        drawer.drawerTransition = transition;
    }; // << sidedrawer-setting-transition
    return DrawerTransitionsModel;
}());
exports.DrawerTransitionsModel = DrawerTransitionsModel;