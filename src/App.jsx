import { lazy } from 'react';
import './App.css';
import { selectIsRefreshing } from './redux/auth/selectors.js';
import { useSelector } from 'react-redux';
import Loader from './components/Loader/Loader.jsx';
import MainLayout from './components/MainLayout/MainLayout.jsx';
import { Route, Routes } from 'react-router-dom';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import DictionaryPage from './pages/DictionaryPage/DictionaryPage.jsx';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage.jsx'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);

  return isRefreshing ? (
    <Loader />
  ) : (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              component={<SignUpPage />}
              redirectTo="/dictionary"
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute
              component={<SignInPage />}
              redirectTo="/dictionary"
            />
          }
        />
        <Route
          path="/dictionary"
          element={
            <PrivateRoute component={<DictionaryPage />} redirectTo="/login" />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
