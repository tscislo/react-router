import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {HarryPotterComponent} from "./harry-potter-component/harry-potter.component.tsx";
import {ErrorPage} from "./error-page/error-page.component.tsx";
import {CharacterComponent} from "./character-component/character.component.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HarryPotterComponent/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "character/:id",
                element: <CharacterComponent />,
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
