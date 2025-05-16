import type {IChartDataset} from "src/components/top-history-chart/lib/chartTypes.ts";
import type {ICategory, IChartDataResponse} from "src/components/top-history/lib/types";
import {SUB_CATEGORIES_LIST} from "src/components/top-history/lib/constants";

export const transformChartData = (chartData: IChartDataResponse, categories: ICategory[]): IChartDataset[] => {
  let datasets = []
  let chartDatasets: IChartDataset[] = []
  
  for (const [categoryName, categoryValue] of Object.entries(chartData.data)){
    datasets.push({
      categoryId: categoryName,
      data: categoryValue,
    })
  }
  
  for (const dataset of datasets){
    if (typeof dataset.data !== 'number'){
      for (const [subCategory, subCategoryData] of Object.entries(dataset.data)){
        chartDatasets.push({
          label: `${getCatergoryNameById(categories, Number(dataset.categoryId))} - ${SUB_CATEGORIES_LIST[Number(subCategory)].name}`,
          data: Object.values(subCategoryData).map(Number),
          borderColor: SUB_CATEGORIES_LIST[Number(subCategory)].color,
          hidden: false
        })
      }
    }
  }
  
  return chartDatasets;
}

const getCatergoryNameById = (categories: ICategory[], categoryId: number): string | null => {
  for (const category of categories) {
    if (category.id === categoryId) {
      return category.name
    }
    
    const subCategory = category.categories?.find(sub => sub.id === categoryId)
    if (subCategory) {
      return subCategory.name
    }
  }
  
  return null
}