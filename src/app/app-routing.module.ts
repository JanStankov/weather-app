import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WeatherScreenComponent } from './components/weather-screen/weather-screen.component';
import { AuthGuard } from './services/guards/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: WeatherScreenComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: 'home', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
