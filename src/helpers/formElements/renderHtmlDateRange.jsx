import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import configDateRange from '../configDateRange'

function renderHtmlDateRange(config, setValue, value = '') {
  const configurationDateRange = configDateRange()

  const onEvent = (ev, picker) => {
    const rightDate = picker.endDate
    const rightMoment = moment(rightDate)
    picker.rightCalendar.month = rightMoment

    if (picker.element[0].value === '') {
      const leftDate = picker.endDate
      const leftMoment = moment(leftDate).subtract(1, 'months')
      picker.leftCalendar.month = leftMoment
    }

    picker.renderCalendar('left')
    picker.renderCalendar('right')
  }

  const handleCallback = (start, end, id, picker) => {
    const fecha = start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY')
    setValue(id, fecha)
  }

  const configurationDateRangeMax = config.maxDate
    ? { ...configurationDateRange, maxDate: moment() }
    : { ...configurationDateRange }

  return (
    <DateRangePicker
      initialSettings={configurationDateRangeMax}
      onCallback={(start, end, picker) => handleCallback(start, end, config.id, picker)}
      onEvent={onEvent}
    >
      <div className="relative w-full">
        <input
          type="text"
          autoComplete="off"
          {...config}
          value={value}
          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm focus:outline-none focus:ring focus:ring-blue-400"
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
          <IconCalendar className="w-4 h-4" />
        </span>
      </div>
    </DateRangePicker>
  )
}

export default renderHtmlDateRange

const IconCalendar = (props) => (
  <svg viewBox="0 0 10 10" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 1.98386C0 1.31293 0.533333 0.769287 1.19048 0.769287H8.80952C9.46667 0.769287 10 1.31293 10 1.98386V8.78548C10 9.45641 9.46667 10.0001 8.80952 10.0001H1.19048C0.533333 10.0001 0 9.45641 0 8.78548V1.98386ZM1.19048 1.25512C0.795238 1.25512 0.47619 1.58159 0.47619 1.98386V8.78548C0.47619 9.18775 0.795238 9.51423 1.19048 9.51423H8.80952C9.20476 9.51423 9.52381 9.18775 9.52381 8.78548V1.98386C9.52381 1.58159 9.20476 1.25512 8.80952 1.25512H1.19048Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 2.05134C0 1.34313 0.533333 0.769287 1.19048 0.769287H8.80952C9.46667 0.769287 10 1.34313 10 2.05134V3.5898C10 3.73134 9.89524 3.84621 9.7619 3.84621H0.238095C0.104762 3.84621 0 3.73134 0 3.5898V2.05134ZM1.19048 1.28211C0.795238 1.28211 0.47619 1.62672 0.47619 2.05134V3.33339H9.52381V2.05134C9.52381 1.62672 9.20476 1.28211 8.80952 1.28211H1.19048Z"
    />
    <path fillRule="evenodd" clipRule="evenodd" d="M2.30781 0V2.30769H1.53857V0H2.30781Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M5.38495 0V2.30769H4.61572V0H5.38495Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M8.4621 0V2.30769H7.69287V0H8.4621Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M3.07636 6.15387H2.30713V5.38464H3.07636V6.15387Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M3.07636 7.69245H2.30713V6.92322H3.07636V7.69245Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M5.38495 6.15387H4.61572V5.38464H5.38495V6.15387Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M5.38495 7.69245H4.61572V6.92322H5.38495V7.69245Z" />
  </svg>
)
