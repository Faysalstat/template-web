import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './modules/components/notfound/notfound.component';
import { EventService } from './modules/shared-services/event.service';
import { IconService } from './modules/shared-services/icon.service';
import { NodeService } from './modules/shared-services/node.service';
import { PhotoService } from './modules/shared-services/photo.service';
import { ProductService } from './modules/shared-services/product.service';
import { AppLayoutModule } from './modules/layout/app.layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClientInterceptor } from './interseptor/client.interceptor';

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    AppRoutingModule,
    AppLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ClientInterceptor,
      multi: true,
    },
    EventService,
    IconService,
    NodeService,
    PhotoService,
    ProductService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
