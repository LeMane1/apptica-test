import DatePicker from 'rsuite/DatePicker';
import InputGroup from 'rsuite/InputGroup';
import 'rsuite/DatePicker/styles/index.less';

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
    <>
      <InputGroup style={{ width: 428 }}>
        <DatePicker
          format="dd.MM.yyyy"
          placeholder={'Select Start Date'}
          block appearance="subtle"
          onSelect={handleOnStartDateSelect}
          value={startDate}
          style={{ width: 230 }}
        />
        <InputGroup.Addon>to</InputGroup.Addon>
        <DatePicker
          format="dd.MM.yyyy"
          placeholder={'Select End Date'}
          block appearance="subtle"
          placement={'bottomEnd'}
          onSelect={handleOnEndDateSelect}
          value={endDate}
          style={{ width: 230 }}
        />
      </InputGroup>
    </>
  )
}