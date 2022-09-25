import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { BooksSearchShellComponent } from '@tmo/books/feature-search';
import { BooksDetailsShellComponent } from "@tmo/books/feature-details";


const routes: Routes = [
  {
    path: '',
    component: BooksSearchShellComponent
  },
  {
    path: 'details/:id',
    component: BooksDetailsShellComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksPortalRoutingModule {}
