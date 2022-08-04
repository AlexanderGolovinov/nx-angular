import {DEFAULT_CURRENCY_CODE, LOCALE_ID, ModuleWithProviders, NgModule, Optional, SkipSelf} from "@angular/core";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig} from "@angular/material/dialog";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {HttpBackend} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {environment} from "../../environments/environment";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";

export const DATE_FORMATS = {
  parse: {
    dateInput: 'dd.MM.yyyy',
  },
  display: {
    dateInput: 'dd.MM.yyyy',
    monthYearLabel: 'MMMM yyyy'
  }
}

const APP_PROVIDERS = [
  {
    provide: MAT_DIALOG_DEFAULT_OPTIONS,
    useValue: {
      ...new MatDialogConfig(),
      minHeight: '300px',
      width: '800px',
      minWidth: '800px',
      maxWidth: '800px'
    }
  },
  {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
  {provide: LOCALE_ID, useValue: 'et-EE'},
  {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
];

// @ts-ignore
// @ts-ignore
@NgModule({
  imports: [
    // TranslateModule.forRoot({
    //   loader: TranslateLoader,
    //   userFactory: HttpLoaderFactory,
    //   deps: [HttpBackend]
    // }),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ]
})


export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule) {
      throw new Error('Core module has already been loaded. Import Core Modules in the AppModule only.')
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...APP_PROVIDERS],
    };
  }

}
