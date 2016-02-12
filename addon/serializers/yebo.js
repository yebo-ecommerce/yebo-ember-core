import Ember from 'ember';
import { ActiveModelSerializer } from 'active-model-adapter';

/**
  The Yebo Serializer is based on the `ActiveModelSerializer`, but implements
  a stricter `serialize` method.

  ```javascript
  var model = DS.Model.extend({
    firstname: DS.attr("string", { persistToServer: true }),
    lastname: DS.attr("string")
  });

  var hugh = model.create();

  hugh.setProperties({
    firstname: "Hugh",
    lastname: "Francis"
  });

  yeboSerializer.serialize(hugh);
  // => Results in payload:
  user: {
    first_name: "Hugh"
  }
  ```

  @class Yebo
  @namespace Serializer
  @module yebo-ember-core/serializers/yebo
  @extends ActiveModelSerializer
*/
export default ActiveModelSerializer.extend({
  /**
    Serializes a record for sending to the Yebo server.  Here, we extend the
    default behaviour of `ActiveModelSerializer#serialize` to ensure that we
    only persist attributes & relationships that have `persistToServer: true` in
    the model definition.  We also add the `id` to the payload, as we're often
    sending nested models to the server.

    @method serialize
    @param {DS.Model} record A model to serialize.
    @return {Object} A JSON object representing the record.
  */

  serialize: function(record, options) {
    var payload = this._super.apply(this, arguments);
    record.eachAttribute(function(name, meta) {
      if (!meta.options.persistToServer) {
        delete payload[Ember.String.underscore(name)];
      }
    }, this);
    record.eachRelationship(function(name, meta) {
      if (!meta.options.persistToServer) {
        if (meta.kind === "belongsTo") {
          delete payload[Ember.String.underscore(name)+"_id"];
        } else if (meta.kind === "hasMany") {
          delete payload[Ember.String.underscore(name)+"_ids"];
        }
      }
    }, this);
    payload.id = record.id;
    return payload;
  }
});
