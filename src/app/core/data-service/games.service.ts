import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/shared/models/genre.model';
import { ResponseBody } from 'src/app/shared/models/response-body.model';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private restangular: Restangular) {}

  getAllGenres(): Observable<ResponseBody<Genre>> {
    return this.restangular.one('genres').get();
  }
}
