sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("goscm.documentocad.controller.ScanView", {
            onInit: function () {

            },
            onBack:function(){
                var oRouting = sap.ui.core.UIComponent.getRouterFor(this);
                oRouting.navTo("RouteMainView", null, true);
            }

        });
    });