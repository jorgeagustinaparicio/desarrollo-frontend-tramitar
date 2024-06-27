import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PanelComponent } from './components/panel/panel.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'admin', component: PanelComponent
    }
];
