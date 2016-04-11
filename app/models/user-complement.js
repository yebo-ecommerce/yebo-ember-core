import DS from 'ember-data';

export default DS.Model.extend({
  // Attributes
  firstName:        DS.attr('string', { persistToServer: true }),
  lastName:         DS.attr('string', { persistToServer: true }),
  address1:         DS.attr('string', { persistToServer: true }),
  address2:         DS.attr('string', { persistToServer: true }),
  city:             DS.attr('string', { persistToServer: true }),
  zipcode:          DS.attr('string', { persistToServer: true }),
  phone:            DS.attr('string', { persistToServer: true }),
  stateName:        DS.attr('string', { persistToServer: true }),
  alternativePhone: DS.attr('string', { persistToServer: true }),
  company:          DS.attr('string', { persistToServer: true }),
  neighborhood: DS.attr('string', { persistToServer: true }),
  streetNumber: DS.attr('string', { persistToServer: true }),
  dddPhone: DS.attr('string', { persistToServer: true }),
  fullName:         Ember.computed('firstName', 'lastName', function() {
    let fullName = this.firstName + ' ' + this.lastName;
    if(fullName)
      return fullName;
    else
      return ""
  }),
  // Relationships
  state:   DS.belongsTo('state', { persistToServer: true }),
  country: DS.belongsTo('country', { persistToServer: true })
});
