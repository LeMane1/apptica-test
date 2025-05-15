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
import {useState} from "react";
import {options} from "src/components/top-history/lib/chartOptions.ts";
import type {IChartDataset} from "src/components/top-history/lib/chartTypes.ts";
import '../styles/topHistoryChartStyle.less'

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale)

interface ITopHistoryChartProps {
  datasetsRaw: IChartDataset[];
  labels: string[];
}

export default function TopHistoryChart(
  {
    datasetsRaw,
    labels
  }: ITopHistoryChartProps) {
  const [datasets, setDatasets] = useState(datasetsRaw)
  
  const toggleVisibility = (label: string) => {
    setDatasets(prev =>
      prev.map(ds =>
        ds.label === label ? { ...ds, hidden: !ds.hidden } : ds
      )
    )
  }
  
  const data = {
    labels,
    datasets,
  }
  
  return (
    <div className="top-history-chart">
      <Line data={data} options={options} />
      
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 16 }}>
        {datasets.map(ds => (
          <label key={ds.label} style={{ marginRight: 12 }}>
            <input
              type="checkbox"
              checked={!ds.hidden}
              onChange={() => toggleVisibility(ds.label)}
            />
            <span style={{ color: ds.borderColor, marginLeft: 4 }}>{ds.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}