import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  sku: DS.attr('string'),
  weight: DS.attr('number'),
  height: DS.attr('number'),
  width: DS.attr('number'),
  depth: DS.attr('number'),
  isMaster: DS.attr('boolean'),
  slug: DS.attr('string'),
  description: DS.attr('string'),
  trackInventory: DS.attr('boolean'),
  optionsText: DS.attr('string'),
  images: DS.hasMany('image'),
  canSupply: DS.attr('boolean'),

  // Price Attributes
  price: DS.attr('string'),
  costPrice: DS.attr('string'),
  discountPrice: DS.attr('string'),

  // hasMany
  optionValues: DS.hasMany('optionValue'),
  optionTypes: DS.hasMany('optionType'),

  // Installments Attributes
  hasInstallments: DS.attr("boolean"),
  installments: DS.attr(),
  installment: Ember.computed('installments', function(){
    let installments = {}

    this.get("installments").forEach((installment) => {
      let propertyName = _camelCase(installment.name);
      let installmentsArray = _toArray(installment.installments);
      installments[propertyName] = { size: installmentsArray.length, value: installmentsArray.get("lastObject.display") }
    });

    return installments;
  }),
});
