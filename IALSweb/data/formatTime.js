var d = new Date();
var year = d.getFullYear();
var month = d.getMonth() + 1;
var date = d.getDate();
var weekTime = d.getDay();
var hour = d.getHours();
var minute = d.getMinutes();
var second = d.getSeconds();
var formatDate = year + '-';
if (month>=10){
  formatDate += month
}
else {
  formatDate += '0' + month
}
if (date>=10){
  formatDate += '-' + date
}
else {
  formatDate += '-0' + date
}
module.exports = {
  formatDate: formatDate,
  year:year,
  month:month,
  date:date,
  weekTime:weekTime,
  hour:hour,
  minute:minute,
  second:second
}
