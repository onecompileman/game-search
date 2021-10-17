import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialDataResolver } from './core/resolvers/initial-data.resolver';
import { GameListComponent } from './game-list/game-list.component';

const routes: Routes = [
  {
    path: '',
    component: GameListComponent,
    resolve: {
      init: InitialDataResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
