import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    MatCardModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
