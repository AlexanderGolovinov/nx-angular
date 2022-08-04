import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BooksSearchShellComponent} from '@tmo/books/feature-search';


const routes: Routes = [
  {
    path: '',
    component: BooksSearchShellComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksPortalRoutingModule {}
