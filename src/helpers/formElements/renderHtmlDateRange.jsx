'use client'

import { useState } from 'react'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export default function DateRangePickerTailwind({ config, setValue, value = '' }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])
  const [showPicker, setShowPicker] = useState(false)

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection
    setState([ranges.selection])
    const formatted = `${format(startDate, 'dd/MM/yyyy')} - ${format(endDate, 'dd/MM/yyyy')}`
    setValue(config.id, formatted)
    setShowPicker(false)
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        readOnly
        onClick={() => setShowPicker(!showPicker)}
        value={value || `${format(state[0].startDate, 'dd/MM/yyyy')} - ${format(state[0].endDate, 'dd/MM/yyyy')}`}
        className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm focus:outline-none focus:ring focus:ring-blue-400 cursor-pointer"
      />
      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
        <IconCalendar className="w-4 h-4" />
      </span>
      {showPicker && (
        <div className="absolute z-10 mt-2">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </div>
      )}
    </div>
  )
}

const IconCalendar = (props) => (
  <svg viewBox="0 0 10 10" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 1.98386C0 1.31293 0.533333 0.769287 1.19048 0.769287H8.80952C9.46667 0.769287 10 1.31293 10 1.98386V8.78548C10 9.45641 9.46667 10.0001 8.80952 10.0001H1.19048C0.533333 10.0001 0 9.45641 0 8.78548V1.98386Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 2.05134C0 1.34313 0.533333 0.769287 1.19048 0.769287H8.80952C9.46667 0.769287 10 1.34313 10 2.05134V3.5898C10 3.73134 9.89524 3.84621 9.7619 3.84621H0.238095C0.104762 3.84621 0 3.73134 0 3.5898V2.05134Z"
    />
  </svg>
)
