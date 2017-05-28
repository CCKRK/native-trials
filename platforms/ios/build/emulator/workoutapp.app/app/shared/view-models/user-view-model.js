var config = require("../../shared/config");
var fetchModule = require("fetch");
var appSettings = require('application-settings');
//var Https =require("nativescript-https");
// god this needs https
var observableModule = require("data/observable");
//var token = appSettings.getString('token', 'defaultValue');
function User(info) {
    info = info || {};
    var viewModel = new observableModule.fromObject({
        email: info.email || "",
        password: info.password || ""
    });
    viewModel.login = function() {
        return fetchModule.fetch(config.apiUrl + "/AuthenticateUser", {
            method: "POST",
            body: JSON.stringify({
                email: viewModel.get("email"),
                password: viewModel.get("password"),
                //grant_type: "password"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //this is probably poor implementation of API's... 
            if(data.status == 100) {
                throw Error(data.statusText);
            }
            //This sets the app settings user token to gained UserID
            //TODO: needs auth support
            appSettings.setString('token',data.UserID);
        })
    };
    viewModel.register = function() {
        return fetchModule.fetch(config.apiUrl + "/CreateUser", {
            method: "POST",
            body: JSON.stringify({
                email: viewModel.get("email"),
                password: viewModel.get("password")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if(data.status == 1000) {
                throw Error('Username Taken!');
            }
            return data;
        })
    };
    return viewModel;
}
function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}
module.exports = User;