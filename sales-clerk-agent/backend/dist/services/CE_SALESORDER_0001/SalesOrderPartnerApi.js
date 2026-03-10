"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderPartnerApi = void 0;
/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SalesOrderPartner_1 = require("./SalesOrderPartner");
const SalesOrderPartnerRequestBuilder_1 = require("./SalesOrderPartnerRequestBuilder");
const Sap_Message_1 = require("./Sap_Message");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class SalesOrderPartnerApi {
    deSerializers;
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v4_1.defaultDeSerializers) {
        return new SalesOrderPartnerApi(deSerializers);
    }
    navigationPropertyFields;
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            SALES_ORDER_1: new odata_v4_1.OneToOneLink('_SalesOrder', this, linkedApis[0])
        };
        return this;
    }
    entityConstructor = SalesOrderPartner_1.SalesOrderPartner;
    requestBuilder() {
        return new SalesOrderPartnerRequestBuilder_1.SalesOrderPartnerRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    _fieldBuilder;
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(SalesOrderPartner_1.SalesOrderPartner, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    _schema;
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link salesOrder} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SALES_ORDER: fieldBuilder.buildEdmTypeField('SalesOrder', 'Edm.String', false),
                /**
                 * Static representation of the {@link partnerFunction} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PARTNER_FUNCTION: fieldBuilder.buildEdmTypeField('PartnerFunction', 'Edm.String', false),
                /**
                 * Static representation of the {@link customer} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CUSTOMER: fieldBuilder.buildEdmTypeField('Customer', 'Edm.String', true),
                /**
                 * Static representation of the {@link supplier} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SUPPLIER: fieldBuilder.buildEdmTypeField('Supplier', 'Edm.String', true),
                /**
                 * Static representation of the {@link personnel} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PERSONNEL: fieldBuilder.buildEdmTypeField('Personnel', 'Edm.String', true),
                /**
                 * Static representation of the {@link contactPerson} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CONTACT_PERSON: fieldBuilder.buildEdmTypeField('ContactPerson', 'Edm.String', true),
                /**
                 * Static representation of the {@link referenceBusinessPartner} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REFERENCE_BUSINESS_PARTNER: fieldBuilder.buildEdmTypeField('ReferenceBusinessPartner', 'Edm.String', false),
                /**
                 * Static representation of the {@link businessPartnerName1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUSINESS_PARTNER_NAME_1: fieldBuilder.buildEdmTypeField('BusinessPartnerName1', 'Edm.String', false),
                /**
                 * Static representation of the {@link businessPartnerName2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUSINESS_PARTNER_NAME_2: fieldBuilder.buildEdmTypeField('BusinessPartnerName2', 'Edm.String', false),
                /**
                 * Static representation of the {@link businessPartnerName3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUSINESS_PARTNER_NAME_3: fieldBuilder.buildEdmTypeField('BusinessPartnerName3', 'Edm.String', false),
                /**
                 * Static representation of the {@link businessPartnerName4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BUSINESS_PARTNER_NAME_4: fieldBuilder.buildEdmTypeField('BusinessPartnerName4', 'Edm.String', false),
                /**
                 * Static representation of the {@link addressId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ADDRESS_ID: fieldBuilder.buildEdmTypeField('AddressID', 'Edm.String', true),
                /**
                 * Static representation of the {@link addressPersonId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ADDRESS_PERSON_ID: fieldBuilder.buildEdmTypeField('AddressPersonID', 'Edm.String', true),
                /**
                 * Static representation of the {@link addressObjectType} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                ADDRESS_OBJECT_TYPE: fieldBuilder.buildEdmTypeField('AddressObjectType', 'Edm.String', false),
                /**
                 * Static representation of the {@link streetName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STREET_NAME: fieldBuilder.buildEdmTypeField('StreetName', 'Edm.String', false),
                /**
                 * Static representation of the {@link streetPrefixName1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STREET_PREFIX_NAME_1: fieldBuilder.buildEdmTypeField('StreetPrefixName1', 'Edm.String', false),
                /**
                 * Static representation of the {@link streetPrefixName2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STREET_PREFIX_NAME_2: fieldBuilder.buildEdmTypeField('StreetPrefixName2', 'Edm.String', false),
                /**
                 * Static representation of the {@link streetSuffixName1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STREET_SUFFIX_NAME_1: fieldBuilder.buildEdmTypeField('StreetSuffixName1', 'Edm.String', false),
                /**
                 * Static representation of the {@link streetSuffixName2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STREET_SUFFIX_NAME_2: fieldBuilder.buildEdmTypeField('StreetSuffixName2', 'Edm.String', false),
                /**
                 * Static representation of the {@link houseNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                HOUSE_NUMBER: fieldBuilder.buildEdmTypeField('HouseNumber', 'Edm.String', false),
                /**
                 * Static representation of the {@link postalCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                POSTAL_CODE: fieldBuilder.buildEdmTypeField('PostalCode', 'Edm.String', false),
                /**
                 * Static representation of the {@link cityName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CITY_NAME: fieldBuilder.buildEdmTypeField('CityName', 'Edm.String', false),
                /**
                 * Static representation of the {@link districtName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DISTRICT_NAME: fieldBuilder.buildEdmTypeField('DistrictName', 'Edm.String', false),
                /**
                 * Static representation of the {@link region} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                REGION: fieldBuilder.buildEdmTypeField('Region', 'Edm.String', false),
                /**
                 * Static representation of the {@link country} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COUNTRY: fieldBuilder.buildEdmTypeField('Country', 'Edm.String', false),
                /**
                 * Static representation of the {@link phoneNumberCountry} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PHONE_NUMBER_COUNTRY: fieldBuilder.buildEdmTypeField('PhoneNumberCountry', 'Edm.String', false),
                /**
                 * Static representation of the {@link phoneNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PHONE_NUMBER: fieldBuilder.buildEdmTypeField('PhoneNumber', 'Edm.String', false),
                /**
                 * Static representation of the {@link phoneNumberExtension} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PHONE_NUMBER_EXTENSION: fieldBuilder.buildEdmTypeField('PhoneNumberExtension', 'Edm.String', false),
                /**
                 * Static representation of the {@link mobilePhoneCountry} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MOBILE_PHONE_COUNTRY: fieldBuilder.buildEdmTypeField('MobilePhoneCountry', 'Edm.String', false),
                /**
                 * Static representation of the {@link mobilePhoneNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                MOBILE_PHONE_NUMBER: fieldBuilder.buildEdmTypeField('MobilePhoneNumber', 'Edm.String', false),
                /**
                 * Static representation of the {@link faxNumberCountry} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FAX_NUMBER_COUNTRY: fieldBuilder.buildEdmTypeField('FaxNumberCountry', 'Edm.String', false),
                /**
                 * Static representation of the {@link faxNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FAX_NUMBER: fieldBuilder.buildEdmTypeField('FaxNumber', 'Edm.String', false),
                /**
                 * Static representation of the {@link faxNumberExtension} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FAX_NUMBER_EXTENSION: fieldBuilder.buildEdmTypeField('FaxNumberExtension', 'Edm.String', false),
                /**
                 * Static representation of the {@link internationalPhoneNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INTERNATIONAL_PHONE_NUMBER: fieldBuilder.buildEdmTypeField('InternationalPhoneNumber', 'Edm.String', false),
                /**
                 * Static representation of the {@link internationalMobilePhoneNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INTERNATIONAL_MOBILE_PHONE_NUMBER: fieldBuilder.buildEdmTypeField('InternationalMobilePhoneNumber', 'Edm.String', false),
                /**
                 * Static representation of the {@link internationalFaxNumber} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INTERNATIONAL_FAX_NUMBER: fieldBuilder.buildEdmTypeField('InternationalFaxNumber', 'Edm.String', false),
                /**
                 * Static representation of the {@link poBox} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PO_BOX: fieldBuilder.buildEdmTypeField('POBox', 'Edm.String', false),
                /**
                 * Static representation of the {@link poBoxPostalCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PO_BOX_POSTAL_CODE: fieldBuilder.buildEdmTypeField('POBoxPostalCode', 'Edm.String', false),
                /**
                 * Static representation of the {@link formOfAddress} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                FORM_OF_ADDRESS: fieldBuilder.buildEdmTypeField('FormOfAddress', 'Edm.String', false),
                /**
                 * Static representation of the {@link correspondenceLanguage} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                CORRESPONDENCE_LANGUAGE: fieldBuilder.buildEdmTypeField('CorrespondenceLanguage', 'Edm.String', false),
                /**
                 * Static representation of the {@link emailAddress} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                EMAIL_ADDRESS: fieldBuilder.buildEdmTypeField('EmailAddress', 'Edm.String', false),
                /**
                 * Static representation of the {@link taxJurisdiction} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TAX_JURISDICTION: fieldBuilder.buildEdmTypeField('TaxJurisdiction', 'Edm.String', false),
                /**
                 * Static representation of the {@link transportZone} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TRANSPORT_ZONE: fieldBuilder.buildEdmTypeField('TransportZone', 'Edm.String', false),
                /**
                 * Static representation of the {@link unloadingPointName} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                UNLOADING_POINT_NAME: fieldBuilder.buildEdmTypeField('UnloadingPointName', 'Edm.String', true),
                /**
                 * Static representation of the {@link vatRegistration} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                VAT_REGISTRATION: fieldBuilder.buildEdmTypeField('VATRegistration', 'Edm.String', true),
                /**
                 * Static representation of the {@link sdDocPartnerAddrIsDocSpecific} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SD_DOC_PARTNER_ADDR_IS_DOC_SPECIFIC: fieldBuilder.buildEdmTypeField('SDDocPartnerAddrIsDocSpecific', 'Edm.Boolean', false),
                /**
                 * Static representation of the {@link sapMessages} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                SAP_MESSAGES: fieldBuilder.buildCollectionField('SAP__Messages', Sap_Message_1.Sap_Message, false),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v4_1.AllFields('*', SalesOrderPartner_1.SalesOrderPartner)
            };
        }
        return this._schema;
    }
}
exports.SalesOrderPartnerApi = SalesOrderPartnerApi;
