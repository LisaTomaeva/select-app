export interface Option {
  name: string,
  value: string
};

export interface Store {
  options: Array<Option>,
  saveStatusMsg: string,
  selectedOption: string,
}