// Views
import { useRoutes } from 'react-router-dom';
import { routesArray } from './routes';

export default function App(){
    const routes = useRoutes(routesArray)
    return routes;
}