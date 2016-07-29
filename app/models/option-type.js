import DS from 'ember-data';

//TODO: TEST IT
export default DS.Model.extend({
  name: DS.attr('string'),
  presetation: DS.attr('string'),
  optionsValues: DS.hasMany('optionValue')
});
