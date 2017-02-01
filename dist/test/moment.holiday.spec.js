"use strict";
var moment_holiday_1 = require("./../moment.holiday");
describe('Test moment.holiday', function () {
    describe('test Norwegian holidays', function () {
        var h = new moment_holiday_1.Holidays();
        var holidays = h.holidays('2017');
        describe('get holidays from holidays()', function () {
            it('should be of length: 14', function () {
                expect(Object.keys(holidays).length).toEqual(14);
            });
            it('Should get: 17. mai', function () {
                expect(holidays['2017-05-17']).toEqual('17. mai');
            });
            it('Should get: Palmesøndag', function () {
                expect(holidays['2017-04-09']).toEqual('Palmesøndag');
            });
            it('Should get: Skjærtorsdag', function () {
                expect(holidays['2017-04-13']).toEqual('Skjærtorsdag');
            });
            it('Should get: Langfredag', function () {
                expect(holidays['2017-04-14']).toEqual('Langfredag');
            });
            it('Should get: 1. påskedag', function () {
                expect(holidays['2017-04-16']).toEqual('1. påskedag');
            });
            it('Should get: 2. påskedag', function () {
                expect(holidays['2017-04-17']).toEqual('2. påskedag');
            });
            it('Should get: Kristi Himmelsprettsdag', function () {
                expect(holidays['2017-05-25']).toEqual('Kristi Himmelsprettsdag');
            });
            it('Should get: 1. pinsedag', function () {
                expect(holidays['2017-06-04']).toEqual('1. pinsedag');
            });
            it('Should get: 2. pinsedag', function () {
                expect(holidays['2017-06-05']).toEqual('2. pinsedag');
            });
            it('Should get: 1. mai', function () {
                expect(holidays['2017-05-01']).toEqual('1. mai');
            });
            it('should be truty', function () {
                expect(holidays['2017-05-17']).toEqual('17. mai');
            });
            it('Should get: Nyttårsdag', function () {
                expect(holidays['2017-01-01']).toEqual('Nyttårsdag');
            });
            it('Should get: 1. juledag', function () {
                expect(holidays['2017-12-25']).toEqual('1. juledag');
            });
            it('Should get: 2. juledag', function () {
                expect(holidays['2017-12-26']).toEqual('2. juledag');
            });
            it('Should get: Nyttårsaften', function () {
                expect(holidays['2017-12-31']).toEqual('Nyttårsaften');
            });
        });
    });
});
