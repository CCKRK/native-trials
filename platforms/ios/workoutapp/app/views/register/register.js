var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");

var UserViewModel = require("../../shared/view-models/user-view-model");
var user = new UserViewModel();

exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = user;
};

function completeRegistration() {
    user.register()
        .catch(function(error) {
            console.log(error);
            dialogsModule.alert({
                message: "Username already Registered.",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function() {
            dialogsModule
            .alert("Registration Successfull")
            .then(function() {
                frameModule.topmost().goBack();
            });
        });
//    user.register()
//        .then(function() {
//            dialogsModule
//                .alert("Your account was successfully created.")
//                .then(function() {
//                    frameModule.topmost().navigate("views/login/login");
//                });
//        }).catch(function(error) {
//            console.log(error);
//            dialogsModule
//                .alert({
//                    message: "Unfortunately we were unable to create your account.",
//                    okButtonText: "OK"
//                });
//        });

}

exports.register = function() {
    completeRegistration();
};