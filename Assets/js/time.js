// This JS file will handle all the time-related DOM manipulation, including the header date, current weather date, and 5-day forecast. This is all done using moment.js


// HTML element variables
const headerDate = document.getElementById('header-date');
const fcstDayOneDate = document.getElementById('fcst-1-date')
const fcstDayTwoDate = document.getElementById('fcst-2-date')
const fcstDayThreeDate = document.getElementById('fcst-3-date')
const fcstDayFourDate = document.getElementById('fcst-4-date')
const fcstDayFiveDate = document.getElementById('fcst-5-date')

// This section includes time variables using Momment.js and DOM manipulation to show current dates and forecast dates

const todayLong = moment().format('dddd, MMMM Do, YYYY');
const todayShort = moment().format('M/DD/YYYY');
const oneDayFcst = moment().add(1, 'days').format('M/DD/YYYY')
const twoDayFcst = moment().add(2, 'days').format('M/DD/YYYY')
const threeDayFcst = moment().add(3, 'days').format('M/DD/YYYY')
const fourDayFcst = moment().add(4, 'days').format('M/DD/YYYY')
const fiveDayFcst = moment().add(5, 'days').format('M/DD/YYYY')



// DOM Manipulation is shown below
headerDate.textContent = todayLong
fcstDayOneDate.textContent = oneDayFcst
fcstDayTwoDate.textContent = twoDayFcst
fcstDayThreeDate.textContent = threeDayFcst
fcstDayFourDate.textContent = fourDayFcst
fcstDayFiveDate.textContent = fiveDayFcst