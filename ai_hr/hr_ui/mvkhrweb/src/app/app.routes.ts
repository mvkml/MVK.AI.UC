import { Routes } from '@angular/router';
import { Landing }    from './features/landing/landing';
import { About }      from './features/about/about';
import { OurService } from './features/our-service/our-service';
import { Portfolio }  from './features/portfolio/portfolio';
import { Contact }    from './features/contact/contact';
import { Login }      from './features/login/login';
import { Signup }     from './features/signup/signup';
import { Dashboard }  from './features/dashboard/dashboard';
import { Home }       from './features/dashboard/home/home';
import { Upload }     from './features/dashboard/upload/upload';
import { Employees }  from './features/dashboard/employees/employees';

export const routes: Routes = [
  { path: '',          component: Landing    },
  { path: 'about',     component: About      },
  { path: 'services',  component: OurService },
  { path: 'portfolio', component: Portfolio  },
  { path: 'contact',   component: Contact    },
  { path: 'login',     component: Login      },
  { path: 'signup',    component: Signup     },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '',       component: Home,   data: { title: 'Dashboard'        } },
      { path: 'upload',    component: Upload,    data: { title: 'Upload Documents' } },
      { path: 'employees', component: Employees, data: { title: 'Employees'        } },
    ]
  },
  { path: '**', redirectTo: '' }
];
