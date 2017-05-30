var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var page;
var email;
var UserViewModel = require("../../shared/view-models/user-view-model");
"use strict";
var user = new UserViewModel({
    email: "codykessler@gmail.com",
    password: "savias12"
});
exports.loaded = function(args) {
    page = args.object;
    if (page.ios) {
        var navigationBar = frameModule.topmost().ios.controller.navigationBar;
        navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }
    page.bindingContext = user;
};
exports.signIn = function() {
    user.login()
        .catch(function(error) {
            console.log(error);
            dialogsModule.alert({
                message: "Username or Password Incorrect.",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function() {
            frameModule.topmost().navigate("views/routines/routines");
        });
};
exports.register = function() {
	var topmost = frameModule.topmost();
	topmost.navigate("views/register/register");
};


