import Ember from 'ember';

/**
  Storable bolts onto an Ember Object and provides functionality for persisting
  key value pairs to Local Storage.

  @class Storable
  @namespace Mixin
  @extends Ember.Mixin
*/
export default Ember.Mixin.create({

  /**
    The Local Storage key we use to Restore and Persist data across browser
    refreshes.

    @property localStorageKey
    @type String
    @readOnly
    @default 'storable'
  */
  localStorageKey: 'storable',
  /**
    Persists an object to Local Storage.  Will overwrite existing values, and
    can be used to nullify an existing value.

    @example
    ```javascript
    this.yebo.persist({
      "favoriteColor": "red"
    });
    ```

    @method persist
    @param {Object} data A Javascript Object to persist to Local Storage.
    @return {Boolean} Will always resolve to `true`.

  */
  persist: function(data) {
    var key = this.get('localStorageKey');
    this._setOnHost(data);

    // Get existing data.  Don't set it on the host.
    var existingData = this._fetchLocalStorageData();
    var allData = Ember.merge(existingData, data);

    // Remove nullified values to avoid "null" strings.
    for (var dataKey in allData) {
      var value = allData[dataKey];
      if (!value) { delete allData[dataKey]; }
    }

    var stringifiedData = JSON.stringify(allData || {});
    localStorage.setItem(key, stringifiedData);
    return true;
  },

  /**
    Sets key value pairs on the Host object from Local Storage.  Usually called
    in intitalizers for Yebo Ember addons.

    @example
    ```javascript
    this.yebo.restore()
    ```

    @method restore
    @return {Boolean} Will always resolve to `true`.
  */
  restore: function() {
    return this._setOnHost(this._fetchLocalStorageData());
  },

  /**
    Sets key value pairs on the Host object.

    @method _setOnHost
    @private
    @param {Object} data A Javascript Object to set on the Ember Object.
    @return {Boolean} Will always resolve to `true`.
  */
  _setOnHost: function(data) {
    for (var key in data) {
      this.set(key, data[key]);
    }
    return true;
  },

  /**
    Returns a Parsed Object from the Local Storage Key.

    @method _fetchLocalStorageData
    @private
    @return {Object} An object of Key Value pairs from local storage.
  */
  _fetchLocalStorageData: function() {
    var data   = localStorage.getItem(this.get('localStorageKey'));
    var parsed = JSON.parse(data || "{}");
    return parsed;
  },
});
