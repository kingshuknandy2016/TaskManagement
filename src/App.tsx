import React from "react";
import "./App.css";
import { ThemeProvider } from "./Theme";
import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { store } from "./store";
import { Provider } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <React.Fragment>
      <ThemeProvider>
        <ErrorBoundary>
          <AuthProvider>
            <Provider store={store}>
              <BrowserRouter>
                <div className="min-h-screen flex items-center justify-center p-4 font-serif w-full h-full">
                  <Router />
                </div>
              </BrowserRouter>
            </Provider>
          </AuthProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
