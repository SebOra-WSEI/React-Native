export interface QueryResponse<T> {
  info?: Info;
  results: Array<T>;
  error?: string;
}

interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string | null;
}
