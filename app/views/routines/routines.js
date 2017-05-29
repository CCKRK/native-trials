
//exports.loaded = function(args) {
//}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// >> sidedrawer-getting-started-binding-context
var getting_started_model_1 = require("../../shared/view-models/routine-view-model");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new getting_started_model_1.GettingStartedViewModel();
}
exports.pageLoaded = pageLoaded;