import DS from 'ember-data';
import Ember from 'ember';
import _camelCase from 'lodash/string/camelCase';

export default DS.Model.extend({

  // Attributes
  name: DS.attr('string'),
  description: DS.attr('string'),
  slug: DS.attr('string'),
  total_on_hand: DS.attr('number'),
  available: DS.attr('boolean'),

  // Breadcrumbs
  breadcrumbs: DS.attr(),

  // Price Attributes
  price: DS.attr('string'),
  // rawPrice: DS.attr('number'),
  costPrice: DS.attr('string'),
  // rawCostPrice: DS.attr('number'),
  discountPrice: DS.attr('string'),
  // rawDiscountPrice: DS.attr('number'),

  // Installments Attributes
  hasInstallments: DS.attr("boolean"),
  installments: DS.attr("string"),
  installmentValue: DS.attr('string'),
  // rawInstallmentValue: DS.attr('number'),

  // Relationships
  images: DS.hasMany('image'),
  variantsIncludingMaster: DS.hasMany('variant'),
  productProperties: DS.hasMany('productProperty'),
  taxons: DS.hasMany('taxon'),

  //
  metaDescription: DS.attr('string'),
  metaKeywords: DS.attr('string'),
  metaTitle: DS.attr('string'),

  //Computed
  variants: Ember.computed('variantsIncludingMaster', function() {
    return this.get('variantsIncludingMaster').rejectBy('isMaster');
  }),

  master: Ember.computed('variantsIncludingMaster', function() {
    return this.get('variantsIncludingMaster').findBy('isMaster');
  }),

  image: Ember.computed('images', function() {
    let imgs = this.get('images');
    return imgs.findBy('position', 1) || imgs.findBy('position', 0);
  }),

  myTaxons: Ember.computed(function() {
    let taxons = {};

    this.get("taxons").forEach((taxon) => {
      let propertyName = _camelCase(taxon.get("taxonomy.name"));
      let isParent = !taxon.get("parentId");

      if(!propertyName && isParent)
        return

      taxons[propertyName] = taxon
    });

    return taxons;
  })
});
