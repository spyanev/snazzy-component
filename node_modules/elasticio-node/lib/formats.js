var moment = require('moment');
var accounting = require('accounting');


const DATE_TIME_FORMAT = "YYYY-MM-DDTHH:mm:ssZ";

exports.toDateTime = function (value, formats) {
    return moment(value, formats).format(DATE_TIME_FORMAT);
};

exports.toTargetDateTime = function (value, format) {
    return moment(value, DATE_TIME_FORMAT).format(format);
};

exports.utc = function (date) {
    return moment(date, DATE_TIME_FORMAT).utc();
};

/**
 * This method converts money string to number, e.g. "1.234,56 €" to 1234.56
 * as well as "$ 1,234.56" to same value as above
 *
 * WARNING: Works only well for money where we have at max 100 cent in € or $
 *
 * @param string
 */
exports.moneyToNumber = function (string, decimal) {
    // This regexp will match a string that starts
    // with 0, 1 or 2 numbers followed by any number of non-number chars
    var expr = /^[0-9]{0,2}[^0-9]*$/;
    var expr2 = /^[0-9]{3}[^0-9]*$/;
    if (!string || !string.length) {
        return string;
    }
    if (string.length == 0) {
        return undefined;
    }
    if (!decimal) {
        // First we need to decide what's the decimal separator
        // as we don't have an access to encoding or locales
        // and it's not set
        var lastComma = string.lastIndexOf(',');
        var lastPoint = string.lastIndexOf('.');
        if (lastComma > 0 && lastPoint > 0) {
            // if we have both, then the last wins
            if (lastComma > lastPoint) {
                decimal = ','
            } else {
                decimal = '.'
            }
        } else {
            if (lastComma >= 0 && expr.test(string.substr(lastComma + 1))) {
                decimal = ',';
            } else if (lastPoint >= 0 && expr.test(string.substr(lastPoint + 1))) {
                decimal = '.'
            } else if (lastPoint >= 0 && expr2.test(string.substr(lastPoint + 1))) {
                decimal = ',';
            }
        }
    }
    return accounting.unformat(string, decimal);
};