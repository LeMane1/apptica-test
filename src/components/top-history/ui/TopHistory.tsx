import '../styles/topHistoryStyle.less'
import TopHistoryChart from "src/components/top-history/ui/TopHistoryChart.tsx";
import {
  useGetCategoriesListQuery,
  useLazyGetChartDataQuery,
  useGetCountriesListQuery
} from "src/components/top-history/api/topHistoryApi.ts";
import {useEffect, useState} from "react";
import {transformChartData} from "src/components/top-history/lib/transformChartData.ts";
import TopHistorySelect from "src/components/top-history/ui/TopHistorySelect.tsx";
import TopHistoryDatePicker from "src/components/top-history/ui/TopHistoryDatePicker.tsx";
import {getSelectCountriesList} from "src/components/top-history/lib/getSelectCountriesList.tsx";
import {getChartLabels} from "src/components/top-history/lib/getChartLabels.ts";
import {format} from 'date-fns'

export default function TopHistory(){
  const [fetchChartData, {data: chartData}] = useLazyGetChartDataQuery()
  const {data: countriesData} = useGetCountriesListQuery()
  const {data: categoriesData} = useGetCategoriesListQuery()
  const [selectedCountryId, setSelectedCountryId] = useState<number>(0)
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [chartLables, setChartLables] = useState<string[]>([])
  
  useEffect(() => {
    fetchChartData({
      countryId: 1,
      dateFrom: '2025-05-01',
      dateTo: new Date().toISOString().split('T')[0]
    })
  },[])
  
  useEffect(() => {
    fetchChartData({
      countryId: selectedCountryId,
      dateFrom: format(startDate, 'yyyy-MM-dd'),
      dateTo: format(endDate, 'yyyy-MM-dd')
    })
    setChartLables(getChartLabels(startDate, endDate))
  }, [selectedCountryId, startDate, endDate]);
  
  const handleOnSelect = (countryId: number) => setSelectedCountryId(countryId)
  const handleOnStartDateSelect = (date: Date) => setStartDate(date)
  const handleOnEndDateSelect = (date: Date) => setEndDate(date)
  
  return (
    <div className={'top-history-wrapper'}>
      <div className={'chart-control-wrapper'}>
        <h4 className={'top-history-title'}>
          Top History
        </h4>
        
        <div className={'chart-control'}>
          {countriesData &&
            <TopHistorySelect
              selectOptions={getSelectCountriesList(countriesData.data)}
              onSelect={handleOnSelect}
            />
          }
          <TopHistoryDatePicker
            onStartDateSelect={handleOnStartDateSelect}
            onEndDateSelect={handleOnEndDateSelect}
          />
        </div>
      </div>
      
      <hr/>
      
      {chartData && categoriesData &&
        <TopHistoryChart labels={chartLables} datasets={transformChartData(chartData, categoriesData.data)}/>
      }
    </div>
  )
}