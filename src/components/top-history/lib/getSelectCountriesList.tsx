import type {ICountry} from "src/components/top-history/lib/types.ts";
import type {ItemDataType} from "rsuite/CascadeTree";

export const getSelectCountriesList = (countries: ICountry[]): ItemDataType[] => {
  return countries.map(country => ({
    label: country.country,
    value: country.id,
  }))
}