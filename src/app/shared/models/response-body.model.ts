export interface ResponseBody<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
