import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/shared/NavBar';

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
