import {
  BarChart3,
  Bookmark,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { funds } from "../data/funds";
import { stocks } from "../data/stocks";
import { useAuth } from "../hooks/useAuth";
import { usePortfolio } from "../hooks/usePortfolio";
import { useWatchlist } from "../hooks/useWatchlist";

export default function DashboardPage() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { holdings, totalInvested, currentValue, totalPnL, pnlPercent } =
    usePortfolio();
  const { watchlist, removeFromWatchlist } = useWatchlist();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  const isPnLPositive = totalPnL >= 0;

  const getInstrumentLink = (id: string, type: string) => {
    if (type === "stock") return `/stock/${id}`;
    if (type === "fund") return `/fund/${id}`;
    return "/markets?tab=bonds";
  };

  const getPnLColor = (avgBuy: number, current: number) => {
    const pnl = current - avgBuy;
    return pnl >= 0 ? "text-green-600" : "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">
            Welcome back, {user?.name.split(" ")[0]}!
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Here is your portfolio overview
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Total Invested
              </span>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">
              Rs.
              {totalInvested.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-brand" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Current Value
              </span>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">
              Rs.
              {currentValue.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </div>
          </div>
          <div
            className={`rounded-2xl border p-5 ${
              isPnLPositive
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isPnLPositive ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {isPnLPositive ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
              </div>
              <span className="text-sm font-medium text-gray-600">
                Total P&amp;L
              </span>
            </div>
            <div
              className={`text-2xl font-extrabold ${isPnLPositive ? "text-green-700" : "text-red-600"}`}
            >
              {isPnLPositive ? "+" : ""}Rs.
              {Math.abs(totalPnL).toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </div>
            <div
              className={`text-sm font-semibold mt-0.5 ${isPnLPositive ? "text-green-600" : "text-red-500"}`}
            >
              {isPnLPositive ? "+" : ""}
              {pnlPercent.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 mb-6">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Holdings</h2>
          </div>
          {holdings.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-3">&#x1F4C8;</div>
              <div className="text-gray-500 text-sm">
                No holdings yet. Start investing!
              </div>
              <Link
                to="/markets"
                className="mt-3 inline-block text-brand text-sm font-medium"
              >
                Explore Markets
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">
                      Instrument
                    </th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">
                      Type
                    </th>
                    <th className="text-right px-5 py-3 font-semibold text-gray-600">
                      Qty
                    </th>
                    <th className="text-right px-5 py-3 font-semibold text-gray-600">
                      Avg Buy
                    </th>
                    <th className="text-right px-5 py-3 font-semibold text-gray-600">
                      Curr Price
                    </th>
                    <th className="text-right px-5 py-3 font-semibold text-gray-600">
                      P&amp;L
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h) => {
                    const pnl =
                      (h.currentPrice - h.averageBuyPrice) * h.quantity;
                    const pnlPct =
                      ((h.currentPrice - h.averageBuyPrice) /
                        h.averageBuyPrice) *
                      100;
                    return (
                      <tr
                        key={`${h.type}-${h.id}`}
                        className="border-b border-gray-50 hover:bg-gray-50"
                      >
                        <td className="px-5 py-3">
                          <Link
                            to={getInstrumentLink(h.id, h.type)}
                            className="hover:text-brand"
                          >
                            <div className="font-semibold text-gray-900">
                              {h.name}
                            </div>
                            {h.ticker && (
                              <div className="text-xs text-gray-500">
                                {h.ticker}
                              </div>
                            )}
                          </Link>
                        </td>
                        <td className="px-5 py-3">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              h.type === "stock"
                                ? "bg-blue-50 text-blue-700"
                                : h.type === "fund"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-purple-50 text-purple-700"
                            }`}
                          >
                            {h.type}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right text-gray-900">
                          {h.quantity}
                        </td>
                        <td className="px-5 py-3 text-right text-gray-600">
                          Rs.
                          {h.averageBuyPrice.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-5 py-3 text-right font-semibold text-gray-900">
                          Rs.
                          {h.currentPrice.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          className={`px-5 py-3 text-right font-semibold ${getPnLColor(h.averageBuyPrice, h.currentPrice)}`}
                        >
                          {pnl >= 0 ? "+" : ""}Rs.
                          {Math.abs(pnl).toLocaleString("en-IN", {
                            maximumFractionDigits: 0,
                          })}
                          <div className="text-xs">
                            {pnlPct >= 0 ? "+" : ""}
                            {pnlPct.toFixed(2)}%
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Bookmark className="w-4 h-4" /> Watchlist
            </h2>
          </div>
          {watchlist.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-3xl mb-3">&#x1F516;</div>
              <div className="text-gray-500 text-sm">
                No items in your watchlist. Add stocks and funds to track them.
              </div>
              <Link
                to="/markets"
                className="mt-3 inline-block text-brand text-sm font-medium"
              >
                Browse Markets
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {watchlist.map((w) => {
                const stock =
                  w.type === "stock" ? stocks.find((s) => s.id === w.id) : null;
                const fund =
                  w.type === "fund" ? funds.find((f) => f.id === w.id) : null;
                return (
                  <div
                    key={`${w.type}-${w.id}`}
                    className="flex items-center justify-between px-5 py-4 hover:bg-gray-50"
                  >
                    <Link
                      to={getInstrumentLink(w.id, w.type)}
                      className="flex items-center gap-3 flex-1 hover:text-brand"
                    >
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          w.type === "stock"
                            ? "bg-blue-50 text-blue-700"
                            : w.type === "fund"
                              ? "bg-green-50 text-green-700"
                              : "bg-purple-50 text-purple-700"
                        }`}
                      >
                        {w.type}
                      </span>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {w.name}
                        </div>
                        {w.ticker && (
                          <div className="text-xs text-gray-500">
                            {w.ticker}
                          </div>
                        )}
                      </div>
                    </Link>
                    {stock && (
                      <div className="text-right mr-4">
                        <div className="font-semibold text-sm">
                          Rs.{stock.currentPrice.toLocaleString("en-IN")}
                        </div>
                        <div
                          className={`text-xs font-semibold ${stock.changePercent >= 0 ? "text-green-600" : "text-red-500"}`}
                        >
                          {stock.changePercent >= 0 ? "+" : ""}
                          {stock.changePercent}%
                        </div>
                      </div>
                    )}
                    {fund && (
                      <div className="text-right mr-4">
                        <div className="font-semibold text-sm">
                          Rs.{fund.nav} NAV
                        </div>
                        <div className="text-xs font-semibold text-green-600">
                          {fund.returns1Y}% 1Y
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFromWatchlist(w.id, w.type)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      aria-label="Remove from watchlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
