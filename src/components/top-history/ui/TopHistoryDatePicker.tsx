import DatePicker from 'rsuite/DatePicker';
import InputGroup from 'rsuite/InputGroup';
import 'rsuite/DatePicker/styles/index.less';
import '../styles/topHistoryDatePicker.less'
import {DATE_FORMAT_2} from "src/components/top-history/lib/constants.ts";

interface ITopHistoryDatePickerProps {
  onStartDateSelect: (date: Date) => void;
  onEndDateSelect: (date: Date) => void;
  startDate: Date;
  endDate: Date;
}

export default function TopHistoryDatePicker({startDate, endDate, onStartDateSelect, onEndDateSelect}: ITopHistoryDatePickerProps) {
  const handleOnStartDateSelect = (date: Date): void => onStartDateSelect(date)
  const handleOnEndDateSelect = (date: Date): void => onEndDateSelect(date)
  
  return (
    <InputGroup className="wrapper">
      <DatePicker
        format={DATE_FORMAT_2}
        placeholder={'Select Start Date'}
        block appearance="subtle"
        onSelect={handleOnStartDateSelect}
        value={startDate}
        className='date-picker'
        cleanable={false}
      />
      <InputGroup.Addon>to</InputGroup.Addon>
      <DatePicker
        format={DATE_FORMAT_2}
        placeholder={'Select End Date'}
        block appearance="subtle"
        placement={'bottomEnd'}
        onSelect={handleOnEndDateSelect}
        value={endDate}
        className='date-picker'
        cleanable={false}
      />
    </InputGroup>
  )
}