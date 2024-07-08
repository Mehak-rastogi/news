// App.js
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import NewsPage from './Components/NewsPage';
import LoadingBar from 'react-top-loading-bar'
import { useState } from "react";

function App() {
  // const theme = 'light'; // Example theme
  const [progress, setProgress] = useState(0)
  return (
    <Router>
     <div className="App">
     <LoadingBar
            color="blue"
            progress={progress}
            // onLoaderFinished={() => setProgress(0)}
          />
     <Navbar/>
      <Routes>
   
     <Route
              exact
              path="/"
              element={<NewsPage setProgress={setProgress} key="general" country="in" category="general" />}
            />
       <Route
              exact
              path="/business"
              element={<NewsPage setProgress={setProgress} key="business" country="in" category="business" />}
            />
             <Route
              exact
              path="/health"
              element={<NewsPage setProgress={setProgress} key="health" country="in" category="health" />}
            />
             <Route
              exact
              path="/science"
              element={<NewsPage setProgress={setProgress} key="science" country="in" category="science" />}
            />
            <Route
              exact
              path="/entertainment"
              element={<NewsPage setProgress={setProgress} key="entertainment" country="in" category="entertainment" />}
            />
            <Route
              exact
              path="/sports"
              element={<NewsPage setProgress={setProgress} key="sports" country="in" category="sports" />}
            />
            <Route
              exact
              path="/technology"
              element={<NewsPage setProgress={setProgress} key="technology" country="in" category="technology" />}
            />
      {/* Other components */}
   
    </Routes>
    </div>
    </Router>
  );
}

export default App;
