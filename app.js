const previousMonthButton = document.querySelector('[data-js="previous-month"]');
const nextMonthButton = document.querySelector('[data-js="next-month"]');
const calendar = document.querySelector('[data-days=""]');
const switchLanguage = document.querySelector('#switch-language');
const week = document.querySelector('[data-js="week-days"]');

/* const months = {
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
}; */

const getMonths = language => {
    EN = {
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
    },
    PT = {
        1: 'Janeiro',
        2: 'Fevereiro',
        3: 'Março',
        4: 'Abril',
        5: 'Maio',
        6: 'Junho',
        7: 'Julho',
        8: 'Agosto',
        9: 'Setembro',
        10: 'Outubro',
        11: 'Novembro',
        12: 'Dezembro'
    }
    return language === 'EN' ? EN : PT;
};

const getWeekDays = language => {
    const weekDaysEN = {
        1: 'Sun',
        2: 'Mon',
        3: 'Tue',
        4: 'Wed',
        5: 'Thu',
        6: 'Fri',
        7: 'Sat',
    };

    const weekDaysPT = {
        1: 'Dom',
        2: 'Seg',
        3: 'Ter',
        4: 'Qua',
        5: 'Qui',
        6: 'Sex',
        7: 'Sab',
    };

    return language === 'EN' ? weekDaysEN : weekDaysPT;
}

const date = new Date();
const today = date.getDate();
const dayOfWeek = date.getDay() + 1;
const month = date.getMonth();
const year = date.getFullYear();

let currentMonth = month + 1;
let currentYear = year;
let language = 'EN';

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

const getMonthName = currentMonth => getMonths(language)[currentMonth];

const setWeekDays = () => {
    const weekDays = getWeekDays(language);
    const weekDaysOnCalendar = Object.values(weekDays).map(value => `<div>${value}</div>`).join('');
    week.textContent = '';
    week.insertAdjacentHTML('afterbegin', weekDaysOnCalendar);
}

const setDateOnCalendar = () => {
    const monthName = getMonthName(currentMonth);
    const weekDays = getWeekDays(language);
    const months = getMonths(language);

    document.querySelector('[data-js="month-year"]').textContent = `${monthName} ${currentYear}`;
    document.querySelector('[data-js="date"]').textContent =
        `${weekDays[dayOfWeek]} ${today} ${months[month + 1].slice(0, 3)} ${year}`;

    calendar.textContent = '';
    calendar.insertAdjacentHTML('afterbegin', getCalendarDays());
}

const setToday = () => {
    if ((month + 1) === currentMonth && year === currentYear) {
        document.querySelector(`[data-day="${today}"]`).classList.add('today');
    }
}

setWeekDays();
setDateOnCalendar();
setToday();

previousMonthButton.addEventListener('click', () => {
    const monthNumber = currentMonth === 1 ? 12 : currentMonth - 1;
    currentMonth = monthNumber;

    if (monthNumber === 12) {
        currentYear--
    }
    
    setDateOnCalendar();
    setToday();
});
nextMonthButton.addEventListener('click', () => {
    const monthNumber = currentMonth === 12 ? 1 : currentMonth + 1;
    currentMonth = monthNumber;

    if (monthNumber === 1) {
        currentYear++
    }

    setDateOnCalendar();
    setToday();
});

switchLanguage.addEventListener('click', e => {
    const check = e.target.checked ? 'PT' : 'EN';
    language = check;
    setWeekDays();
    setDateOnCalendar();
});