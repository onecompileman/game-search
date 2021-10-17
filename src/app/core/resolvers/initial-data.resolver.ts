import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { Genre } from 'src/app/shared/models/genre.model';
import { GamesDataService } from '../data-services/games.data-service';
import { GameSearchService } from '../services/game-search.service';

@Injectable({
  providedIn: 'root',
})
export class InitialDataResolver implements Resolve<any> {
  constructor(
    private gameSearchService: GameSearchService,
    private gameDataService: GamesDataService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.gameDataService.getAllGenres().pipe(
      pluck('results'),
      map((genres: Genre[]) =>
        genres.map((genre) => {
          genre.$$selected = true;
          return genre;
        })
      ),
      tap((genres: Genre[]) => this.gameSearchService.setGenresValue(genres))
    );
  }
}
