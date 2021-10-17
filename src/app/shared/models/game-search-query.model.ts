export interface GameSearchQuery {
  page?: number;
  page_size?: number;
  search?: string;
  platforms?: string;
  genres?: string;
  metacritic?: string;
  ordering?: string;
}
