/* Validators */

module.exports = {
    custom: function(value, arg, options) {
        if (typeof arg === 'function') {
            return arg(value, options);
        }
    },

    //Isn't empty
    empty: function(value) {
        if (isEmpty(value)) {
            return "Can't be blank";
        }
    },
    presence: 'empty',
    required: 'empty',

    //Equality
    equal: function(value, arg, options) {
        // var errorEmpty = this.empty(value);
        //
        // if (options.allowEmpty && errorEmpty) {
        //     return errorEmpty;
        // }
        //
        // if (!errorEmpty && !deepEqual(value, arg, options.strict)) {
        //     return 'must be equal %{arg}';
        // }

        if (!isEmpty(value) && !deepEqual(value, arg, options.strict)) {
            return 'Must be equal %{arg}';
        }
    },

    confirm: function(value, options) {
        if (!isEmpty(value) && isPlainObject(value) && !deepEqual(value[options.key], value[options.comparedKey], options.strict)) {
            return '%{option} must be equal %{comparedOption}';
        }
    },

    // confirm1: function(value, comparedKey, options, context, allObject, path) {
    //    
    //     if (context) {
    //         if (value !== context[comparedKey]) {
    //             return 'invalid';
    //         }
    //
    //         'abc'
    //         '$.abc'
    //     }
    //   
    //
    //     var object = {
    //         a: {
    //             b: {
    //                 c: 1
    //             }
    //         },
    //         c: 1
    //     };
    //
    //
    //     1, { comparedKey: 'a.b.c' }, object, object, ['c']
    //     1, { comparedKey: 'a.b.c' }, 'c', object, globalOptions
    //
    //
    //
    //
    //     validate.single("foo@bar.com", {email: {strict: true}});
    //     validate.single("foo@bar.com", {presence: true});
    //
    //
    //     options = {
    //         key: 'c',
    //         comparedKey: 'a.b.c'
    //     };
    //
    //     if (!isEmpty(value) && isPlainObject(value) && !deepEqual(value[options.key], value[options.comparedKey], options.strict)) {
    //         return '%{option} must be equal %{comparedOption}';
    //     }
    // },

    //Types
    object: function(value) {
        if (!isPlainObject(value)) {
            return 'Must be an object'
        }
    },

    array: function(value) {
        if (!isArray(value)) {
            return 'Must be an array'
        }
    },

    number: function(value) {
        if (!isNumber(value)) {
            return 'Must be a number';
        }
    },

    integer: function(value) {
        if (!isInteger(value)) {
            return 'Must be an integer';
        }
    },

    string: function(value) {
        if (!isString(value)) {
            return 'Must be a string';
        }
    },

    date: function(value) {
        if (!isDateTime(value)) {
            return 'Must be a valid date';
        }
    },

    boolean: function(value) {
        if (!isBoolean(value)) {
            return 'Must be a boolean';
        }
    },

    null: function(value) {
        if (value !== null) {
            return 'Must be a null';
        }
    },

    //Number
    max: function(value, arg, options) {
        var inclusive = options.inclusive || options.inclusive === undefined;
        // var errorEmpty = this.empty(value);
        // var errorType = this.number(value);
        //
        // if (!options.allowEmpty && errorEmpty) {
        //     return errorEmpty;
        // }
        //
        // if (!options.allowIncorrectType && errorType) {
        //     return errorType;
        // }
        //
        // if (!errorType && !errorEmpty && value > arg) {
        //     return 'is too large (maximum is %{arg})';
        // }

        if (isNumber(value) && !isEmpty(value) && (inclusive ? value > arg : value >= arg)) {
            return 'Is too large (maximum is %{arg})';
        }
    },

    min: function(value, arg, options) {
        var inclusive = options.inclusive || options.inclusive === undefined;

        if (isNumber(value) && !isEmpty(value) && (inclusive ? value < arg : value <= arg)) {
            return 'Is too small (minimum is %{arg})';
        }
    },

    range: function(value, options) {
        var inclusive     = options.inclusive || options.inclusive === undefined;
        var fromInclusive = (options.fromInclusive || options.fromInclusive === undefined) && inclusive;
        var toInclusive   = (options.toInclusive || options.toInclusive === undefined) && inclusive;
        
        if (isNumber(value) && !isEmpty(value)) {
            if (fromInclusive ? value < options.from : value <= options.from) {
                return {
                    error: 'range.less',
                    message: options.lessMessage || 'Is too less (should be from %{from} to %{to})'
                }
            } else if (toInclusive ? value > options.to : value >= options.to) {
                return {
                    error: 'range.many',
                    message: options.manyMessage || 'Is too many (should be from %{from} to %{to})'
                }
            }
        }
    },
    in: 'range',

    odd: function(value) {
        if (isNumber(value) && !isEmpty(value) && value % 2 !== 1) {
            return 'Must be odd';
        }
    },

    even: function(value) {
        if (isNumber(value) && !isEmpty(value) && value % 2 !== 0) {
            return 'Must be even';
        }
    },

    divisible: function(value, arg) {
        if (isNumber(value) && !isEmpty(value) && value % arg !== 0) {
            return 'Must be divisible by %{arg}';
        }
    },

    // minWords: function () {
    //     if ((isString(value) && !isEmpty(value) && value.length > arg) {
    //         return 'Is too long (maximum is %{arg})';
    //     }
    // },
    

    stringOrArray: function(value) {
        if (!isString(value) && !isArray(value)) {
            return 'Must be a string or an array';
        }
    },

    //Length
    minLengthStrict: ['required', 'stringOrArray', {validator: 'custom', options: {}}, function(value, arg) {
        if (value.length < arg) {
            // return 'is too short (minimum is %{arg})';
            return {
                error: 'aaadddd',
                message: 'ololo'
            };
        }
    }],

    maxLength: function(value, arg) {
        if ((isString(value) || isArray(value)) && !isEmpty(value) && value.length > arg) {
            return 'Is too long (maximum is %{arg})';
        }
    },

    minLength: function(value, arg) {
        if ((isString(value) || isArray(value)) && !isEmpty(value) && value.length < arg) {
            return 'Is too short (minimum is %{arg})';
        }
    },

    equalLength: function(value, arg) {
        if ((isString(value) || isArray(value)) && !isEmpty(value) && value.length === arg) {
            return 'Has an incorrect length (must be equal %{arg})';
        }
    },

    rangeLength: function(value, options) {
        if ((isString(value) || isArray(value)) && !isEmpty(value)) {
            if (value > options.to) {
                return {
                    error: 'rangeLength.many',
                    message: options.manyMessage || 'Is too long (should be from %{from} to %{to})'
                }

            } else if (value < options.from) {
                return {
                    error: 'rangeLength.less',
                    message: options.lessMessage || 'Is too short (should be from %{from} to %{to})'
                }
            }

        }
    },
    inLengths: 'rangeLength',

    //RegExp
    pattern: function(value, arg) {
        if (isString(value) && !isEmpty(value) && !(new RegExp(arg)).test(value)) {
            return 'Does not match the pattern %{arg}';
        }
    },
    format: 'pattern',

    //White and black list
    inclusion: function(value, arg) {
        if (!isEmpty(value) && !contains(arg, value)) {
            return '%{value} is not allowed';
        }
    },

    exclusion: function(value, arg) {
        if (!isEmpty(value) && contains(arg, value, true)) {
            return '%{value} is restricted';
        }
    },

    //Date and time
    maxDateTime: function(value, arg) {
        if (isDateTime(value)) {
            const dateTime = new Date(value);
            const comparedDateTime = new Date(arg);

            if (dateTime > comparedDateTime) {
                return 'Must be earlier than %{arg}';
            }
        }
    },

    maxDate: function(value, arg) {
        if (isDateTime(value)) {
            const dateTime = new Date(value);
            const comparedDateTime = new Date(arg);
            const date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

            if (date > comparedDateTime) {
                return 'Must be earlier than %{arg}';
            }
        }
    },

    minDateTime: function(value, arg) {
        if (isDateTime(value)) {
            const dateTime = new Date(value);
            const comparedDateTime = new Date(arg);

            if (dateTime < comparedDateTime) {
                return 'Must be no earlier than %{arg}';
            }
        }
    },

    minDate: function(value, arg) {
        if (isDateTime(value)) {
            const dateTime = new Date(value);
            const comparedDateTime = new Date(arg);
            const date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

            if (date < comparedDateTime) {
                return 'Must be no earlier than %{arg}';
            }
        }
    },

    equalDateTime: function(value, arg) {
        if (isDateTime(value)) {
            const dateTime = new Date(value);
            const comparedDateTime = new Date(arg);

            if (dateTime === comparedDateTime) {
                return 'Must be equal %{arg}';
            }
        }
    },

    equalDate: function(value, arg) {
        if (isDateTime(value)) {
            const dateTime = new Date(value);
            const comparedDateTime = new Date(arg);
            const date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

            if (date === comparedDateTime) {
                return 'Must be equal %{arg}';
            }
        }
    },

    rangeDateTime: function(value, options) {
        if (isDateTime(value)) {
            const dateTime = new Date(value);
            const fromDateTime = new Date(options.from);
            const toDateTime = new Date(options.to);

            if (dateTime > toDateTime) {
                return {
                    error: 'rangeDateTime.many',
                    message: options.manyMessage || 'Is too late (must be from ' + fromDateTime.toString() + ' to ' + toDateTime.toString() + ')'
                }

            } else if (dateTime < fromDateTime) {
                return {
                    error: 'rangeDateTime.less',
                    message: options.lessMessage || 'Is too early (must be from ' + fromDateTime.toString() + ' to ' + toDateTime.toString() + ')'
                }
            }
        }
    },
    inDateTimes: 'rangeDateTime',

    rangeDate: function(value, options) {
        if (isDateTime(value)) {
            const dateTime = new Date(value);
            const fromDateTime = new Date(options.from);
            const toDateTime = new Date(options.to);
            const date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

            if (date > toDateTime) {
                return {
                    error: 'rangeDate.many',
                    message: options.manyMessage || 'Is too late (must be from ' + fromDateTime.toDateString() + ' to ' + toDateTime.toDateString() + ')'
                }

            } else if (date < fromDateTime) {
                return {
                    error: 'rangeDate.less',
                    message: options.lessMessage || 'Is too early (must be from ' + fromDateTime.toDateString() + ' to ' + toDateTime.toDateString() + ')'
                }
            }
        }
    },
    inDates: 'rangeDate',

    //Web
    email: function(value) {
        var PATTERN = /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

        if (isString(value) && !isEmpty(value) && !PATTERN.exec(value)) {
            return 'is not a valid email';
        }
    },

    // A URL validator that is used to validate URLs with the ability to
    // restrict schemes and some domains.
    url: function(value, options) {
        if (isString(value) && !isEmpty(value)) {
            var schemes = options.schemes || ['http', 'https'];

            // https://gist.github.com/dperini/729294
            var regex =
                '^' +
                // schemes
                '(?:(?:' + schemes.join('|') + '):\\/\\/)' +
                // credentials
                '(?:\\S+(?::\\S*)?@)?';

            regex += '(?:';

            var tld = '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))';

            // This ia a special case for the localhost hostname
            if (options.allowLocal) {
                tld += '?';
            } else {
                // private & local addresses
                regex +=
                    '(?!10(?:\\.\\d{1,3}){3})' +
                    '(?!127(?:\\.\\d{1,3}){3})' +
                    '(?!169\\.254(?:\\.\\d{1,3}){2})' +
                    '(?!192\\.168(?:\\.\\d{1,3}){2})' +
                    '(?!172' +
                    '\\.(?:1[6-9]|2\\d|3[0-1])' +
                    '(?:\\.\\d{1,3})' +
                    '{2})';
            }

            var hostname =
                '(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)' +
                '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*' +
                tld + ')';

            // reserved addresses
            regex +=
                '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
                '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
                '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
                '|' +
                hostname +
                // port number
                '(?::\\d{2,5})?' +
                // path
                '(?:\\/[^\\s]*)?' +
                '$';

            var PATTERN = new RegExp(regex, 'i');

            if (!PATTERN.exec(value)) {
                return 'is not a valid url';
            }
        }
    },

    ipAddress: function(value, options) {
        if (isString(value) && !isEmpty(value)) {
            // var IPV4_REGEXP = /^\s*((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\s*$/;
            // var IPV6_REGEXP = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
            // var HOSTNAME_REGEXP = /^\s*((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*\.?)\s*$/; //RFC_1123

            var IPV4_REGEXP = /^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$/;
            var IPV6_REGEXP = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
            var HOSTNAME_REGEXP = /^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$/;

            var regExps = {ipv4: IPV4_REGEXP, ipv6: IPV6_REGEXP, hostname: HOSTNAME_REGEXP};

            var isError = !Object.keys(regExps).some(key => {
                if (options[key] || options[key] === undefined) {
                    return regExps[key].test(value);
                }
            });

            var ipv4 = options.ipv4;
            var ipv6 = options.ipv6;
            var hostname = options.hostname;

            if (isError) {
                if (ipv4 && !ipv6 && !hostname) {
                    return {
                        error: 'ip.v4',
                        message: options.ipv4Message || 'Invalid IPv4 address'
                    }
                }

                if (ipv6 && !ipv4 && !hostname) {
                    return {
                        error: 'ip.v6',
                        message: options.ipv6Message || 'Invalid IPv6 address'
                    }
                }

                if (hostname && !ipv4 && !ipv6) {
                    return {
                        error: 'ip.hostname',
                        message: options.hostnameMessage || 'Invalid hostname'
                    }
                }

                if (ipv6 && ipv4 && !hostname) {
                    return {
                        error: 'ip.address',
                        message: options.addressMessage || 'Invalid IP address'
                    }
                }

                return 'Ivalid IP address or hostname';
            }
        }
    },

    //File
    accept(files, arg, options) {
        files = options.files || files;

        if (isFileList(files) || isArray(files)) {
            const filesList = toArray(files);
            const allowedTypes = (arg || '').split(',').map(type => type.trim().replace('*', ''));
            const isError = allowedTypes.every(type => {
                if (type[0] === '.') {
                    //extension
                    return filesList.map(file => (file.name || '').split('.').pop()).some(ext => !ext || ('.' + ext).toLowerCase() !== type);

                } else {
                    //mime type
                    return filesList.some(file => (file.type || '').indexOf(type) === -1);
                }
            });

            if (isError) {
                return 'Incorrect type of file (allowed %{arg})';
            }
        }
    },
    
    minFileSize(files, arg, options) {
        files = options.files || files;

        if ((isFileList(files) || isArray(files)) && toArray(files).some(file => file.size < arg)) {
            return 'File size is too small (minimum is %{arg})';
        }
    },

    maxFileSize(files, arg, options) {
        files = options.files || files;

        if ((isFileList(files) || isArray(files)) && toArray(files).some(file => file.size > arg)) {
            return 'File size is too large (maximum is %{arg})';
        }
    },

    minFileSizeAll(files, arg, options) {
        files = options.files || files;

        if ((isFileList(files) || isArray(files)) && toArray(files).reduce((prev, curr) => (prev.size || prev) + curr.size) < arg) {
            return 'Files size is too small (minimum is %{arg})';
        }
    },

    maxFileSizeAll(files, arg, options) {
        files = options.files || files;

        if ((isFileList(files) || isArray(files)) && toArray(files).reduce((prev, curr) => (prev.size || prev) + curr.size) > arg) {
            return 'Files size is too large (maximum is %{arg})';
        }
    }
};


