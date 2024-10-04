export interface ITableButtons {
  label?: string;
  icon?: string;
  class?: string;
  clickCallback?: (event: any, data: any) => void;
  tooltip?: string;
  actionsButton?: boolean;
  type?: "header" | "row";
  color?: string;
  disabled?: (key: any) => void;
}

export interface ITableColumnModel {
  field: string;
  header: string;
  sortable?: boolean;
  width?: string;
  type?: "date" | "string" | "number" | "boolean";
}
