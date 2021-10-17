import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { GamesDataService } from 'src/app/core/data-services/games.data-service';
import { GameSearchService } from 'src/app/core/services/game-search.service';
import { Genre } from '../../models/genre.model';
import { Platform } from '../../models/platform.model';

@Component({
  selector: 'gs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  platforms$: Observable<Platform[]> = of([]);
  genres$: Observable<Genre[]> = of([]);

  constructor(private gameSearchService: GameSearchService) {}

  ngOnInit(): void {
    this.getAllGenres();
    this.getAllPlatforms();
  }

  toggleGenre(genre: Genre) {
    this.gameSearchService.toggleGenre(genre.id);
  }

  togglePlatform(platform: Platform) {
    this.gameSearchService.togglePlatform(platform.id);
  }

  onMinRatingChange(event: any) {
    this.gameSearchService.setMinRatingValue(event.target.value);
  }

  onMaxRatingChange(event: any) {
    this.gameSearchService.setMaxRatingValue(event.target.value);
  }

  private getAllGenres() {
    this.genres$ = this.gameSearchService.selectAllGenres();
  }

  private getAllPlatforms() {
    this.platforms$ = this.gameSearchService.selectAllPlatforms();
  }
}
