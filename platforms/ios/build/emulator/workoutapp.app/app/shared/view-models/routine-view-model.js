"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// >> sidedrawer-getting-started-model
var observable_1 = require("tns-core-modules/data/observable");
var frame = require("tns-core-modules/ui/frame");
var GettingStartedViewModel = (function (_super) {
    __extends(GettingStartedViewModel, _super);
    function GettingStartedViewModel() {
        var _this = _super.call(this) || this;
        _this.set("mainContentText", "SideDrawer for NativeScript can be easily setup in the XML definition of your page by defining main- and drawer-content. The component"
            + " has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.");
        return _this;
    }
    GettingStartedViewModel.prototype.onOpenDrawerTap = function () {
        var sideDrawer = (frame.topmost().getViewById("sideDrawer"));
        sideDrawer.showDrawer();
    };
    GettingStartedViewModel.prototype.onCloseDrawerTap = function () {
        var sideDrawer = (frame.topmost().getViewById("sideDrawer"));
        sideDrawer.closeDrawer();
    };
    return GettingStartedViewModel;
}(observable_1.Observable));
exports.GettingStartedViewModel = GettingStartedViewModel;