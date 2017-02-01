import { Holidays } from './../moment.holiday';

describe('Test moment.holiday', () => {

    describe('test Norwegian holidays', () => {
        let h = new Holidays();

        describe('Testing func holidays()', () => {
            let holidays = h.holidays('2017');
            it('should be of length: 14', () => {
                expect(Object.keys(holidays).length).toEqual(14);
            });
            it('Should get: 17. mai', () => {
                expect(holidays['2017-05-17']).toEqual('17. mai');
            });
            it('Should get: Palmesøndag', () => {
                expect(holidays['2017-04-09']).toEqual('Palmesøndag');
            });
            it('Should get: Skjærtorsdag', () => {
                expect(holidays['2017-04-13']).toEqual('Skjærtorsdag');
            });
            it('Should get: Langfredag', () => {
                expect(holidays['2017-04-14']).toEqual('Langfredag');
            });
            it('Should get: 1. påskedag', () => {
                expect(holidays['2017-04-16']).toEqual('1. påskedag');
            });
            it('Should get: 2. påskedag', () => {
                expect(holidays['2017-04-17']).toEqual('2. påskedag');
            });
            it('Should get: Kristi Himmelsprettsdag', () => {
                expect(holidays['2017-05-25']).toEqual('Kristi Himmelsprettsdag');
            });
            it('Should get: 1. pinsedag', () => {
                expect(holidays['2017-06-04']).toEqual('1. pinsedag');
            });
            it('Should get: 2. pinsedag', () => {
                expect(holidays['2017-06-05']).toEqual('2. pinsedag');
            });
            it('Should get: 1. mai', () => {
                expect(holidays['2017-05-01']).toEqual('1. mai');
            });
            it('should be truty', () => {
                expect(holidays['2017-05-17']).toEqual('17. mai');
            });
            it('Should get: Nyttårsdag', () => {
                expect(holidays['2017-01-01']).toEqual('Nyttårsdag');
            });
            it('Should get: 1. juledag', () => {
                expect(holidays['2017-12-25']).toEqual('1. juledag');
            });
            it('Should get: 2. juledag', () => {
                expect(holidays['2017-12-26']).toEqual('2. juledag');
            });
            it('Should get: Nyttårsaften', () => {
                expect(holidays['2017-12-31']).toEqual('Nyttårsaften');
            });
        });
        describe('Testing func easter', () => {
            pending('implement at a later date');
        });
        describe('Testing func isWorkday', () => {
            pending('');
        });
        describe('Testing func isHoliday', () => {
            pending('');
        });
        describe('Testing func getNextWorkingday', () => {
            pending('');
        });
        describe('Testing func addBusinessdays', () => {
            pending('');
        });
        describe('Testing func holidaysInMonth', () => {
            pending('');
        });

    });


});
