import DS from 'ember-data';

const pad = (n) => {
  return (n < 10) ? ("0" + n) : n;
}

export default DS.Transform.extend({

  /**
    Return raw output.
    @method deserialize
  */
  deserialize: function(serialized) {
    let dt = new Date(serialized);

    let year = dt.getFullYear();
    let month = pad(dt.getMonth() + 1);
    let day = pad(dt.getDate());

    return [day, month, year].join('/');
  },

  /**
    Don't serialize raw input.
    @method serialize
  */
  serialize: function(deserialized) {
    return deserialized;
  }
});
