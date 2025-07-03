import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Brain,Map,Home, BarChart3, Menu, X,LogOutIcon } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logoutUser,loginUser } = useAuth();
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", to: "/", icon: Home },
    { name: "My Roadmaps", to: "/roadmaps", icon: Map },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className=" bg-gray-900/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white-800">SkillForge</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md text-sm font-medium transition ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-white-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </NavLink>
              );
            })}

            {/* Profile */}
            {user && (
              <div className="relative ml-4" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold"
                >
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2 border border-gray-200 z-50">
                    <button
                      onClick={() => {
                        logoutUser();
                        navigate("/login");
                      }}
                      className=" w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex justify-center "
                    >
                     <span>Logout</span> <LogOutIcon className="h-4 w-4 mt-1.5 mx-2"/>
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-white-700 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    `w-full flex items-center px-4 py-3 text-left text-sm font-medium transition ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-white-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </NavLink>
              );
            })}

            {user && (
              <div className="border-t border-gray-200 mt-2 px-4 py-2">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={() => {
                      logoutUser();
                      navigate("/login");
                    }}
                    className="text-sm text-white-600 hover:underline flex justify-center"
                  >
                   <span>Logout</span> <LogOutIcon className="h-4 w-4 mt-1.5 mx-2"/>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
