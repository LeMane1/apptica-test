import SelectPicker from 'rsuite/SelectPicker';
import 'rsuite/SelectPicker/styles/index.less';
import type {ItemDataType} from "rsuite/CascadeTree";
import type {ValueType} from "rsuite/CheckTree";

interface ITopHistorySelectProps {
  selectOptions: ItemDataType[];
  onSelect: (countryId: number) => void;
}

export default function TopHistorySelect({selectOptions, onSelect}: ITopHistorySelectProps) {
  const handleOnSelect = (value: ValueType) => onSelect(Number(value))
  
  return (
    <SelectPicker
      data={selectOptions}
      onSelect={handleOnSelect}
    />
  )
}