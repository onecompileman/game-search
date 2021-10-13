import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { GamesService } from 'src/app/core/data-service/games.service';
import { Genre } from '../../models/genre.model';

@Component({
  selector: 'gs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  platforms: any[] = [
    {
      name: 'Android',
      svg: 'android.svg',
      selected: true,
    },
    {
      name: 'IOS',
      svg: 'ios.svg',
      selected: true,
    },
    {
      name: 'PC',
      svg: 'pc.svg',
      selected: true,
    },
    {
      name: 'Playstation',
      svg: 'ps4.svg',
      selected: true,
    },
    {
      name: 'Nintendo Switch',
      svg: 'switch.svg',
      selected: true,
    },
    {
      name: 'Xbox',
      svg: 'xbox.svg',
      selected: true,
    },
  ];

  genres: Genre[] = [];

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.getAllGenres();
  }

  private getAllGenres() {
    this.gamesService
      .getAllGenres()
      .pipe(
        pluck('results'),
        map((genres: Genre[]) =>
          genres.map((genre) => {
            genre.$$selected = true;
            return genre;
          })
        ),
        tap(console.log)
      )
      .subscribe((genres) => {
        this.genres = genres;
      });
  }
}
