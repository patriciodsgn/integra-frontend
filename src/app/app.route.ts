import { Routes } from '@angular/router';

// dashboard
import { IndexComponent } from './index';
import { AnalyticsComponent } from './analytics';
import { FinanceComponent } from './finance';
import { CryptoComponent } from './crypto';
import { CustomDashboardComponent } from '../app/components/ds-nivel-regional/custom-dashboard.component';
import { CustomDashboardInicialComponent } from './components/ds-nivel-nacional/custom-dashboard-inicial.component';
import { IndicadoresDashboardComponent } from './components/indicadores-dashboard/indicadores-dashboard.component';





import { ViewLoginComponent } from './components/view-login/view-login.component';
import { ViewHomeComponent } from './components/view-home/view-home.component';
import { ViewEjecutivaComponent } from './components/view-ejecutiva/view-ejecutiva.component';
import { ViewDppiComponent } from './components/view-dppi/view-dppi.component';
import { ViewDpgrComponent } from './components/view-dpgr/view-dpgr.component';
import { ViewDaftComponent } from './components/view-daft/view-daft.component';
import { ViewPersonasComponent } from './components/view-personas/view-personas.component';
import { ViewEducacionComponent } from './components/view-educacion/view-educacion.component';
import { ViewCostosComponent } from './components/view-costos/view-costos.component';



// widgets
import { WidgetsComponent } from './widgets';

// tables
import { TablesComponent } from './tables';

// font-icons
import { FontIconsComponent } from './font-icons';

// charts
import { ChartsComponent } from './charts';

// dragndrop
import { DragndropComponent } from './dragndrop';

// layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

// pages
import { KnowledgeBaseComponent } from './pages/knowledge-base';
import { FaqComponent } from './pages/faq';

export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            // dashboard
            // { path: '', component: IndexComponent, data: { title: 'Sales Admin' } },
            { path: 'analytics', component: AnalyticsComponent, data: { title: 'Analytics Admin' } },
            { path: 'finance', component: FinanceComponent, data: { title: 'Finance Admin' } },
            { path: 'crypto', component: CryptoComponent, data: { title: 'Crypto Admin' } },
            { path: 'custom-dashboard', component: CustomDashboardComponent, data: { title: 'Integra' } },
            { path: 'region/:regionId', component: CustomDashboardComponent, data: { title: 'Region Dashboard' } },
            { path: 'custom-dashboard-inicial', component: CustomDashboardInicialComponent, data: { title: 'Vista Estrategica Nacional' }},
            { path: 'indicadores-dashboard/:segment', component: IndicadoresDashboardComponent },

            // vistas de cada direccion            
            { path: 'home', component: ViewHomeComponent },
            {
                path: 'educacion',
                component: ViewEducacionComponent,
                children: [
                    {
                        path: 'nee',
                        loadComponent: () =>
                            import('./components/panel-educacion-nee/panel-educacion-nee.component').then(
                                (m) => m.PanelEducacionNeeComponent
                            ),
                    },{
                        path: 'atet',
                        loadComponent: () =>
                            import('./components/panel-educacion-atet/panel-educacion-atet.component').then(
                                (m) => m.PanelEducacionAtetComponent
                            ),
                    },
                ],
            },
            
            { path: 'ejecutiva', component: ViewEjecutivaComponent },
            { path: 'dppi', component: ViewDppiComponent },
            { path: 'dpgr', component: ViewDpgrComponent },
            { path: 'daft', component: ViewDaftComponent },
            { path: 'personas', component: ViewPersonasComponent },
            { path: 'costos', component: ViewCostosComponent },

            // widgets
            { path: 'widgets', component: WidgetsComponent, data: { title: 'Widgets' } },
            // font-icons
            { path: 'font-icons', component: FontIconsComponent, data: { title: 'Font Icons' } },
            // charts
            { path: 'charts', component: ChartsComponent, data: { title: 'Charts' } },
            // dragndrop
            { path: 'dragndrop', component: DragndropComponent, data: { title: 'Dragndrop' } },
            // pages
            { path: 'pages/knowledge-base', component: KnowledgeBaseComponent, data: { title: 'Knowledge Base' } },
            { path: 'pages/faq', component: FaqComponent, data: { title: 'FAQ' } },
            //apps
            { path: 'apps', loadChildren: () => import('./apps/apps.module').then((d) => d.AppsModule) },
            // components
            { path: 'components', loadChildren: () => import('./components/components.module').then((d) => d.ComponentsModule) },
            // elements
            { path: 'elements', loadChildren: () => import('./elements/elements.module').then((d) => d.ElementsModule) },
            // forms
            { path: 'forms', loadChildren: () => import('./forms/form.module').then((d) => d.FormModule) },
            // users
            { path: 'users', loadChildren: () => import('./users/user.module').then((d) => d.UsersModule) },
            // tables
            { path: 'tables', component: TablesComponent, data: { title: 'Tables' } },
            { path: 'datatables', loadChildren: () => import('./datatables/datatables.module').then((d) => d.DatatablesModule) },
        ],
    },

    {
        path: '',
        component: AuthLayout,
        children: [
            //login
            { path: 'login', component: ViewLoginComponent },
            // pages
            { path: 'pages', loadChildren: () => import('./pages/pages.module').then((d) => d.PagesModule) },
            // auth
            { path: 'auth', loadChildren: () => import('./auth/auth.module').then((d) => d.AuthModule) },
        ],
    },
];