/* Utils */

// Checks if the value is a number. This function does not consider NaN a
// number like many other `isNumber` functions do.
function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

// Returns false if the object is not a function
function isFunction(value) {
    return typeof value === 'function';
}

// A simple check to verify that the value is an integer. Uses `isNumber`
// and a simple modulo check.
function isInteger(value) {
    return isNumber(value) && value % 1 === 0;
}

// Checks if the value is a boolean
function isBoolean(value) {
    return typeof value === 'boolean';
}

// Uses the `Object` function to check if the given argument is an object.
function isObject(obj) {
    return obj === Object(obj);
}

function isPlainObject(value) {
    return {}.toString.call(value) === '[object Object]';
}

function isArray(value) {
    return {}.toString.call(value) === '[object Array]';
}

function isFileList(value) {
    return {}.toString.call(value) === '[object FileList]';
}

// Simply checks if the object is an instance of a date
function isDate(obj) {
    return obj instanceof Date;
}

function isDateTime(value) {
    return !isNaN(Date.parse(value));
}


function isString(value) {
    return typeof value === 'string';
}

// Returns false if the object is `null` of `undefined`
function isDefined(obj) {
    return obj !== null && obj !== undefined;
}

function isEmpty(value) {
    var attr;

    // Null and undefined are empty
    if (!isDefined(value)) {
        return true;
    }

    // functions are non empty
    if (isFunction(value)) {
        return false;
    }

    // Whitespace only strings are empty
    if (isString(value)) {
        return /^\s*$/.test(value); //empty string test
    }

    // For arrays we use the length property
    if (isArray(value)) {
        return value.length === 0;
    }

    // Dates have no attributes but aren't empty
    if (isDate(value)) {
        return false;
    }

    // If we find at least one property we consider it non empty
    if (isObject(value)) {
        for (attr in value) {
            return false;
        }
        return true;
    }

    return false;
}

