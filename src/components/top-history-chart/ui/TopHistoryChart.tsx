import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import {options} from "src/components/top-history-chart/lib/chartOptions.ts";
import type {IChartDataset} from "src/components/top-history-chart/lib/chartTypes.ts";
import '../style/topHistoryChartStyle.less'

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale)

interface ITopHistoryChartProps {
  datasets: IChartDataset[];
  labels: string[];
  onChange: (value: string) => void;
  isVisible: boolean;
}

export default function TopHistoryChart(
  {
    datasets,
    labels,
    onChange,
    isVisible,
  }: ITopHistoryChartProps) {
  
  return (
    <div className={`top-history-chart ${isVisible ? 'show' : 'hide'}`}>
      <Line data={{labels, datasets}} options={options} />
      
      <div className='chart-label-wrapper'>
        {datasets.map(ds => (
          <label key={ds.label}>
            <input
              type="checkbox"
              checked={!ds.hidden}
              onChange={() => onChange(ds.label)}
            />
            <span style={{ color: ds.borderColor, marginLeft: 4 }}>{ds.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}