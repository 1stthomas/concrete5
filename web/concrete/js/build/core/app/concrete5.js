var Concrete = (function (ConcreteEvent, $) {
    'use strict';

    var html = $('html');

    function getAttribute(attributes, key) {
        return attributes[key];
    }

    function setAttribute(attributes, key, value) {
        key += ''; // Make sure we always have a string.
        var get_method = 'get' + key.substr(0, 1).toUpperCase() + key.substr(1),
            set_method = 'set' + key.substr(0, 1).toUpperCase() + key.substr(1);
        if (typeof this[get_method] == 'undefined') {
            this[get_method] = _.partial(getAttribute, attributes, key);
        }
        if (typeof this[set_method] == 'undefined') {
            this[set_method] = _.partial(setAttribute, attributes, key);
        }

        attributes[key] = value;
        return value;
    }

    return {
        editMode: null,
        event: ConcreteEvent,

        /**
         * Create the getter / setter methods and attach them if they don't exist
         * @param  {Object} attributes Object containing the attributes to create getter/setters for.
         * @return {Boolean}           Success, always true.
         */
        createGetterSetters: function generateGetterSetters(attributes) {
            var obj = this;
            obj.getAttr = _.partial(getAttribute, attributes);
            obj.setAttr = _.partial(setAttribute, attributes);
            _(attributes).each(function (value, key) {
                obj.setAttr(key, value);
            });
            return true;
        },

        /**
         * Force a Refresh of the dom when we need to
         */
        forceRefresh: function forceRefresh() {
            html.hide(0, function(){
                $(this).show();
            });
        }

    };

}(ConcreteEvent, jQuery));
