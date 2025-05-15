export interface ICountry {
  "id": number;
  "name": string;
  "country": string;
  "active": boolean;
  "icon": string;
  "is_top_collected": boolean;
  "top_apps": boolean;
  "locale": string;
}

export interface ICountriesResponse {
  data: ICountry[];
}

export interface IExtraCategory {
  "id": number;
  "name": string;
}

export interface ICategory {
  "id": number;
  "name": string;
  "categories": IExtraCategory[];
}

export interface ICategoriesResponse {
  "status_code": number,
  "message": string;
  "data": ICategory[]
}

export type NestedChartData = {
  [key: string]: number | NestedChartData
}

export interface IChartDataResponse {
  "status_code": number;
  "message": string;
  "data": NestedChartData;
}