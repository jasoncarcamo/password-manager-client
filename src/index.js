import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App';
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "./contexts/UserContext/UserContext";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <BrowserRouter>    
        <UserProvider>
            <App/>
        </UserProvider>    
    </BrowserRouter>);