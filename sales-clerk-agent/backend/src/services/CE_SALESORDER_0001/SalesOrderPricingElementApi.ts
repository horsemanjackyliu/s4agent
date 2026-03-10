/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SalesOrderPricingElement } from './SalesOrderPricingElement';
import { SalesOrderPricingElementRequestBuilder } from './SalesOrderPricingElementRequestBuilder';
import { SalesOrderApi } from './SalesOrderApi';
import { Sap_Message } from './Sap_Message';
import {
  CustomField,
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  CollectionField,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export class SalesOrderPricingElementApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<
  SalesOrderPricingElement<DeSerializersT>,
  DeSerializersT
> {
  public deSerializers: DeSerializersT;

  private constructor(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ) {
    this.deSerializers = deSerializers;
  }

  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  public static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ): SalesOrderPricingElementApi<DeSerializersT> {
    return new SalesOrderPricingElementApi(deSerializers);
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-one navigation property {@link salesOrder_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SALES_ORDER_1: OneToOneLink<
      SalesOrderPricingElement<DeSerializersT>,
      DeSerializersT,
      SalesOrderApi<DeSerializersT>
    >;
  };

  _addNavigationProperties(linkedApis: [SalesOrderApi<DeSerializersT>]): this {
    this.navigationPropertyFields = {
      SALES_ORDER_1: new OneToOneLink('_SalesOrder', this, linkedApis[0])
    };
    return this;
  }

  entityConstructor = SalesOrderPricingElement;

  requestBuilder(): SalesOrderPricingElementRequestBuilder<DeSerializersT> {
    return new SalesOrderPricingElementRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    SalesOrderPricingElement<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      SalesOrderPricingElement<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    SalesOrderPricingElement<DeSerializersT>,
    DeSerializersT,
    NullableT
  > {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  private _fieldBuilder?: FieldBuilder<
    typeof SalesOrderPricingElement,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        SalesOrderPricingElement,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    SALES_ORDER: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICING_PROCEDURE_STEP: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICING_PROCEDURE_COUNTER: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_TYPE: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PRICE_ELEMENT_DESCRIPTION: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_CALCULATION_TYPE: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_RATE_AMOUNT: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    CONDITION_CURRENCY: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_QUANTITY: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    CONDITION_BASE_QUANTITY: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    CONDITION_QUANTITY_SAP_UNIT: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_QUANTITY_ISO_UNIT: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_RATE_RATIO: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    CONDITION_RATE_RATIO_SAP_UNIT: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_RATE_RATIO_ISO_UNIT: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CONDITION_AMOUNT: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    CONDITION_BASE_AMOUNT: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    TRANSACTION_CURRENCY: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    CNDN_ROUNDING_OFF_DIFF_AMOUNT: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    CONDITION_INACTIVE_REASON: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CONDITION_CLASS: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CONDITION_CONTROL: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CONDITION_ORIGIN: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    CONDITION_IS_FOR_STATISTICS: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    CONDITION_IS_MANUALLY_CHANGED: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TAX_CODE: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    VARIANT_CONDITION: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    IS_GROUP_CONDITION: OrderableEdmTypeField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    SAP_MESSAGES: CollectionField<
      SalesOrderPricingElement<DeSerializers>,
      DeSerializersT,
      Sap_Message,
      false,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link salesOrder_1} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SALES_ORDER_1: OneToOneLink<
      SalesOrderPricingElement<DeSerializersT>,
      DeSerializersT,
      SalesOrderApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<SalesOrderPricingElement<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link salesOrder} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SALES_ORDER: fieldBuilder.buildEdmTypeField(
          'SalesOrder',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link pricingProcedureStep} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PRICING_PROCEDURE_STEP: fieldBuilder.buildEdmTypeField(
          'PricingProcedureStep',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link pricingProcedureCounter} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PRICING_PROCEDURE_COUNTER: fieldBuilder.buildEdmTypeField(
          'PricingProcedureCounter',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link conditionType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_TYPE: fieldBuilder.buildEdmTypeField(
          'ConditionType',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link priceElementDescription} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PRICE_ELEMENT_DESCRIPTION: fieldBuilder.buildEdmTypeField(
          'PriceElementDescription',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link conditionCalculationType} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_CALCULATION_TYPE: fieldBuilder.buildEdmTypeField(
          'ConditionCalculationType',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link conditionRateAmount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_RATE_AMOUNT: fieldBuilder.buildEdmTypeField(
          'ConditionRateAmount',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link conditionCurrency} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_CURRENCY: fieldBuilder.buildEdmTypeField(
          'ConditionCurrency',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link conditionQuantity} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_QUANTITY: fieldBuilder.buildEdmTypeField(
          'ConditionQuantity',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link conditionBaseQuantity} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_BASE_QUANTITY: fieldBuilder.buildEdmTypeField(
          'ConditionBaseQuantity',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link conditionQuantitySapUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_QUANTITY_SAP_UNIT: fieldBuilder.buildEdmTypeField(
          'ConditionQuantitySAPUnit',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link conditionQuantityIsoUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_QUANTITY_ISO_UNIT: fieldBuilder.buildEdmTypeField(
          'ConditionQuantityISOUnit',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link conditionRateRatio} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_RATE_RATIO: fieldBuilder.buildEdmTypeField(
          'ConditionRateRatio',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link conditionRateRatioSapUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_RATE_RATIO_SAP_UNIT: fieldBuilder.buildEdmTypeField(
          'ConditionRateRatioSAPUnit',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link conditionRateRatioIsoUnit} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_RATE_RATIO_ISO_UNIT: fieldBuilder.buildEdmTypeField(
          'ConditionRateRatioISOUnit',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link conditionAmount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_AMOUNT: fieldBuilder.buildEdmTypeField(
          'ConditionAmount',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link conditionBaseAmount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_BASE_AMOUNT: fieldBuilder.buildEdmTypeField(
          'ConditionBaseAmount',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link transactionCurrency} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TRANSACTION_CURRENCY: fieldBuilder.buildEdmTypeField(
          'TransactionCurrency',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link cndnRoundingOffDiffAmount} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CNDN_ROUNDING_OFF_DIFF_AMOUNT: fieldBuilder.buildEdmTypeField(
          'CndnRoundingOffDiffAmount',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link conditionInactiveReason} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_INACTIVE_REASON: fieldBuilder.buildEdmTypeField(
          'ConditionInactiveReason',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link conditionClass} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_CLASS: fieldBuilder.buildEdmTypeField(
          'ConditionClass',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link conditionControl} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_CONTROL: fieldBuilder.buildEdmTypeField(
          'ConditionControl',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link conditionOrigin} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_ORIGIN: fieldBuilder.buildEdmTypeField(
          'ConditionOrigin',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link conditionIsForStatistics} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_IS_FOR_STATISTICS: fieldBuilder.buildEdmTypeField(
          'ConditionIsForStatistics',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link conditionIsManuallyChanged} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONDITION_IS_MANUALLY_CHANGED: fieldBuilder.buildEdmTypeField(
          'ConditionIsManuallyChanged',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link taxCode} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_CODE: fieldBuilder.buildEdmTypeField('TaxCode', 'Edm.String', true),
        /**
         * Static representation of the {@link variantCondition} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VARIANT_CONDITION: fieldBuilder.buildEdmTypeField(
          'VariantCondition',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link isGroupCondition} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_GROUP_CONDITION: fieldBuilder.buildEdmTypeField(
          'IsGroupCondition',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link sapMessages} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SAP_MESSAGES: fieldBuilder.buildCollectionField(
          'SAP__Messages',
          Sap_Message,
          false
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', SalesOrderPricingElement)
      };
    }

    return this._schema;
  }
}
