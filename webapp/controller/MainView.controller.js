sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox, JSONModel, ODataModel) {
        "use strict";

        return Controller.extend("appmabetest.mabetest.controller.MainView", {
            onInit: function () {
            },
            toNext: function () {//navega a pantalla 2 
                var oRouting = sap.ui.core.UIComponent.getRouterFor(this);
                oRouting.navTo("RouteCadA2View", null, true);
            },
            onPress: function () {
                var oComboBox = this.getView().byId("OperadorSetComboBox");
          
                // Realiza la consulta OData
                this.getView().getModel().read("/ZCAD_TURNOSSet", {
                  success: function (data) {
                    // Crea un modelo JSON con los datos obtenidos
                    var oModel = new JSONModel(data);
          
                    // Establece el modelo en el ComboBox
                    oComboBox.setModel(oModel);
          
                    // Define el binding de los elementos del ComboBox
                    oComboBox.bindItems({
                      path: "/TurnoSet", 
                      template: new sap.ui.core.ListItem({
                        key: "{turno}", 
                        text: "{Texto}" 
                      })
                    });
                  }.bind(this),
                  error: function (e) {
                    
                  }.bind(this)
                });
              },
              toNext2: function(){
                var date = this.getView().byId("dtpic1").getValue();
                var numserie = this.getView().byId("input_Serie").getValue();
                if(date !== '' && numserie!== ''){
                    MessageBox.success("Todo en orden");
                    var oRouting = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouting.navTo("ScanView", null, true);
                } else {
                    MessageBox.error("Campos vacios");
                }
            }, 
            onSave: async function () {
                // guarda lo que se ingreso en modelo y status
                var oInputModelo = this.getView().byId("input_Modelo_o1");
                var oInputEstatus = this.getView().byId("input_Estatus_o1");
                var sModelo = oInputModelo.getValue();
            
                // Comprueba si se ingresó un modelo
                if (!sModelo) {
                    MessageBox.error("Falta ingresar Modelo");
                    return;
                }
            
                // Elimina los primeros tres caracteres
                var sTrimmedModelo = sModelo.substring(3);
            
                try {
                    // Comprueba si el modelo existe en SAP S/4HANA
                    var bModeloExistsInECC = await this._checkModeloInECC(sTrimmedModelo);
                    
                    // Si el modelo no existe, muestra un mensaje de error
                    if (!bModeloExistsInECC) {
                        MessageBox.error("El modelo no existe en S4");
                        return;
                    }
            
                    // Obtiene el estado del modelo
                    var sEstatus = await this._getEstatusFromECC(sTrimmedModelo);
            
                    // comprobaciones 
                    if (sEstatus === "01") {
                        MessageBox.error("Este modelo ya está en proceso");
                        return;
                    } else if (sEstatus === "04") {
                        MessageBox.error("Este modelo está LI");
                        return;
                    }
            
                    // Si pasa las comprobaciones, actualiza habilita los campos
                    await this._updateAndFillFields(sTrimmedModelo);
            
                   
                    var oSelectTurno = this.getView().byId("selectTurno");
                    var oSelectOrigen = this.getView().byId("selectOrigen");
                    var oSelectDestino = this.getView().byId("selectDestino");
            
                    oSelectTurno.setEnabled(true);
                    oSelectOrigen.setEnabled(true);
                    oSelectDestino.setEnabled(true);
            
                    // Actualiza el texto del botón
                    oInputModelo.setValue(sTrimmedModelo);
                    var oButton = this.getView().byId("boton");
                    oButton.setText("Siguiente");
                } catch (error) {
                    MessageBox.error("Error al validar el modelo en ECC: " + error.message);
                }
            },
            
            _checkModeloInECC: function (sModelo) {
                return new Promise(function (resolve, reject) {
                    // Simula una llamada asincrónica para verificar el modelo
                    setTimeout(function () {
                        var bModeloExists = (sModelo === oInputModelo); //verifica modelo en S4
                        resolve(bModeloExists);
                    }, 1000); 
                });
            },
            
            _getEstatusFromECC: function (sModelo) {
                return new Promise(function (resolve, reject) {
                    // Simula una llamada asincrónica para obtener el estado del modelo
                    setTimeout(function () {
                        var sEstatus = oInputEstatus; // verifica estatus en S4
                        resolve(sEstatus);
                    }, 1000); 
                });
            },
            
            _updateAndFillFields: async function (sModelo) {
                var oModelInfo = await this._getModelInfoFromECC(sModelo);
            
                // Obtiene campos 
                var oInputFolio = this.getView().byId("input_Folio");
                var oInputEstatus = this.getView().byId("input_Estatus");
                var oInputPiezas = this.getView().byId("input_Piezas");
            
                // Rellena los campos 
                oInputFolio.setValue(oModelInfo.folio);
                oInputEstatus.setValue(oModelInfo.estatus);
                oInputPiezas.setValue(oModelInfo.piezasRegistradas);
            },
            
            _getModelInfoFromECC: function (sModelo) {
                
            },
            
            onBack: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteCadA2View", null, true);
            }
            
        });
});
