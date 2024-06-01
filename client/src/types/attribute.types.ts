export interface TAttributes {
  id: number;
  name: string;
  created_by: number;
  values: TValue[];
}

export interface TValue {
  id: number;
  attribute: string;
  name: string;
}
