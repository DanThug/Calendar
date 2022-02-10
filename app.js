const previousMonthButton = document.querySelector('[data-js="previous-month"]');
const nextMonthButton = document.querySelector('[data-js="next-month"]');
const calendar = document.querySelector('[data-days=""]');

const months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'Octber',
    11: 'November',
    12: 'December'
};

const weekDays = {
    1: 'Sun',
    2: 'Mon',
    3: 'Tue',
    4: 'Wed',
    5: 'Thu',
    6: 'Fri',
    7: 'Sat',
};

const date = new Date();
const today = date.getDate();
const dayOfWeek = date.getDay() + 1;
const month = date.getMonth();
const year = date.getFullYear();

let currentMonth = month + 1;
let currentYear = year;

const getFirstDayOfTheMonth = (year, month) => new Date(year, month).getDay();
const getLastDayOfTheMonth = (year, month) => new Date(year, month, 0).getDate();
const getRange = lastDay => new Array(lastDay + 1).keys();
const getDaysOfTheMonth = lastDay => [...getRange(lastDay)].slice(1);

const getCalendarDays = () => {
    const divsDays = 42;
    const lastDayOfThePreviousMonth = getLastDayOfTheMonth(currentYear, (currentMonth - 1));
    const lastDayOfTheCurrentMonth = getLastDayOfTheMonth(currentYear, currentMonth);
    const lastDayOfTheNextMonth = getLastDayOfTheMonth(currentYear, (currentMonth + 1));
    const firstDayOfTheMonth = getFirstDayOfTheMonth(currentYear, currentMonth - 1);

    const previousDays = getDaysOfTheMonth(lastDayOfThePreviousMonth)
        .slice(lastDayOfThePreviousMonth - firstDayOfTheMonth)
        .map(day => `<div>${day}</div>`);

    const currentDays = getDaysOfTheMonth(lastDayOfTheCurrentMonth)
        .map(day => `<div data-day="${day}" class="active">${day}</div>`);

    const nextDays = getDaysOfTheMonth(lastDayOfTheNextMonth)
        .slice(0, divsDays - (previousDays.length + currentDays.length))
        .map(day => `<div>${day}</div>`);

    return [...previousDays, ...currentDays, ...nextDays].join('');
}

const getMonthName = currentMonth => months[currentMonth];

const formatCalendar = () => {

}

const setDateOnCalendar = () => {
    const monthName = getMonthName(currentMonth);

    document.querySelector('[data-js="month-year"]').textContent = `${monthName} ${currentYear}`;
    document.querySelector('[data-js="date"]').textContent =
        `${weekDays[dayOfWeek]} ${today} ${months[month + 1].slice(0, 3)} ${year}`;

    calendar.textContent = '';
    calendar.insertAdjacentHTML('afterbegin', getCalendarDays());
}

const setToday = () => {
    document.querySelector(`[data-day="${today}"]`).classList.add('today');
}

setDateOnCalendar();
setToday();

previousMonthButton.addEventListener('click', () => {
    const monthNumber = currentMonth === 1 ? 12 : currentMonth - 1;
    currentMonth = monthNumber;

    if (monthNumber === 12) {
        currentYear--
    }
    
    setDateOnCalendar();
});
nextMonthButton.addEventListener('click', () => {
    const monthNumber = currentMonth === 12 ? 1 : currentMonth + 1;
    currentMonth = monthNumber;

    if (monthNumber === 1) {
        currentYear++
    }

    setDateOnCalendar();
});