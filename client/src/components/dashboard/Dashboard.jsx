import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import Profile from "../profile/Profile";
import ProductList from "../products/ProductList";

function Dashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Taaga Women
              </h1>
              <span className="ml-4 text-sm text-gray-600 hidden sm:inline">
                Welcome back, <span className="font-semibold text-gray-800">{session.user.email}</span>
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary text-sm"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("home")}
              className={`tab-button ${activeTab === "home" ? "tab-button-active" : "text-gray-600"}`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </span>
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`tab-button ${activeTab === "products" ? "tab-button-active" : "text-gray-600"}`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Products
              </span>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`tab-button ${activeTab === "profile" ? "tab-button-active" : "text-gray-600"}`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="fade-in">
          {activeTab === "home" && (
            <div className="card">
              <div className="text-center py-8">
                <div className="mb-6">
                  <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 mb-4">
                    <svg className="h-10 w-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                  <p className="text-gray-600 text-lg mb-6">
                    Manage your profile and explore our products
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg">
                    <div className="text-2xl font-bold text-pink-600 mb-1">Profile</div>
                    <p className="text-sm text-gray-600">Update your personal information</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">Products</div>
                    <p className="text-sm text-gray-600">Browse our collection</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-rose-600 mb-1">Dashboard</div>
                    <p className="text-sm text-gray-600">Your personal space</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div>
              <ProductList />
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <Profile user={session.user} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
