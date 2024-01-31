import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/*import { FlexLayoutModule } from '@angular/flex-layout';*/

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    SidenavComponent
  ],
  exports: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    /*FlexLayoutModule,*/
    MaterialModule
  ]
})
export class SharedModule { }
