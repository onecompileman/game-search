import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialDataResolver } from './core/resolvers/initial-data.resolver';
import { GameListComponent } from './game-list/game-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [ {
      path: '',
      component: GameListComponent,
      resolve: {
        init: InitialDataResolver,
      },
    },] 
  },
 
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
