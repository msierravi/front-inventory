import { NgModule, Component } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { DashboardModule } from './dashboard.module';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
