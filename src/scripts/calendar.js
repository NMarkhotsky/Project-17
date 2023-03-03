import flatpickr from 'flatpickr';

const DATEPICKER_OPTIONS = {
  // maxDate: 'today',
  wrap: true,
  dateFormat: 'd/m/Y',
  position: 'below right',
  monthSelectorType: 'static',
  // appendTo: document.querySelector(".flatpickr-container"),
  // prevArrow: "<span title=\"Previous year\">&lt;&lt;</span>",
  // nextArrow: "<span title=\"Next year\">&gt;&gt;</span>",
  // onMonthChange(dateStr) {
  // },
  // onYearChange(dateStr) {
  // },
  onClose(dateStr) {
    return dateStr;
  },
};

const DATEPICKER = flatpickr('#flatpickr', DATEPICKER_OPTIONS);
