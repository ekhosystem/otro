/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"app_mabe_test/mabe__test/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
