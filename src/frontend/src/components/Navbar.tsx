import { Bell, LogOut, Menu, Search, TrendingUp, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { bonds } from "../data/bonds";
import { funds } from "../data/funds";
import { stocks } from "../data/stocks";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout, isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const results =
    search.length >= 2
      ? [
          ...stocks
            .filter(
              (s) =>
                s.name.toLowerCase().includes(search.toLowerCase()) ||
                s.ticker.toLowerCase().includes(search.toLowerCase()),
            )
            .slice(0, 3)
            .map((s) => ({
              id: s.id,
              name: s.name,
              sub: s.ticker,
              type: "stock" as const,
              path: `/stock/${s.id}`,
            })),
          ...funds
            .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
            .slice(0, 2)
            .map((f) => ({
              id: f.id,
              name: f.name,
              sub: f.category,
              type: "fund" as const,
              path: `/fund/${f.id}`,
            })),
          ...bonds
            .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
            .slice(0, 2)
            .map((b) => ({
              id: b.id,
              name: b.name,
              sub: b.rating,
              type: "bond" as const,
              path: "/markets?tab=bonds",
            })),
        ]
      : [];

  const navLinks = [
    { to: "/markets", label: "Markets" },
    { to: "/markets?tab=funds", label: "Mutual Funds" },
    { to: "/markets?tab=bonds", label: "Bonds" },
    { to: "/dashboard", label: "Portfolio" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-brand">InvestX</span>
        </Link>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-1 ml-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to.split("?")[0]
                  ? "text-brand bg-brand/10"
                  : "text-gray-600 hover:text-brand hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search stocks, funds..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand focus:bg-white transition-colors"
          />
          {showResults && results.length > 0 && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
              {results.map((r) => (
                <button
                  type="button"
                  key={`${r.type}-${r.id}`}
                  onMouseDown={() => {
                    navigate(r.path);
                    setSearch("");
                    setShowResults(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                >
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      r.type === "stock"
                        ? "bg-blue-100 text-blue-700"
                        : r.type === "fund"
                          ? "bg-green-100 text-green-700"
                          : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {r.type}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {r.name}
                    </div>
                    <div className="text-xs text-gray-500">{r.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-50"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {user?.name.split(" ")[0]}
                </span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors"
            >
              Login / Sign Up
            </Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle menu"
        >
          {mobileMenu ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenu(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {link.label}
            </Link>
          ))}
          {!isLoggedIn && (
            <Link
              to="/login"
              onClick={() => setMobileMenu(false)}
              className="mt-2 px-4 py-2 bg-brand text-white text-sm font-semibold rounded-lg text-center"
            >
              Login / Sign Up
            </Link>
          )}
          {isLoggedIn && (
            <button
              type="button"
              onClick={() => {
                logout();
                setMobileMenu(false);
              }}
              className="mt-2 px-4 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
