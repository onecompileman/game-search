import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Genre } from 'src/app/shared/models/genre.model';
import { Platform } from 'src/app/shared/models/platform.model';

@Injectable({
  providedIn: 'root',
})
export class GameSearchService {
  private platforms$: BehaviorSubject<Platform[]> = new BehaviorSubject<
    Platform[]
  >([
    {
      id: 21,
      name: 'Android',
      svg: 'android.svg',
      $$selected: true,
    },
    {
      id: 3,
      name: 'IOS',
      svg: 'ios.svg',
      $$selected: true,
    },
    {
      id: 4,
      name: 'PC',
      svg: 'pc.svg',
      $$selected: true,
    },
    {
      id: 18,
      name: 'Playstation',
      svg: 'ps4.svg',
      $$selected: true,
    },
    {
      id: 7,
      name: 'Nintendo Switch',
      svg: 'switch.svg',
      $$selected: true,
    },
    {
      id: 1,
      name: 'Xbox',
      svg: 'xbox.svg',
      $$selected: true,
    },
  ]);
  private genres$: BehaviorSubject<Genre[]> = new BehaviorSubject<Genre[]>([]);
  private searchQuery$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private minRating$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private maxRating$: BehaviorSubject<number> = new BehaviorSubject<number>(
    100
  );

  setGenresValue(genres: Genre[]): void {
    this.genres$.next(genres);
  }

  setSearchQueryValue(searchQuery: string) {
    this.searchQuery$.next(searchQuery);
  }

  setMinRatingValue(minRating: number) {
    this.minRating$.next(minRating);
  }

  setMaxRatingValue(maxRating: number) {
    this.maxRating$.next(maxRating);
  }

  selectMinRating(): Observable<number> {
    return this.minRating$.asObservable();
  }
  selectMaxRating(): Observable<number> {
    return this.maxRating$.asObservable();
  }

  selectAllGenres(): Observable<Genre[]> {
    return this.genres$.asObservable();
  }

  selectAllPlatforms(): Observable<Platform[]> {
    return this.platforms$.asObservable();
  }

  selectSearchQuery(): Observable<string> {
    return this.searchQuery$.asObservable();
  }

  toggleGenre(id: number) {
    const genres = this.genres$.getValue();
    const genreToToggle = genres.find((genre) => genre.id === id);

    if (genreToToggle) {
      genreToToggle.$$selected = !genreToToggle.$$selected;

      this.genres$.next(genres);
    }
  }

  togglePlatform(id: number) {
    const platforms = this.platforms$.getValue();
    const platformToToggle = platforms.find((platform) => platform.id === id);

    if (platformToToggle) {
      platformToToggle.$$selected = !platformToToggle.$$selected;

      this.platforms$.next(platforms);
    }
  }
}
