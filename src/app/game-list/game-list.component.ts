import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import {
  combineAll,
  map,
  pluck,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { GamesDataService } from '../core/data-services/games.data-service';
import { GameSearchService } from '../core/services/game-search.service';
import { GameSearchQuery } from '../shared/models/game-search-query.model';
import { Game } from '../shared/models/game.model';
import { ResponseBody } from '../shared/models/response-body.model';

@Component({
  selector: 'gs-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  searchForm: FormGroup;

  pages: any[] = [];
  games$: Observable<Game[]>;

  constructor(
    private formBuilder: FormBuilder,
    private gameDataService: GamesDataService,
    private gameSearchService: GameSearchService
  ) {}

  get page(): AbstractControl | null {
    return this.searchForm.get('page');
  }

  get orderBy(): AbstractControl | null {
    return this.searchForm.get('orderBy');
  }

  get order(): AbstractControl | null {
    return this.searchForm.get('order');
  }

  get pageSize(): AbstractControl | null {
    return this.searchForm.get('pageSize');
  }

  ngOnInit(): void {
    this.initForm();
    this.listenToSearchEventChanges();
  }

  nextPage() {
    const page = this.page?.value;
    this.page?.patchValue(page + 1);
  }

  prevPage() {
    const page = this.page?.value;
    this.page?.patchValue(page - 1);
  }

  changePage(index: number) {
    this.page?.patchValue(index);
  }

  private initForm() {
    this.searchForm = this.formBuilder.group({
      page: [0],
      orderBy: ['added'],
      order: ['asc'],
      pageSize: [10],
    });
  }

  private listenToSearchEventChanges() {
    const page$ = this.page?.valueChanges.pipe(startWith(0));
    const orderBy$ = this.orderBy?.valueChanges.pipe(startWith('added'));
    const order$ = this.order?.valueChanges.pipe(startWith('asc'));
    const pageSize$ = this.pageSize?.valueChanges.pipe(startWith(10));

    const search$ = this.gameSearchService.selectSearchQuery();

    const selectedPlatformsIds$ = this.gameSearchService
      .selectAllPlatforms()
      .pipe(
        map((platforms) =>
          platforms
            .filter((platform) => platform.$$selected)
            .map((platform) => platform.id)
        )
      );
    const selectedGenresIds$ = this.gameSearchService
      .selectAllPlatforms()
      .pipe(
        map((genres) =>
          genres.filter((genre) => genre.$$selected).map((genre) => genre.id)
        )
      );

    const minRating$ = this.gameSearchService.selectMinRating();
    const maxRating$ = this.gameSearchService.selectMaxRating();

    this.games$ = combineLatest([
      page$,
      orderBy$,
      order$,
      pageSize$,
      search$,
      selectedPlatformsIds$,
      selectedGenresIds$,
      minRating$,
      maxRating$,
    ]).pipe(
      map(
        ([
          page,
          orderBy,
          order,
          pageSize,
          search,
          selectedPlatformsIds,
          selectedGenresIds,
          minRating,
          maxRating,
        ]) => {
          const searchQuery: GameSearchQuery = {
            page,
            page_size: pageSize,
            search,
            genres: selectedGenresIds.toString(),
            platforms: selectedPlatformsIds.toString(),
            ordering: order === 'asc' ? orderBy : '-' + orderBy,
            metacritic:
              minRating || maxRating
                ? minRating || 0 + ',' + maxRating || 0
                : null,
          };
          console.log(searchQuery);

          const filteredSearchQuery: GameSearchQuery = Object.keys(searchQuery)
            .filter((key) => searchQuery[key])
            .reduce(
              (query, key) => ({
                ...query,
                [key]: searchQuery[key],
              }),
              {}
            );

          return filteredSearchQuery;
        }
      ),
      switchMap((gameSearchQuery: GameSearchQuery) =>
        this.gameDataService.searchGames(gameSearchQuery)
      ),
      tap((response: ResponseBody<Game>) => {
        console.log(response);
        const pageCount = Math.ceil(response.count / (this.pageSize.value + 1));
        this.pages = Array(pageCount).fill(null);
      }),
      pluck('results')
    );
  }
}
