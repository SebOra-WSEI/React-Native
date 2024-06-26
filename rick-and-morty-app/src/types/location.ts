export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Array<string>;
  url: string;
  created: string;
}

export type DefaultLocationFilters = Pick<
  Location,
  'name' | 'type' | 'dimension'
>;
