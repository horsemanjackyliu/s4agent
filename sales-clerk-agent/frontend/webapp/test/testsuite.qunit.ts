import type {SuiteConfiguration} from "sap/ui/test/starter/config";
export default {
	name: "QUnit test suite for the UI5 Application: com.sap.salesclerkai",
	defaults: {
		page: "ui5://test-resources/com/sap/salesclerkai/Test.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2
		},
		sinon: {
			version: 4
		},
		ui5: {
			language: "EN",
			theme: "sap_horizon"
		},
		coverage: {
			only: ["com/sap/salesclerkai/"],
			never: ["test-resources/com/sap/salesclerkai/"]
		},
		loader: {
			paths: {
				"com/sap/salesclerkai": "../"
			}
		}
	},
	tests: {
		"unit/unitTests": {
			title: "Unit tests for com.sap.salesclerkai"
		},
		"integration/opaTests": {
			title: "Integration tests for com.sap.salesclerkai"
		}
	}
} satisfies SuiteConfiguration;
