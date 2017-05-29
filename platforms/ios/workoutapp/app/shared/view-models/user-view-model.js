var config = require("../../shared/config");
var fetchModule = require("fetch");
var appSettings = require('application-settings')
var validator = require("email-validator");
var http = require("http");
//var Https =require("nativescript-https");
// god this needs https
var observableModule = require("data/observable");
function User(info) {
    info = info || {};
    var viewModel = new observableModule.fromObject({
        email: info.email || "",
        password: info.password || ""
    });
    viewModel.login = function(){
     return http.request({
        url: config.apiURL + '/AuthenticateUser',
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ email: viewModel.get("email"), password: viewModel.get("password") })
    })
    .then(function (response) {
        return  response.content.toJSON();

        }).then(function(data){
            if(data.status != 200){
                throw Error(data.status);
            }
            appSettings.setString('token',data.UserID);
        })
    };
    /*viewModel.login = function() {
        return fetchModule.fetch(config.apiUrl + "/AuthenticateUser", {
            method: "POST",
            body: JSON.stringify({
                email: viewModel.get("email"),
                password: viewModel.get("password"),
                //grant_type: "password"
            }),
            headers: {
                //"Content-Type": "application/json"
                'Content-Type': 'application/x-www-form-urlencoded',
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
    };*/

    viewModel.register = function(){
     return http.request({
        //url: "http://cckrk.pythonanywhere.com/AuthenticateUser",
        url: config.apiURL + '/CreateUser',
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ email: viewModel.get("email"), password: viewModel.get("password") })
    })
    //.then(handleErrors)
    .then(function (response) {
        //console.log(JSON.stringify(response.content));
        return  response.content.toJSON();

        }).then(function(data){
            if(data.status != 200){
                throw Error('Username Unavailable');
            }
            return data;//console.log(data.UserID);
        })
    };


/*
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
    };*/
    viewModel.isValidEmail = function() {
        var email = this.get("email");
        return validator.validate(email);
    };
    return viewModel;
}
function handleErrors(response) {
    if (response.content.status != 200) {
        console.log(JSON.stringify(response.content.status));
        throw Error(response.content.status);
    }
    return response;
}
module.exports = User;