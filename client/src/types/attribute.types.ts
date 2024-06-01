export interface TAttributes {
  id: number;
  name: string;
  created_by: number;
  values: Value[];
}

export interface Value {
  id: number;
  attribute: string;
  name: string;
}
