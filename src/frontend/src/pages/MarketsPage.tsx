import {
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { bonds } from "../data/bonds";
import { funds, getCategories } from "../data/funds";
import { getSectors, stocks } from "../data/stocks";
import { useWatchlist } from "../hooks/useWatchlist";

type Tab = "stocks" | "funds" | "bonds";
type SortDir = "asc" | "desc";

export default function MarketsPage() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as Tab | null;
  const [tab, setTab] = useState<Tab>(
    tabParam === "funds" ? "funds" : tabParam === "bonds" ? "bonds" : "stocks",
  );
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All");
  const [category, setCategory] = useState("All");
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const sectors = ["All", ...getSectors()];
  const categories = ["All", ...getCategories()];

  const handleSort = (field: string) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ field }: { field: string }) =>
    sortField === field ? (
      sortDir === "asc" ? (
        <ChevronUp className="w-3.5 h-3.5" />
      ) : (
        <ChevronDown className="w-3.5 h-3.5" />
      )
    ) : (
      <ChevronDown className="w-3.5 h-3.5 opacity-30" />
    );

  const filteredStocks = useMemo(() => {
    const list = stocks
      .filter(
        (s) =>
          (sector === "All" || s.sector === sector) &&
          (search === "" ||
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.ticker.toLowerCase().includes(search.toLowerCase())),
      )
      .slice();
    list.sort((a, b) => {
      const v =
        sortField === "price"
          ? a.currentPrice - b.currentPrice
          : sortField === "change"
            ? a.changePercent - b.changePercent
            : a.name.localeCompare(b.name);
      return sortDir === "asc" ? v : -v;
    });
    return list;
  }, [search, sector, sortField, sortDir]);

  const filteredFunds = useMemo(() => {
    const list = funds
      .filter(
        (f) =>
          (category === "All" || f.category === category) &&
          (search === "" ||
            f.name.toLowerCase().includes(search.toLowerCase())),
      )
      .slice();
    list.sort((a, b) => {
      const v =
        sortField === "nav"
          ? a.nav - b.nav
          : sortField === "returns"
            ? a.returns1Y - b.returns1Y
            : a.name.localeCompare(b.name);
      return sortDir === "asc" ? v : -v;
    });
    return list;
  }, [search, category, sortField, sortDir]);

  const filteredBonds = useMemo(() => {
    const list = bonds
      .filter(
        (b) =>
          search === "" ||
          b.name.toLowerCase().includes(search.toLowerCase()) ||
          b.issuer.toLowerCase().includes(search.toLowerCase()),
      )
      .slice();
    list.sort((a, b) => {
      const v =
        sortField === "yield"
          ? a.yieldToMaturity - b.yieldToMaturity
          : sortField === "coupon"
            ? a.couponRate - b.couponRate
            : a.name.localeCompare(b.name);
      return sortDir === "asc" ? v : -v;
    });
    return list;
  }, [search, sortField, sortDir]);

  const riskColor: Record<string, string> = {
    Low: "bg-green-100 text-green-700",
    Moderate: "bg-yellow-100 text-yellow-700",
    High: "bg-orange-100 text-orange-700",
    "Very High": "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">Markets</h1>
          <p className="text-gray-500 text-sm mt-1">
            Explore stocks, mutual funds, and bonds listed in India
          </p>
        </div>

        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6 w-fit">
          {(
            [
              ["stocks", "Stocks"],
              ["funds", "Mutual Funds"],
              ["bonds", "Bonds"],
            ] as [Tab, string][]
          ).map(([t, label]) => (
            <button
              type="button"
              key={t}
              onClick={() => {
                setTab(t);
                setSearch("");
              }}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === t
                  ? "bg-brand text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${tab}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand w-64"
            />
          </div>
          {tab === "stocks" && (
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand"
            >
              {sectors.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          )}
          {tab === "funds" && (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          )}
        </div>

        {tab === "stocks" && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">
                      #
                    </th>
                    <th
                      className="text-left px-4 py-3 font-semibold text-gray-600 cursor-pointer"
                      onClick={() => handleSort("name")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          () => handleSort("name");
                      }}
                    >
                      <div className="flex items-center gap-1">
                        Company <SortIcon field="name" />
                      </div>
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">
                      Sector
                    </th>
                    <th
                      className="text-right px-4 py-3 font-semibold text-gray-600 cursor-pointer"
                      onClick={() => handleSort("price")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          () => handleSort("price");
                      }}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Price <SortIcon field="price" />
                      </div>
                    </th>
                    <th
                      className="text-right px-4 py-3 font-semibold text-gray-600 cursor-pointer"
                      onClick={() => handleSort("change")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          () => handleSort("change");
                      }}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Change <SortIcon field="change" />
                      </div>
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">
                      Mkt Cap
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">
                      Volume
                    </th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filteredStocks.map((s, i) => (
                    <tr
                      key={s.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/stock/${s.id}`}
                          className="hover:text-brand"
                        >
                          <div className="font-semibold text-gray-900">
                            {s.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {s.ticker}
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                          {s.sector}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        Rs.{s.currentPrice.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div
                          className={`flex items-center justify-end gap-1 font-semibold ${
                            s.changePercent >= 0
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {s.changePercent >= 0 ? (
                            <TrendingUp className="w-3.5 h-3.5" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5" />
                          )}
                          {s.changePercent >= 0 ? "+" : ""}
                          {s.changePercent}%
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600 hidden md:table-cell">
                        {s.marketCap}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600 hidden lg:table-cell">
                        {s.volume}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() =>
                            isInWatchlist(s.id, "stock")
                              ? removeFromWatchlist(s.id, "stock")
                              : addToWatchlist({
                                  id: s.id,
                                  type: "stock",
                                  name: s.name,
                                  ticker: s.ticker,
                                })
                          }
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                          aria-label={
                            isInWatchlist(s.id, "stock")
                              ? "Remove from watchlist"
                              : "Add to watchlist"
                          }
                        >
                          {isInWatchlist(s.id, "stock") ? (
                            <BookmarkCheck className="w-4 h-4 text-brand" />
                          ) : (
                            <Bookmark className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "funds" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFunds.map((f) => (
              <Link
                to={`/fund/${f.id}`}
                key={f.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow block"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm leading-snug">
                      {f.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {f.fundHouse}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isInWatchlist(f.id, "fund")) {
                        removeFromWatchlist(f.id, "fund");
                      } else {
                        addToWatchlist({
                          id: f.id,
                          type: "fund",
                          name: f.name,
                        });
                      }
                    }}
                    className="p-1 rounded-lg hover:bg-gray-100"
                    aria-label={
                      isInWatchlist(f.id, "fund")
                        ? "Remove from watchlist"
                        : "Add to watchlist"
                    }
                  >
                    {isInWatchlist(f.id, "fund") ? (
                      <BookmarkCheck className="w-4 h-4 text-brand" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {f.category}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskColor[f.riskRating] || "bg-gray-100 text-gray-600"}`}
                  >
                    {f.riskRating}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-500">NAV</div>
                    <div className="font-bold text-gray-900 text-sm">
                      Rs.{f.nav}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">1Y Returns</div>
                    <div className="font-bold text-green-600 text-sm">
                      {f.returns1Y}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">3Y Returns</div>
                    <div className="font-bold text-green-600 text-sm">
                      {f.returns3Y}%
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {tab === "bonds" && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">
                      Bond Name
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">
                      Type
                    </th>
                    <th
                      className="text-right px-4 py-3 font-semibold text-gray-600 cursor-pointer"
                      onClick={() => handleSort("coupon")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          () => handleSort("coupon");
                      }}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Coupon Rate <SortIcon field="coupon" />
                      </div>
                    </th>
                    <th
                      className="text-right px-4 py-3 font-semibold text-gray-600 cursor-pointer"
                      onClick={() => handleSort("yield")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          () => handleSort("yield");
                      }}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Yield <SortIcon field="yield" />
                      </div>
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">
                      Maturity
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">
                      Rating
                    </th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filteredBonds.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-900">
                          {b.name}
                        </div>
                        <div className="text-xs text-gray-500">{b.issuer}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            b.type === "Government"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-purple-50 text-purple-700"
                          }`}
                        >
                          {b.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {b.couponRate}%
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-green-600">
                        {b.yieldToMaturity}%
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600 hidden md:table-cell">
                        {b.maturityDate}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-bold">
                          {b.rating}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() =>
                            isInWatchlist(b.id, "bond")
                              ? removeFromWatchlist(b.id, "bond")
                              : addToWatchlist({
                                  id: b.id,
                                  type: "bond",
                                  name: b.name,
                                })
                          }
                          className="p-1.5 rounded-lg hover:bg-gray-100"
                          aria-label={
                            isInWatchlist(b.id, "bond")
                              ? "Remove from watchlist"
                              : "Add to watchlist"
                          }
                        >
                          {isInWatchlist(b.id, "bond") ? (
                            <BookmarkCheck className="w-4 h-4 text-brand" />
                          ) : (
                            <Bookmark className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
