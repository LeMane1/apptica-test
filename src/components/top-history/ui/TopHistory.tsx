import TopHistoryChart from "src/components/top-history/ui/TopHistoryChart.tsx";
import {
  useGetCategoriesListQuery,
  useLazyGetChartDataQuery,
  useGetCountriesListQuery
} from "src/components/top-history/api/topHistoryApi.ts";
import {useEffect} from "react";
import {transformChartData} from "src/components/top-history/lib/transformChartData.ts";
import '../styles/topHistoryStyle.less'

const labels = ['1 May 2025', '2 May 2025', '3 May 2025', '4 May 2025', '5 May 2025', '6 May 2025', '7 May 2025']

export default function TopHistory(){
  const [fetchChartData, {data: chartData}] = useLazyGetChartDataQuery()
  const {data: countriesData} = useGetCountriesListQuery()
  const {data: categoriesData} = useGetCategoriesListQuery()
  
  useEffect(() => {
    fetchChartData({
      countryId: 1,
      dateFrom: '2025-05-01',
      dateTo: '2025-05-07'
    })
  },[])
  
  return (
    <div className={'top-history-wrapper'}>
      <h4 className={'top-history-title'}>
        Top History
      </h4>
      
      <hr/>
      
      {chartData && categoriesData &&
        <TopHistoryChart labels={labels} datasetsRaw={transformChartData(chartData, categoriesData.data)}/>
      }
    </div>
  )
}