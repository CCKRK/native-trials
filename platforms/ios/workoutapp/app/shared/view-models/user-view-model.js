var config = require("../../shared/config");
var fetchModule = require("fetch");
var observableModule = require("data/observable");
function User(info) {
    info = info || {};

    // You can add properties to observables on creation
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
            //config.token = JSON.stringify(data.UserID);
            //console.log(JSON.stringify(data.UserId));
            //console.log(JSON.stringify(data));
            //console.log(data.status);
            //this is probably poor implementation of API's... 
            if(data.status == 100) {
                throw Error(data.statusText);
            }

        })
    };
    viewModel.register = function() {
        return fetchModule.fetch(config.apiUrl + "/CreateUser", {
            method: "POST",
            body: JSON.stringify({
                //Username: viewModel.get("email"),
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
            console.log(JSON.stringify(data.status));
            //console.log(JSON.stringify(data.statusCode));
            if(data.status == 1000) {
                //onsole.log(data.status);
                //console.log(data.statusText);
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
        //if(response.body.status = 100) {
          //  throw Error(response.statusText);
        //}
    }
    return response;
}


module.exports = User;