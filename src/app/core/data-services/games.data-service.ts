import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';
import { GameSearchQuery } from 'src/app/shared/models/game-search-query.model';
import { Game } from 'src/app/shared/models/game.model';
import { Genre } from 'src/app/shared/models/genre.model';
import { Platform } from 'src/app/shared/models/platform.model';
import { ResponseBody } from 'src/app/shared/models/response-body.model';

@Injectable({
  providedIn: 'root',
})
export class GamesDataService {
  constructor(private restangular: Restangular) {}

  getAllGenres(): Observable<ResponseBody<Genre>> {
    return this.restangular.one('genres').get();
  }

  getAllPlatforms(): Observable<ResponseBody<Platform>> {
    return this.restangular.one('platforms').get();
  }

  searchGames(query: GameSearchQuery): Observable<ResponseBody<Game>> {
    return this.restangular.one('games').get(query);
  }
}
