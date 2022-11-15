import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './auth/authguard.guard';
import { HomeComponent } from './auth/home/home.component';
import { contents } from './auth/routes';
import { UnAuthguardGuard } from './auth/unauthguard.guard';
import { ContentComponent } from './shared/components/content/content.component';
import { content } from './shared/routes/routes';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UnAuthguardGuard],
    children: contents,
  },
  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentComponent,
    children: content,
    canActivate: [AuthguardGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
