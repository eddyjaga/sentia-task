import React from 'react';
import { createRoot } from 'react-dom/client';
import ImportFile from './components/ImportFile';
import { useState } from 'react';

export const AppContext = React.createContext(null);

function App() {
    const [latestPost, setLatestPost] = useState(AppContext);
    
    return (
        <AppContext.Provider value={{ latestPost, setLatestPost}}>
            <div className="container">
                <h1>Sentia coding test</h1>
                <ImportFile />
            </div>
        </AppContext.Provider>
    )
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);

export default App