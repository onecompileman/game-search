import { Genre } from './genre.model';

export interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number;
  platforms: any[];
  genres: Genre[];
}
