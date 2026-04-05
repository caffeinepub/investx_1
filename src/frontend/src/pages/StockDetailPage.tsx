import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { generatePriceHistory, getStockById } from "../data/stocks";
import { useAuth } from "../hooks/useAuth";
import { usePortfolio } from "../hooks/usePortfolio";
import { useWatchlist } from "../hooks/useWatchlist";

export default function StockDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const stock = id ? getStockById(id) : undefined;
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { buy, sell, holdings } = usePortfolio();
  const { isLoggedIn } = useAuth();
  const [qty, setQty] = useState(1);
  const [period, setPeriod] = useState<"1W" | "1M" | "3M">("1M");
  const [txMsg, setTxMsg] = useState("");

  if (!stock)
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">&#x1F4C9;</div>
          <h2 className="text-xl font-bold text-gray-900">Stock not found</h2>
          <button
            type="button"
            onClick={() => navigate("/markets")}
            className="mt-4 text-brand font-medium"
          >
            Back to Markets
          </button>
        </div>
      </div>
    );

  const days = period === "1W" ? 7 : period === "1M" ? 30 : 90;
  const history = generatePriceHistory(stock, days);

  const holding = holdings.find((h) => h.id === stock.id && h.type === "stock");

  const handleBuy = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    buy({
      id: stock.id,
      type: "stock",
      name: stock.name,
      ticker: stock.ticker,
      quantity: qty,
      currentPrice: stock.currentPrice,
      price: stock.currentPrice,
    });
    setTxMsg(
      `Bought ${qty} shares of ${stock.ticker} at Rs.${stock.currentPrice.toLocaleString("en-IN")}`,
    );
    setTimeout(() => setTxMsg(""), 3000);
  };

  const handleSell = () => {
    if (!holding || holding.quantity < qty) {
      setTxMsg("Not enough shares to sell.");
      setTimeout(() => setTxMsg(""), 3000);
      return;
    }
    sell(stock.id, "stock", qty);
    setTxMsg(`Sold ${qty} shares of ${stock.ticker}`);
    setTimeout(() => setTxMsg(""), 3000);
  };

  const inWatch = isInWatchlist(stock.id, "stock");
  const isUp = stock.changePercent >= 0;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          type="button"
          onClick={() => navigate("/markets")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Markets
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-extrabold text-gray-900">
                  {stock.name}
                </h1>
                <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                  {stock.ticker}
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {stock.sector}
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-gray-900">
                  &#x20B9;{stock.currentPrice.toLocaleString("en-IN")}
                </span>
                <div
                  className={`flex items-center gap-1 text-base font-semibold ${isUp ? "text-green-600" : "text-red-500"}`}
                >
                  {isUp ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {isUp ? "+" : ""}
                  {stock.change} ({isUp ? "+" : ""}
                  {stock.changePercent}%)
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Prev Close: &#x20B9;
                {stock.previousClose.toLocaleString("en-IN")}
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                inWatch
                  ? removeFromWatchlist(stock.id, "stock")
                  : addToWatchlist({
                      id: stock.id,
                      type: "stock",
                      name: stock.name,
                      ticker: stock.ticker,
                    })
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-colors ${
                inWatch
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-gray-200 text-gray-600 hover:border-brand hover:text-brand"
              }`}
            >
              {inWatch ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              {inWatch ? "Watchlisted" : "Add to Watchlist"}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Price Chart</h2>
                <div className="flex gap-1">
                  {(["1W", "1M", "3M"] as const).map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        period === p
                          ? "bg-brand text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={history}
                  margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={false}
                    interval={Math.floor(days / 6)}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `Rs.${v.toLocaleString("en-IN")}`}
                    domain={["auto", "auto"]}
                    width={75}
                  />
                  <Tooltip
                    formatter={(v: number) => [
                      `Rs.${v.toLocaleString("en-IN")}`,
                      "Price",
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={isUp ? "#16a34a" : "#ef4444"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Key Statistics</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  ["Market Cap", stock.marketCap],
                  ["P/E Ratio", stock.pe.toString()],
                  ["52W High", `Rs.${stock.high52w.toLocaleString("en-IN")}`],
                  ["52W Low", `Rs.${stock.low52w.toLocaleString("en-IN")}`],
                  ["Volume", stock.volume],
                  ["Dividend Yield", `${stock.dividendYield}%`],
                ].map(([label, val]) => (
                  <div key={label} className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-xs text-gray-500 mb-1">{label}</div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-2">
                About {stock.name}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {stock.description}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-4">
                Trade {stock.ticker}
              </h2>
              {holding && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <div className="text-xs text-green-700 font-medium mb-1">
                    Your Holdings
                  </div>
                  <div className="text-sm font-bold text-green-800">
                    {holding.quantity} shares
                  </div>
                  <div className="text-xs text-green-600">
                    Avg: Rs.{holding.averageBuyPrice.toLocaleString("en-IN")}
                  </div>
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="stock-qty"
                  className="text-xs font-medium text-gray-600 block mb-1.5"
                >
                  Quantity
                </label>
                <input
                  id="stock-qty"
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, Number.parseInt(e.target.value) || 1))
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand"
                />
              </div>
              <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Price per share</span>
                  <span className="font-semibold">
                    Rs.{stock.currentPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="font-bold text-gray-900">
                    Rs.{(stock.currentPrice * qty).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleBuy}
                  className="flex-1 py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-colors text-sm"
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={handleSell}
                  className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors text-sm"
                >
                  Sell
                </button>
              </div>
              {txMsg && (
                <div className="mt-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-700 text-center">
                  {txMsg}
                </div>
              )}
              {!isLoggedIn && (
                <p className="mt-2 text-xs text-gray-400 text-center">
                  Login required to trade
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
