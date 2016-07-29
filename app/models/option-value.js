import DS from 'ember-data';

//TODO: TEST IT
export default DS.Model.extend({
  name: DS.attr('string'),
  presetation: DS.attr('string'),
  color: DS.attr('string'),
  optionsTypes: DS.hasMany('optionValues')
});
