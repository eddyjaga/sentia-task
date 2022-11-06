import React from 'react';
import { createRoot } from 'react-dom/client';
import ImportFile from './components/ImportFile';
import TableList from './components/TableList';


export const AppContext = React.createContext(null);

function App() {
    return (
        <>
            <nav className="navbar navbar-light bg-light">
              <a className="navbar-brand" href="">Sentia coding test</a>
            </nav>

            <div className="container mt-3">
              <div className="row">
                  <ImportFile />
                  <TableList/>
              </div>
            </div>
        </>
    )
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);

export default App