import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './shared/components/layout/header/Header';
import Nav from './shared/components/layout/nav/Nav';
import NavLinkItem from './shared/components/layout/nav/NavLinkItem';
import NavList from './shared/components/layout/nav/NavList';
import ShadCnTable from './shared/components/ui/table/ShadCnTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function Preview() {
  return (
    <QueryClientProvider client={queryClient}>
      <Nav>
        <NavList>
          <NavLinkItem to="/" label='Home' />
          <NavLinkItem to="/features" label='Features' />
          <NavLinkItem to="/pricing" label='Pricing' />
          <NavLinkItem to="/about" label='About' />
        </NavList>
      </Nav>
    </QueryClientProvider>
  );
}

const App = () => {

  return (
    <BrowserRouter>
      <div>
        <Header children={<Preview />} style={{ backgroundImage: "linear-gradient(to right, #06b6d4, #3b82f6)" }} />
        <ShadCnTable />
      </div>
    </BrowserRouter>
  );
};

export default App


/*<div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        
        <Link to="/cryptos" search={{
          q: "eth"
        }} className="[&.active]:font-bold">
          Cryptos
        </Link>
      </div>
      <hr />
      <Outlet />*/
      