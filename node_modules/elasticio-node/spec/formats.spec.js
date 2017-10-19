var parse = require('../lib/formats').moneyToNumber;
describe('formats.js', function () {
    var assertions = {
        '100' : 100,
        '12345' : 12345,
        '$12345' : 12345,
        '$ 12345' : 12345,
        '12345 €' : 12345,
        '12345, €' : 12345,
        '12345. €' : 12345,
        '12,3 €' : 12.3, // Germans are using commas as decimal separator
        '12,34 €' : 12.34, // Germans are using commas as decimal separator
        '1.234 €' : 1234, // Germans are using points as group separator
        '12.345, €' : 12345,
        '1.234,5 €' : 1234.5,
        '1.234,56 €' : 1234.56,
        '234,56 €' : 234.56,
        '$ 12.34' : 12.34,
        '$ 1,234' : 1234,
        '$ 1,234.5' : 1234.5,
        '$ 1,234.56' : 1234.56,
        '$ 234.56' : 234.56
    };
    Object.keys(assertions).forEach(function(str) {
        it('should be able to parse ' + str + ' correctly', function() {
            expect(parse(str)).toEqual(assertions[str]);
        });
    });

    it('should work with numbers too', function() {
        expect(parse(200)).toEqual(200);
    });

});