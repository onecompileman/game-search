import { Component, OnInit } from '@angular/core';
import { GameSearchService } from 'src/app/core/services/game-search.service';

@Component({
  selector: 'gs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private gameSearchService: GameSearchService) {}

  ngOnInit(): void {}

  onSearch(event: any) {
    this.gameSearchService.setSearchQueryValue(event.target.value);
  }
}
