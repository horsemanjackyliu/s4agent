import Main from "com/sap/salesclerkai/controller/Main.controller";

QUnit.module("Sample Main controller test");

QUnit.test("The Main controller class has an onSend method", function (assert) {
	assert.strictEqual(typeof Main.prototype.onSend, "function");
});
