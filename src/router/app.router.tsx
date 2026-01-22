
import { createBrowserRouter, Navigate } from "react-router";
import { LoginPage } from "../auth/pages/login/LoginPage";
import { RegisterPage } from "../auth/pages/register/RegisterPage";
import { HomePage } from "../shop/pages/HomePage";
import { ShoppingCartPage } from "../shop/pages/ShoppingCartPage";
import { ProfilePage } from "../shop/pages/ProfilePage";
import { lazy } from "react";
import { PurchasesPage } from "../shop/pages/PurchasesPage";
import { DashboardPage } from "../admin/pages/DashboardPage";
import { ProductsPage } from "../admin/pages/ProductsPage";
import { AdminProductPage } from "../admin/pages/AdminProductPage";
import { ProductDetails } from "../shop/components/products/ProductDetails";
import { NotAuthenticatedRoute } from "../components/routes/ProtectedRoutes";

const AuthLayout = lazy(() => import('../auth/layout/AuthLayout'))
const AdminLayout = lazy(() => import('../admin/layout/AdminLayout'))
const ShopLayout = lazy(() => import('../shop/layout/ShopLayout'))

export const appRouter = createBrowserRouter([
  
  // Shop - Products
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'cart',
        element: <ShoppingCartPage />
      },
      {
        path: 'profile',
        element: <ProfilePage />
      },
      {
        path: 'purchases',
        element: <PurchasesPage />
      },
      {
        path: '/product/:id',
        element: <ProductDetails />
      }

    ]
  },

  // Admin
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'products',
        element: <ProductsPage />
      },
      {
        path: 'products/:id',
        element: <AdminProductPage />
      }
    ]
  },

  // Auth
  {
    element: <NotAuthenticatedRoute />,
    children: [
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/auth/login" />
          },
          {
            path: 'login',
            element: <LoginPage />
          },
          {
            path: 'register',
            element: <RegisterPage />
          }
        ]
      }
    ]
  },

  {
    path: '*',
    element: <Navigate to='/' />
  }


]);