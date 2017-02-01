"use strict";
var moment = require("moment");
var Holidays = (function () {
    function Holidays() {
        /**
         *  Added performance with a cache and some perf improvements in the holiday func.
         *  holidays func now returns a date string based dictionary with holiday as value
        */
        this.cache = {};
        this.saturday_iswork = false;
        this.sunday_iswork = false;
        // this.test();
        // console.log('holidays', this.holidays(2016));
        // console.log('holidays in month', this.holidaysInMonth('2016', '05'));
        // console.log('addbusinessdays', moment('2017-05-01').format('YYYY-MM-DD'),
        //     this.addBusinessdays(moment('2017-05-01'), 21).format('YYYY-MM-DD'));
        // console.log('getnextworkday', this.getNextWorkingday(moment('2017-04-13')).format('YYYY-MM-DD'));
        // console.log('isweekend', this.isWeekend('2017-01-30'));
    }
    Holidays.prototype.easter = function (year) {
        // Algorithm from https://github.com/gunnar2k/holidays-norway
        year = +year;
        var a = year % 19;
        var b = Math.floor(year / 100);
        var c = year % 100;
        var d = Math.floor(b / 4);
        var e = b % 4;
        var f = Math.floor((b + 8) / 25);
        var g = Math.floor((b - f + 1) / 3);
        var h = (19 * a + b - d - g + 15) % 30;
        var i = Math.floor(c / 4);
        var k = c % 4;
        var l = (32 + 2 * e + 2 * i - h - k) % 7;
        var m = Math.floor((a + 11 * h + 22 * l) / 451);
        var n0 = (h + l + 7 * m + 114);
        var n = Math.floor(n0 / 31) - 1;
        var p = n0 % 31 + 1;
        return moment([year, n, p]);
    };
    Holidays.prototype.isString = function (str) {
        return typeof str === 'string';
    };
    Holidays.prototype.holidays = function (year) {
        year = +year;
        if (this.cache[year])
            return this.cache[year];
        var holidays = {};
        var easter = this.easter(year);
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
    };
    Holidays.prototype.holidaysInMonth = function (year, month) {
        month = +month - 1;
        var start = moment([year, month]).format('YYYY-MM');
        var end = moment([year, month]).add(1, 'month').format('YYYY-MM');
        var holidays = this.holidays(year);
        return Object.keys(holidays)
            .filter(function (key) { return key >= start && key <= end; })
            .reduce(function (pre, cur) {
            if (!pre)
                return {};
            pre[cur] = holidays[cur];
            return pre;
        }, {});
    };
    Holidays.prototype.addBusinessdays = function (start, days) {
        var _this = this;
        start = moment(start);
        // start = start.format('YYYY-MM-DD');
        days += Object.keys(this.holidays(start.year()))
            .filter(function (key) { return key >= moment(start).format('YYYY-MM-DD') && key <= moment(start).add(days, 'day').format('YYYY-MM-DD'); })
            .filter(function (key) { return !_this.isWeekend(key); })
            .length;
        var weeks_after_month_start = Math.floor(days / 5);
        var days_remaining = days % 5;
        var workdate = moment(start)
            .add(weeks_after_month_start, 'week')
            .add(days_remaining, 'day');
        // return this.getNextWorkingday(workdate);
        return workdate;
    };
    Holidays.prototype.getNextWorkingday = function (date) {
        date = moment(date);
        // console.log('getnextworkday', this.isWorkday(date));
        return this.isWorkday(date) ? date : this.getNextWorkingday(date.add(1, 'day'));
    };
    Holidays.prototype.isHoliday = function (date) {
        if (!this.isString(date)) {
            date = date.format('YYYY-MM-DD');
        }
        return this.holidays(date.substr(0, 4))[date];
    };
    Holidays.prototype.isWorkday = function (date) {
        if (!this.isString(date)) {
            date = date.format('YYYY-MM-DD');
        }
        return !(this.isHoliday(date) ||
            this.isWeekend(date));
    };
    Holidays.prototype.isWeekend = function (date) {
        var day = moment(date).day();
        return day === 6 && !this.saturday_iswork ||
            day === 0 && !this.sunday_iswork;
    };
    return Holidays;
}());
exports.Holidays = Holidays;
// module.exports = Holidays;
