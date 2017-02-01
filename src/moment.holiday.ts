import * as moment from 'moment';

export class Holidays {

    /**
     *  Added performance with a cache and some perf improvements in the holiday func.
     *  holidays func now returns a date string based dictionary with holiday as value
    */

    cache: { [year: string]: { [date: string]: string } } = {};
    private saturday_iswork = false;
    private sunday_iswork = false;

    constructor() {
        // this.test();
        // console.log('holidays', this.holidays(2016));
        // console.log('holidays in month', this.holidaysInMonth('2016', '05'));
        // console.log('addbusinessdays', moment('2017-05-01').format('YYYY-MM-DD'),
        //     this.addBusinessdays(moment('2017-05-01'), 21).format('YYYY-MM-DD'));
        // console.log('getnextworkday', this.getNextWorkingday(moment('2017-04-13')).format('YYYY-MM-DD'));
        // console.log('isweekend', this.isWeekend('2017-01-30'));
    }

    private easter(year: number | string): moment.Moment {
        // Algorithm from https://github.com/gunnar2k/holidays-norway
        year = +year;
        let a = year % 19;
        let b = Math.floor(year / 100);
        let c = year % 100;
        let d = Math.floor(b / 4);
        let e = b % 4;
        let f = Math.floor((b + 8) / 25);
        let g = Math.floor((b - f + 1) / 3);
        let h = (19 * a + b - d - g + 15) % 30;
        let i = Math.floor(c / 4);
        let k = c % 4;
        let l = (32 + 2 * e + 2 * i - h - k) % 7;
        let m = Math.floor((a + 11 * h + 22 * l) / 451);
        let n0 = (h + l + 7 * m + 114);
        let n = Math.floor(n0 / 31) - 1;
        let p = n0 % 31 + 1;
        return moment([year, n, p]);
    }

    private isString(str: any): str is string {
        return typeof str === 'string';
    }

    holidays(year: string | number): { [date: string]: string } {
        year = +year;
        if (this.cache[year]) return this.cache[year];

        let holidays = {};
        let easter = this.easter(year);
        holidays[moment(easter).subtract(7, 'days').format('YYYY-MM-DD')] = 'Palmesøndag';
        holidays[moment(easter).subtract(3, 'days').format('YYYY-MM-DD')] = 'Skjærtorsdag';
        holidays[moment(easter).subtract(2, 'days').format('YYYY-MM-DD')] = 'Langfredag';
        holidays[moment(easter).format('YYYY-MM-DD')] = '1. påskedag';
        holidays[moment(easter).add(1, 'days').format('YYYY-MM-DD')] = '2. påskedag';
        holidays[moment(easter).add(39, 'days').format('YYYY-MM-DD')] = 'Kristi Himmelsprettsdag';
        holidays[moment(easter).add(49, 'days').format('YYYY-MM-DD')] = '1. pinsedag';
        holidays[moment(easter).add(50, 'days').format('YYYY-MM-DD')] = '2. pinsedag';

        holidays[moment([year]).startOf('year').format('YYYY-MM-DD')] = 'Nyttårsdag';
        holidays[moment([year, 4, 1]).format('YYYY-MM-DD')] = '1. mai';
        holidays[moment([year, 4, 17]).format('YYYY-MM-DD')] = '17. mai';
        holidays[moment([year, 11, 25]).format('YYYY-MM-DD')] = '1. juledag';
        holidays[moment([year, 11, 26]).format('YYYY-MM-DD')] = '2. juledag';
        holidays[moment().endOf('year').format('YYYY-MM-DD')] = 'Nyttårsaften';

        this.cache[year] = holidays;

        return holidays;
    }

    holidaysInMonth(year: number | string, month: number | string) {
        month = +month - 1;
        let start = moment([year, month]).format('YYYY-MM');
        let end = moment([year, month]).add(1, 'month').format('YYYY-MM');
        let holidays = this.holidays(year);
        return Object.keys(holidays)
            .filter(key => key >= start && key <= end)
            .reduce((pre, cur) => {
                if (!pre) return {};
                pre[cur] = holidays[cur];
                return pre;
            }, {});
    }

    addBusinessdays(start: string | moment.Moment, days: number): moment.Moment {
        start = moment(start);
        // start = start.format('YYYY-MM-DD');
        days += Object.keys(this.holidays(start.year()))
            .filter(key => key >= moment(start).format('YYYY-MM-DD') && key <= moment(start).add(days, 'day').format('YYYY-MM-DD'))
            .filter(key => !this.isWeekend(key))
            .length;
        let weeks_after_month_start = Math.floor(days / 5);
        let days_remaining = days % 5;

        let workdate = moment(start)
            .startOf('month')
            .add(weeks_after_month_start, 'week')
            .add(days_remaining, 'day');
        // return this.getNextWorkingday(workdate);
        return workdate;

    }

    getNextWorkingday(date: string | moment.Moment): moment.Moment {
        date = moment(date);
        // console.log('getnextworkday', this.isWorkday(date));

        return this.isWorkday(date) ? date : this.getNextWorkingday(date.add(1, 'day'));
    }

    isHoliday(date: string | moment.Moment): string | undefined {
        if (!this.isString(date)) {
            date = date.format('YYYY-MM-DD');
        }
        return this.holidays(date.substr(0, 4))[date];
    }

    isWorkday(date: string | moment.Moment): boolean {
        if (!this.isString(date)) {
            date = date.format('YYYY-MM-DD');
        }
        return !(
            this.isHoliday(date) ||
            this.isWeekend(date)
        );

    }
    isWeekend(date: string | moment.Moment): boolean {
        let day = moment(date).day();
        return day === 6 && !this.saturday_iswork ||
            day === 0 && !this.sunday_iswork;
    }

    // test(number_of_days = 100) {
    //     // improvement from 320 to 25ms on 1000 checks with cache
    //     console.log('testing testing');
    //     let start = moment();
    //     let end = moment().add(number_of_days, 'day');
    //     let timer = moment();
    //     for (; start < end; start.add(1, 'day')) {
    //         this.isHoliday(start.format('YYYY-MM-DD'));
    //     }
    //     console.log('completion time:', moment().diff(timer), 'ms');
    // }
}

// module.exports = Holidays;

