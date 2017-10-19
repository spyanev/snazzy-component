describe('ObjectUtilities', function () {

    var objectUtilities = require('../lib/ObjectUtilities.js');

    var obj = {
        "field1": "value1", // string
        "field2": 123456, // number
        "field2-1": null, // null
        "field2-2": undefined, // undefined
        "field2-3": 5.6, // float
        "field3": { // object
            "field4": "value2",
            "field5": 654321,
            "field6": {
                "field7": "value3",
                "field8": 987654, // array
                "field9": [{
                    "id": 1,
                    "name": "Jim", // array in array
                    "books": [
                        {"title": "Adventures of James Bond"},
                        {"title": "Adventures of Huckleberry Finn"},
                        null, 0, false] // null, 0, false in array
                },{
                    "id": 2,
                    "name": "Bim",
                    "books": [
                        undefined, // undefined in array
                        {"title": "Adventures of James Bond"},
                        {"title": "Adventures of Huckleberry Finn"}
                    ]
                }]
            }
        }
    };

    var flattened = {
        "field1": "value1",
        "field2": 123456,
        "field2-1": null,
        "field2-2": undefined,
        "field2-3": 5.6,

        "field3.field4": "value2",
        "field3.field5": 654321,
        "field3.field6.field7": "value3",
        "field3.field6.field8": 987654,

        "field3.field6.field9[0].id": 1,
        "field3.field6.field9[0].name": "Jim",

        "field3.field6.field9[0].books[0].title": "Adventures of James Bond",
        "field3.field6.field9[0].books[1].title": "Adventures of Huckleberry Finn",
        "field3.field6.field9[0].books[2]": null,
        "field3.field6.field9[0].books[3]": 0,
        "field3.field6.field9[0].books[4]": false,

        "field3.field6.field9[1].id": 2,
        "field3.field6.field9[1].name": "Bim",

        "field3.field6.field9[1].books[0]": undefined,
        "field3.field6.field9[1].books[1].title": "Adventures of James Bond",
        "field3.field6.field9[1].books[2].title": "Adventures of Huckleberry Finn"
    };

    describe('getPath', function () {
        it('should not create object if it not exists and return reference', function () {
            var obj = {};
            var result = objectUtilities.getRefWithPath(obj, 'test.path.ref');
            expect(obj.test).toBeUndefined();
            expect(result).toEqual(null);
        });

        it('should return reference if it exists', function () {
            var obj = {
                test: {
                    path: {
                        ref: {
                            some: 1
                        }
                    }
                }
            };
            var result = objectUtilities.getRefWithPath(obj, 'test.path.ref');
            expect(result.some).toEqual(1);
        });
    });

    it('Flatten', function () {
        var result = objectUtilities.flatten(obj);
        expect(result).toEqual(flattened);
    });

    it('Unflatten', function () {
        var result = objectUtilities.unflatten(flattened);
        expect(result).toEqual(obj);
    });

    describe('removeEmptyValues', function () {

        it('remove empty string value', function () {
            var input = {"param1": '', "param2": 2};
            var output = {"param2": 2};

            var result = objectUtilities.removeEmptyValues(input);
            expect(result).toEqual(output);
        });

        it('remove null value', function () {
            var input = {"param1": null, "param2": 2};
            var output = {"param2": 2};

            var result = objectUtilities.removeEmptyValues(input);
            expect(result).toEqual(output);
        });

        it('remove object in which empty string', function () {
            var input = {"param1": {"param3" : ''}, "param2": 2};
            var output = {"param2": 2};

            var result = objectUtilities.removeEmptyValues(input);
            expect(result).toEqual(output);
        });

    });
});