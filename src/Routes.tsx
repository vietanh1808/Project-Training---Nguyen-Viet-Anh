import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const ProductPage = lazy(() => import('./modules/home/pages/products/ProductPage'));
const DetailProductPage = lazy(() => import('./modules/home/pages/products/DetailProductPage'));
const CreateProductPage = lazy(() => import('./modules/home/pages/products/CreateProductPage'));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <ProtectedRoute path={ROUTES.manageProduct} component={ProductPage} />
        <Route path={ROUTES.createProduct} component={CreateProductPage} />
        <Route path={ROUTES.detailProduct} component={DetailProductPage} />
        <Route path={ROUTES.home} component={HomePage} />
        <Route path={ROUTES.contact} component={ContactPage} />

        <Route path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
