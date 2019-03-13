import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {ProductsComponent} from './products/products.component';
import {OrderSuccessComponent} from './order-success/order-success.component';
import {LoginComponent} from './login/login.component';
import {AdminProductsComponent} from './admin/admin-products/admin-products.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {AdminAuthGuardService} from './services/auth-guard/admin-auth-guard.service';
import {ProductFormComponent} from './admin/product-form/product-form.component';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot([
    {path: '', component: ProductsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'shopping-cart', component: ShoppingCartComponent},

    {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]},
    {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService]},
    {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService]},

    {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
    {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
    {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},

    {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},

  ])],
})
export class AppRoutingModule {
}
