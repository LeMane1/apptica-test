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
import type {IChartDataset} from "src/components/top-history/lib/chartTypes.ts";

export default function TopHistory(){
  const [fetchChartData, {data: chartData}] = useLazyGetChartDataQuery()
  const {data: countriesData} = useGetCountriesListQuery()
  const {data: categoriesData} = useGetCategoriesListQuery()
  const [selectedCountryId, setSelectedCountryId] = useState<number>(1)
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [chartLables, setChartLables] = useState<string[]>([])
  const [visibleChartData, setVisibleChartData] = useState<IChartDataset[]>()
  
  useEffect(() => {
    fetchChartData({
      countryId: 1,
      dateFrom: format(new Date(), 'yyyy-MM-dd'),
      dateTo: format(new Date(), 'yyyy-MM-dd')
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
  
  useEffect(() => {
    if (chartData && categoriesData?.data) {
      setVisibleChartData(transformChartData(chartData, categoriesData.data))
    }
  }, [chartData]);
  
  const handleOnSelect = (countryId: number) => setSelectedCountryId(countryId)
  const handleOnStartDateSelect = (date: Date) => setStartDate(date)
  const handleOnEndDateSelect = (date: Date) => setEndDate(date)
  
  const handleOnChange = (label: string) => {
    if (visibleChartData) {
      const updated = visibleChartData.map(dataset =>
        dataset.label === label
          ? { ...dataset, hidden: !dataset.hidden }
          : dataset
      );
      
      setVisibleChartData(updated);
    }
  }
  
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
              value={selectedCountryId}
            />
          }
          <TopHistoryDatePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateSelect={handleOnStartDateSelect}
            onEndDateSelect={handleOnEndDateSelect}
          />
        </div>
      </div>
      
      <hr/>
      
      {visibleChartData && categoriesData &&
        <TopHistoryChart
          labels={chartLables}
          datasets={visibleChartData}
          onChange={handleOnChange}
        />
      }
    </div>
  )
}