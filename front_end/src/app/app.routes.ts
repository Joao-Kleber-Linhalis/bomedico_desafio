import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListComponent } from './components/people/people-list/people-list.component';

export const routes: Routes = [
    {
        path: '', component: PeopleListComponent,
    }
];


