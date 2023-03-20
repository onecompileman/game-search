import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameListComponent } from './game-list/game-list.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RestangularModule } from 'ngx-restangular';
import { RestangularConfigFactory } from './core/factories/restangular-config.factory';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [AppComponent, GameListComponent, RegisterComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    RestangularModule.forRoot(RestangularConfigFactory),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
