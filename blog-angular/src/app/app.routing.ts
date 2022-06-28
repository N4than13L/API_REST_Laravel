import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { LoginComponent } from "./components/login/login.component"
import { RegisterComponent } from "./components/register/register.component"
import { HomeComponent } from "./components/home/home.component"
import { ErrorComponent } from "./components/error/error.component"
import { UserEditComponent } from "./components/user-edit/user-edit.component"
import { CategoryNewComponent } from "./components/category-new/category-new.component"
import { PostNewComponent } from "./components/post-new/post-new.component"

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'inicio', component: HomeComponent },
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'crear-categoria', component: CategoryNewComponent},
    {path: 'crear-entrada', component: PostNewComponent},
    {path: 'registro', component: RegisterComponent },
    {path:'userEdit', component: UserEditComponent },
    {path: '**', component: ErrorComponent}
]

export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes) 