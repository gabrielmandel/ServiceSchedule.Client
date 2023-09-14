import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { BudgetComponent } from './pages/budget/budget.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            {
                path: 'schedule',
                component: ScheduleComponent
            },
            {
                path: 'budget',
                component: BudgetComponent
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    //   {
    //     path: '404',
    //     component: Page404Component,
    //     data: {
    //       title: 'Page 404'
    //     }
    //   },
    //   {
    //     path: '500',
    //     component: Page500Component,
    //     data: {
    //       title: 'Page 500'
    //     }
    //   },
    //   {
    //     path: 'register',
    //     component: RegisterComponent,
    //     data: {
    //       title: 'Register Page'
    //     }
    //   },
    { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'top',
            anchorScrolling: 'enabled',
            initialNavigation: 'enabledBlocking'
            // relativeLinkResolution: 'legacy'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
