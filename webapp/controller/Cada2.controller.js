sap.ui.define([
    "sap/ui/core/mvc/Controller",       
    "sap/m/MessageBox",                 
    "sap/m/Dialog",                     
    "sap/m/Button",                     
    "sap/ui/core/HTML"                  
], function (Controller, MessageBox, Dialog, Button, HTML) {
    "use strict";

    return Controller.extend("goscm.documentocad.controller.Cada2", {
        onInit: function () {

            var oView = this.getView();

            // Crea un nuevo modelo JSON vacío y lo asigna a la vista oview 
            var oJsonModelPhoto = new sap.ui.model.json.JSONModel();
            oView.setModel(oJsonModelPhoto, "jsonModelPhoto");

            oView.bindElement({
                path: "/",
                parameters: {}
            });
        },

        onCapturePhoto: function () {
            var videoElement = document.getElementById("cameraFeed");

            // Crea un elemento canvas y lo configura con las dimensiones del video
            var canvas = document.createElement("canvas");
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;

            // Obtiene el canvas y pone el video
            var context = canvas.getContext("2d");
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

            // Crea un elemento de imagen y le asigna la imagen del canvas
            var imgElement = new Image();
            imgElement.src = canvas.toDataURL("image/png");

            // Limpia cualquier contenido previo
            this._oCameraDialog.removeAllContent();

            // Agrega la imagen
            this._oCameraDialog.addContent(imgElement);

            // Abre cámara
            this._oCameraDialog.open();

            var oTable = new sap.ui.table.Table({
                title: "Table Example",
                visibleRowCount: 3
            });
        }
    });
});
