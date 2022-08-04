import {PreloadingStrategy, RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AppRoutes} from "./@core/app-routes";

const routes: Routes = [
  // {
  //   path: AppRoutes.unauthorized,
  //   component: UnauthorizedComponent
  // },
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: '',
        redirectTo: AppRoutes.search,
        pathMatch: 'full',
      },
      {
        path: AppRoutes.search,
        loadChildren: () =>
          import('@tmo/books/portal').then(
            (m) => m.BooksPortalModule
          ),
        canActivate: [],
        data: {
          permissions: []
        }
      }
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      enableTracing: false,
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
