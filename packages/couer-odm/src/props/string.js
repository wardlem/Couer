const bytes = require('bytes');
const R = require('ramda');
const pluralize = require('pluralize');

const Property = require('../Property');

module.exports = Property.extend({
    loaders: [
        (value, prop) => {
            if (R.isNil(value)) {
                return value;
            }

            if (R.is(Function, value.toString) && value.toString != Object.prototype.toString) {
                return value.toString();
            }

            return value;
        },
    ],
    meta: {
        'default': '',
        minlen: 0,
        maxlen: Infinity,
        allow: null,
        ban: [],
        match: null,
    },
    validators: [
        (value, prop) => {
            if (R.isNil(value) && prop.meta.optional) {
                return false;
            }

            if (!R.is(String, value)) {
                return ['type', 'must be a text value'];
            }

            let {minlen, maxlen} = prop.meta;

            if (R.is(String, minlen)) {
                minlen = bytes.parse(minlen);
            }
            if (R.is(String, maxlen)) {
                maxlen = bytes.parse(maxlen);
            }

            if (value.length < minlen) {
                return ['minlen', `length must be at least ${pluralize('character', prop.meta.minlen, true)} long`];
            }

            if (value.length > maxlen) {
                return ['maxlen', `length must be no more than ${pluralize('character', prop.meta.maxlen, true)} long`];
            }

            if (prop.meta.allow && !prop.meta.allow.includes(value)) {
                return ['allow', 'is not an allowed value'];
            }

            if (prop.meta.ban.includes(value)) {
                return ['ban', 'is not an allowed value'];
            }

            if (prop.meta.match && !(new RegExp(prop.meta.match).test(value))) {
                return ['match', 'does not match the required pattern'];
            }

            return false;
        },
    ],
}, {
    minlen(len) {
        return this.withMeta('minlen', len);
    },
    maxlen(len) {
        return this.withMeta('maxlen', len);
    },
    allow(values) {
        return this.withMeta('allow', (this.meta.allow || []).concat(values));
    },
    ban(values) {
        return this.withMeta('ban', this.meta.ban.concat(values));
    },
    match(regex) {
        return this.withMeta('match', regex);
    },
    formdef(key) {
        let base = Property.formdef.call(this, key);
        let type = 'text';
        let options = this.meta.allow;
        if (options) {
            type = 'select';
        } else if (this.meta.long) {
            type = 'longtext';
        }
        return Object.assign(base, {
            minlen: this.meta.minlen,
            maxlen: this.meta.maxlen,
            type,
            options,
        });

    },
});