function contains(obj, value, some) {
    some = some ? 'some' : 'every';

    if (!isDefined(obj)) {
        return false;
    }
    if (isArray(value)) {
        return value[some](val => contains(obj, val))
    }
    if (isPlainObject(value)) {
        return Object.keys(value)[some](key => {
            if (isArray(obj)) {
                return obj.indexOf(key) !== -1;
            }
            return obj[key] === value[key];
        })
    }
    if (isArray(obj)) {
        return obj.indexOf(value) !== -1;
    }
    return value in obj;
}

function deepEqual(actual, expected, strict) {
    if (strict !== false) {
        strict = true;
    }

    if (actual === expected) {
        return true;

    } else if (actual instanceof Date && expected instanceof Date) {
        return actual.getTime() === expected.getTime();

    } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
        return strict ? actual === expected : actual == expected;

    } else {
        return objEqual(actual, expected, strict);
    }
}

function objEqual(a, b, strict) {
    var i, key;

    if (!isDefined(a) || !isDefined(b)) {
        return false;
    }

    if (a.prototype !== b.prototype) return false;

    try {
        var ka = Object.keys(a),
            kb = Object.keys(b);
    } catch (e) {//happens when one is a string literal and the other isn't
        return false;
    }

    if (ka.length !== kb.length)
        return false;

    ka.sort();
    kb.sort();

    //cheap key test
    for (i = ka.length - 1; i >= 0; i--) {
        if (ka[i] != kb[i])
            return false;
    }

    //possibly expensive deep test
    for (i = ka.length - 1; i >= 0; i--) {
        key = ka[i];
        if (!deepEqual(a[key], b[key], strict)) return false;
    }

    return typeof a === typeof b;
}

function toArray(obj) {
    return Array.prototype.slice.call(obj);
}