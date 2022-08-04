import { NgModule } from '@angular/core';
import { BooksFeatureSearchModule } from "../../../feature-search/src";
import {BooksPortalRoutingModule} from "./books-portal-routing.module";

@NgModule({
  imports: [
    BooksFeatureSearchModule,
    BooksPortalRoutingModule,
  ],
})
export class BooksPortalModule {}
