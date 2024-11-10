import { LogOut, Package } from 'lucide-react';
import { Navigate, Route, Routes, useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import BoletoForm from './BoletoForm';
import BoletoList from './BoletoList';


export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Package className="h-6 w-6 text-blue-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  Admin Panel
                </span>
              </div>
              <div className="hidden md:flex space-x-4">
                <Link
                  to="products"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Produtos
                </Link>
                <Link
                  to="boletos"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Boletos
                </Link>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          <Route path="boletos" element={<BoletoList />} />
          <Route path="boletos/new" element={<BoletoForm />} />
          <Route path="*" element={<Navigate to="products" replace />} />
        </Routes>
      </main>
    </div>
  );
}