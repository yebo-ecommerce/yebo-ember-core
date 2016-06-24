import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  html: DS.attr('string'),
  image_url: DS.attr('string'),
  attachment_url: DS.attr('string'),
  status: DS.attr('string'),
  target: DS.attr('string'),
  url: DS.attr('string'),
  archive_at: DS.attr('string')
});
