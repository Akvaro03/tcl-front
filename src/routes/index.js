import { Await, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from '../components/ProtectedRoute';
import LoadingCircle from '../pages/Loading';
import { Navigate } from "react-router-dom";
import React, { Suspense } from 'react';
import typesUsers from "../classes/typesUsers";
import ListClients from "../pages/listClients";
//Components
//Pages
const ConfigurationPage = React.lazy(() => import('../pages/configurationPage')); // Lazy-loaded
const StatisticsPage = React.lazy(() => import('../pages/statisticsPage')); // Lazy-loaded
const CreateOtPage = React.lazy(() => import('../pages/createOtPage')); // Lazy-loaded
const OtAsingPages = React.lazy(() => import('../pages/otAsignados')); // Lazy-loaded
const CreateFact = React.lazy(() => import('../pages/createFact')); // Lazy-loaded
const OtAllData = React.lazy(() => import('../pages/otAllData')); // Lazy-loaded
const AllUser = React.lazy(() => import('../pages/allUsers')); // Lazy-loaded
const Etiquetas = React.lazy(() => import('../pdf/Etiqueta')); // Lazy-loaded
const LoginPage = React.lazy(() => import('../pages/login')); // Lazy-loaded
const OtPage = React.lazy(() => import('../pages/otPage')); // Lazy-loaded
const Remito = React.lazy(() => import('../pdf/Remito')); // Lazy-loaded
export const routes = createBrowserRouter([
    {
        path: "/",
        errorElement: <Navigate to="/login" replace={true} />,
        element: <Navigate to="/login" replace={true} />,
    },
    {
        path: "/login",
        element:
            <Suspense fallback={<LoadingCircle />}>
                <Await resolve={LoginPage}>
                    <LoginPage />
                </Await>
            </Suspense>
    },
    {
        path: "/createOt",
        element:
            <ProtectedRoute type={typesUsers.Administrador} newPage={"/OtAsingPages"}>
                <Suspense fallback={<LoadingCircle />}>
                    <Await resolve={CreateOtPage}>
                        <CreateOtPage />
                    </Await>
                </Suspense>
            </ProtectedRoute>
    },
    {
        path: "/listClients",
        element:
            <ProtectedRoute type={typesUsers.Administrador} newPage={"/OtAsingPages"}>
                <ListClients />
            </ProtectedRoute>
    },
    {
        path: "/createFact",
        element:
            <ProtectedRoute type={typesUsers.Administrador} newPage={"/OtAsingPages"}>
                <Suspense fallback={<LoadingCircle />}>
                    <Await resolve={CreateFact}>
                        <CreateFact />
                    </Await>
                </Suspense>
            </ProtectedRoute>
    },
    {
        path: "/OtAsingPages",
        element:
            <ProtectedRoute type={typesUsers.Trabajador} newPage={"/OtList"}>
                <Suspense fallback={<LoadingCircle />}>
                    <Await resolve={OtAsingPages}>
                        <OtAsingPages />
                    </Await>
                </Suspense>
            </ProtectedRoute>
    },
    {
        path: "/OtList",
        element:
            <ProtectedRoute type={typesUsers.Administrador} newPage={"/OtAsingPages"}>
                <Suspense fallback={<LoadingCircle />}>
                    <Await resolve={OtPage}>
                        <OtPage />
                    </Await>
                </Suspense>
            </ProtectedRoute>
    },
    {
        path: "/AllUser",
        element:
            <ProtectedRoute type={typesUsers.Administrador} newPage={"/OtAsingPages"}>
                <Suspense fallback={<LoadingCircle />}>
                    <Await resolve={AllUser}>
                        <AllUser />
                    </Await>
                </Suspense>
            </ProtectedRoute>
    },
    {
        path: "/estadisticas",
        element:
            <ProtectedRoute type={typesUsers.Administrador} newPage={"/OtAsingPages"}>
                <Suspense fallback={<LoadingCircle />}>
                    <Await resolve={StatisticsPage}>
                        <StatisticsPage />
                    </Await>
                </Suspense>
            </ProtectedRoute>
    },
    {
        path: "/events/:id",
        element:
            <ProtectedRoute>
                <Suspense fallback={<LoadingCircle />}>
                    <Await resolve={OtAllData}>
                        <OtAllData />
                    </Await>
                </Suspense>
            </ProtectedRoute>
    },
    {
        path: "/configuración",
        element:
            <ProtectedRoute type={typesUsers.Administrador} newPage={"/OtAsingPages"}>
                <Suspense fallback={<LoadingCircle />}>
                    <Await resolve={ConfigurationPage}>
                        <ConfigurationPage />
                    </Await>
                </Suspense>
            </ProtectedRoute>
    },
    {
        path: "/Remito/:id",
        element:
            <ProtectedRoute>
                <Suspense fallback={<LoadingCircle />}>
                    <Await resolve={Remito}>
                        <Remito />
                    </Await>
                </Suspense>
            </ProtectedRoute>
    },
    {
        path: "/Etiqueta/:id/:count",
        element:
            <ProtectedRoute>
                <Suspense fallback={<LoadingCircle />}>
                    <Await resolve={Etiquetas}>
                        <Etiquetas />
                    </Await>
                </Suspense>
            </ProtectedRoute>
    },
    {
        path: "/Etiqueta/:id",
        element:
            <ProtectedRoute>
                <Suspense fallback={<LoadingCircle />}>
                    <Await resolve={Etiquetas}>
                        <Etiquetas />
                    </Await>
                </Suspense>
            </ProtectedRoute>
    },
]);