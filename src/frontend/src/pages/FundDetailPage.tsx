import { ArrowLeft, Bookmark, BookmarkCheck, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getFundById } from "../data/funds";
import { useAuth } from "../hooks/useAuth";
import { usePortfolio } from "../hooks/usePortfolio";
import { useWatchlist } from "../hooks/useWatchlist";

export default function FundDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fund = id ? getFundById(id) : undefined;
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { buy } = usePortfolio();
  const { isLoggedIn } = useAuth();
  const [amount, setAmount] = useState(1000);
  const [txMsg, setTxMsg] = useState("");

  if (!fund)
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Fund not found</h2>
          <button
            type="button"
            onClick={() => navigate("/markets?tab=funds")}
            className="mt-4 text-brand font-medium"
          >
            Back to Funds
          </button>
        </div>
      </div>
    );

  const inWatch = isInWatchlist(fund.id, "fund");

  const returnsData = [
    { period: "1Y", value: fund.returns1Y },
    { period: "3Y", value: fund.returns3Y },
    { period: "5Y", value: fund.returns5Y },
  ];

  const riskColors: Record<string, string> = {
    Low: "#16a34a",
    Moderate: "#d97706",
    High: "#ea580c",
    "Very High": "#dc2626",
  };

  const handleInvest = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    const units = Number.parseFloat((amount / fund.nav).toFixed(3));
    buy({
      id: fund.id,
      type: "fund",
      name: fund.name,
      quantity: units,
      currentPrice: fund.nav,
      price: fund.nav,
    });
    setTxMsg(
      `Invested Rs.${amount.toLocaleString("en-IN")} in ${fund.name} (${units} units)`,
    );
    setTimeout(() => setTxMsg(""), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          type="button"
          onClick={() => navigate("/markets?tab=funds")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Funds
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-xl font-extrabold text-gray-900">
                  {fund.name}
                </h1>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {fund.category}
                </span>
                <span
                  className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{
                    background: `${riskColors[fund.riskRating]}20`,
                    color: riskColors[fund.riskRating],
                  }}
                >
                  {fund.riskRating} Risk
                </span>
              </div>
              <div className="text-sm text-gray-500">{fund.fundHouse}</div>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl font-extrabold text-gray-900">
                  Rs.{fund.nav}
                </span>
                <span className="text-sm text-gray-500">NAV per unit</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                inWatch
                  ? removeFromWatchlist(fund.id, "fund")
                  : addToWatchlist({
                      id: fund.id,
                      type: "fund",
                      name: fund.name,
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
              <h2 className="font-bold text-gray-900 mb-4">
                Historical Returns
              </h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={returnsData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
                >
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    formatter={(v: number) => [`${v}%`, "Returns"]}
                    contentStyle={{ borderRadius: "12px", fontSize: 12 }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {returnsData.map((entry) => (
                      <Cell
                        key={entry.period}
                        fill={
                          entry.period === "1Y"
                            ? "#00d09c"
                            : entry.period === "3Y"
                              ? "#00b085"
                              : "#008f6b"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Fund Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  ["AUM", `Rs.${fund.aum}`],
                  [
                    "Min Investment",
                    `Rs.${fund.minInvestment.toLocaleString("en-IN")}`,
                  ],
                  ["1Y Returns", `${fund.returns1Y}%`],
                  ["3Y Returns", `${fund.returns3Y}%`],
                  ["5Y Returns", `${fund.returns5Y}%`],
                  ["Risk Rating", fund.riskRating],
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
              <h2 className="font-bold text-gray-900 mb-2">About this Fund</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {fund.description}
              </p>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-4">Invest Now</h2>
              <div className="mb-4">
                <label
                  htmlFor="fund-amount"
                  className="text-xs font-medium text-gray-600 block mb-1.5"
                >
                  Investment Amount (Rs.)
                </label>
                <input
                  id="fund-amount"
                  type="number"
                  min={fund.minInvestment}
                  step={100}
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      Math.max(
                        fund.minInvestment,
                        Number.parseInt(e.target.value) || fund.minInvestment,
                      ),
                    )
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand"
                />
                <div className="text-xs text-gray-400 mt-1">
                  Min. Rs.{fund.minInvestment.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Units</span>
                  <span className="font-semibold">
                    {(amount / fund.nav).toFixed(3)}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">NAV</span>
                  <span className="font-bold">Rs.{fund.nav}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleInvest}
                className="w-full py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-colors text-sm flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-4 h-4" /> Invest Now
              </button>
              {txMsg && (
                <div className="mt-3 p-3 bg-green-50 rounded-xl text-xs text-green-700 text-center">
                  {txMsg}
                </div>
              )}
              {!isLoggedIn && (
                <p className="mt-2 text-xs text-gray-400 text-center">
                  Login required to invest
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
