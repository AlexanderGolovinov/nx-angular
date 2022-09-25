import { NgModule } from '@angular/core';
import { BooksFeatureSearchModule } from "@tmo/books/feature-search";
import {BooksPortalRoutingModule} from "./books-portal-routing.module";
import {BooksFeatureDetailsModule} from "@tmo/books/feature-details";

@NgModule({
  imports: [
    BooksFeatureSearchModule,
    BooksFeatureDetailsModule,
    BooksPortalRoutingModule,
  ],
})
export class BooksPortalModule {}
