import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'notes/1',
        pathMatch: 'full'
    },
    {
        path: 'notes/:groupId',
        component: HomeComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
