
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'Octber',
    'November',
    'December'
];
const date = new Date();
const today = date.getDate();
const dayOfWeek = date.getDay();
const month = date.getMonth();
const year = date.getFullYear();
const monthName = months[date.getMonth()];


const getFirstDayOfTheMonthInWeek = (year, month) => new Date(year, month, 1).getDay();
const getLastDayOfTheMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getRange = lastDay => new Array(lastDay + 1).keys();
const getDaysOfTheMonth = lastDay => [...getRange(lastDay)].slice(1);

const lastDayOfThePreviousMonth = getLastDayOfTheMonth(year, (month - 1));
const lastDayOfTheCurrentMonth = getLastDayOfTheMonth(year, month);
const lastDayOfTheNextMonth = getLastDayOfTheMonth(year, (month + 1));
const firstDayOfTheMonthInWeek = getFirstDayOfTheMonthInWeek(year, month)

const getCalendarDays = () => {
    const previousDays = getDaysOfTheMonth(lastDayOfThePreviousMonth)
        .slice(lastDayOfThePreviousMonth - firstDayOfTheMonthInWeek);

    const currentDays = getDaysOfTheMonth(lastDayOfTheCurrentMonth);

    const nextDays = getDaysOfTheMonth(lastDayOfTheNextMonth)
        .slice(0, 42 - (previousDays.length + currentDays.length));

    return [...previousDays, ...currentDays, ...nextDays]
        .map(day => `<div>${day}</div>`).join('');
}

const setDateOnCalendar = () => {
    document.querySelector('[data-js="month"]').textContent = monthName;
    document.querySelector('[data-js="date"]').textContent = `${today} ${monthName.slice(0, 3)} ${year}`;
    document.querySelector('[data-days=""]').insertAdjacentHTML('afterbegin', getCalendarDays());
}

setDateOnCalendar();