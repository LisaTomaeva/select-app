import { Option } from "../types";

export const filterOptions = (list: Array<Option>, searchString: string) => {
  return list.filter((item: Option, index: number) => item.value.includes(searchString));
}