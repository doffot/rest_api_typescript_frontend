import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Product, { loader as productLoader, action as updateAvailabilityAction} from "./view/Product";
import NewProduct, { action as newProductAction } from "./view/NewProduct";
import EditProduct, {loader as editProductLoader, action as editProductAction} from "./view/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetail";

export const router = createBrowserRouter([


    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Product />,
                loader: productLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path:'productos/:id/editar', // ROA Pattern - Resource-orinted design
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'productos/:id/eliminar',
                action: deleteProductAction
            }
        ]
    }

])