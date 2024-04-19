import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import TrendingProducts from "./components/TrendingProducts.jsx";
import DailyProducts from "./components/DailyProducts.jsx";
import DailyProduct from "./components/DailyProduct.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ParallelQueries from './components/ParallelQueries.jsx';
import DynamicParallelQueries from './components/DynamicParallelQueries.jsx';
import DependantQuery from './components/DependantQuery.jsx';
import InfiniteQuery from './components/InfiniteQuery.jsx';
import Mutation from './components/Mutation.jsx';
import { ToastContainer } from 'react-toastify';


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/trending-products",
    element: <TrendingProducts />
  },
  {
    path: "/daily-products",
    element: <DailyProducts />
  },
  {
    path: "/daily-products/:productId",
    element: <DailyProduct />
  },
  {
    path: "/parallel-queries",
    element: <ParallelQueries />
  },
  {
    path: "/dynamic-parallel-queries",
    element: <DynamicParallelQueries productIds={[1, 3]} />
  },
  {
    path: "/dependant-query",
    element: <DependantQuery email="hammadquiz@gmail.com" />
  },
  {
    path: "/infinite-query",
    element: <InfiniteQuery />
  },
  {
    path: "/mutation",
    element: <Mutation />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ToastContainer />
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
  </QueryClientProvider>
  // </React.StrictMode>,
)
