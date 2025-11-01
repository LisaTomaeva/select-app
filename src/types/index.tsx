export interface Option {
  name: string,
  value: string
};

export interface SelectState {
  options: Array<Option>,
  saveStatusMsg: string,
  selectedOption: string,
  }

export interface Store {
  select: SelectState,
}