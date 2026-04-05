import {
  ArrowRight,
  BarChart3,
  Shield,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RiskWarningModal from "../components/RiskWarningModal";
import { getTopGainers, getTopLosers } from "../data/stocks";

export default function LandingPage() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("investx_warning_seen");
    if (!seen) setShowWarning(true);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("investx_warning_seen", "1");
    setShowWarning(false);
  };

  const gainers = getTopGainers(4);
  const losers = getTopLosers(4);

  const indices = [
    { name: "SENSEX", value: "72,845.12", pct: "+0.43%", up: true },
    { name: "NIFTY 50", value: "22,147.90", pct: "+0.43%", up: true },
    { name: "NIFTY BANK", value: "46,834.55", pct: "-0.27%", up: false },
    { name: "NIFTY IT", value: "35,678.40", pct: "+1.61%", up: true },
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      desc: "Bank-grade security with 2FA and encrypted transactions",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Execution",
      desc: "Lightning-fast order execution at the best available prices",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-time Data",
      desc: "Live market data with advanced charts and technical analysis",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "1Cr+ Investors",
      desc: "Trusted by over 1 crore investors across India",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {showWarning && <RiskWarningModal onClose={handleClose} />}

      <section className="bg-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 mb-10">
            {indices.map((idx) => (
              <div
                key={idx.name}
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl"
              >
                <div>
                  <div className="text-xs text-gray-500 font-medium">
                    {idx.name}
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {idx.value}
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-semibold ${idx.up ? "text-green-600" : "text-red-500"}`}
                >
                  {idx.up ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {idx.pct}
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand/10 text-brand text-sm font-semibold rounded-full mb-4">
                <Star className="w-3.5 h-3.5" /> #1 Investment Platform in India
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Invest in Stocks,
                <br />
                <span className="text-brand">Mutual Funds</span> &amp;
                <br />
                Bonds
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Start investing with as little as Rs.100. Access 5000+ stocks,
                2000+ mutual funds, and government bonds all in one platform.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/login"
                  className="px-6 py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-colors shadow-lg flex items-center gap-2"
                >
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/markets"
                  className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:border-brand hover:text-brand transition-colors flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" /> Explore Markets
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">
                    Rs.0
                  </div>
                  <div className="text-sm text-gray-500">
                    Commission on stocks
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">
                    5000+
                  </div>
                  <div className="text-sm text-gray-500">Stocks listed</div>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">
                    2000+
                  </div>
                  <div className="text-sm text-gray-500">Mutual funds</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-brand/5 to-blue-50 rounded-2xl p-6 border border-gray-100">
                <div className="font-semibold text-gray-700 mb-3 text-sm">
                  Top Gainers Today
                </div>
                <div className="space-y-2">
                  {gainers.map((s) => (
                    <Link
                      to={`/stock/${s.id}`}
                      key={s.id}
                      className="flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-sm transition-shadow"
                    >
                      <div>
                        <div className="font-semibold text-sm text-gray-900">
                          {s.ticker}
                        </div>
                        <div className="text-xs text-gray-500">{s.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm text-gray-900">
                          Rs.{s.currentPrice.toLocaleString("en-IN")}
                        </div>
                        <div className="text-xs font-semibold text-green-600">
                          +{s.changePercent}%
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">
            Why Choose InvestX?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" /> Top Gainers
                </h2>
                <Link to="/markets" className="text-brand text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-2">
                {gainers.map((s) => (
                  <Link
                    to={`/stock/${s.id}`}
                    key={s.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-sm text-gray-900">
                        {s.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {s.ticker} &middot; {s.sector}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">
                        Rs.{s.currentPrice.toLocaleString("en-IN")}
                      </div>
                      <div className="text-xs font-semibold text-green-600">
                        +{s.changePercent}%
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-500" /> Top Losers
                </h2>
                <Link to="/markets" className="text-brand text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-2">
                {losers.map((s) => (
                  <Link
                    to={`/stock/${s.id}`}
                    key={s.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-sm text-gray-900">
                        {s.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {s.ticker} &middot; {s.sector}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">
                        Rs.{s.currentPrice.toLocaleString("en-IN")}
                      </div>
                      <div className="text-xs font-semibold text-red-500">
                        {s.changePercent}%
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-brand" />
            <span className="text-white font-bold text-lg">InvestX</span>
          </div>
          <p className="text-xs leading-relaxed max-w-2xl">
            Disclaimer: Investments in securities market are subject to market
            risks. Read all the related documents carefully before investing.
            InvestX is a simulation platform for educational purposes. Past
            performance is not indicative of future results. Please invest at
            your own risk and responsibility.
          </p>
          <div className="mt-6 pt-6 border-t border-gray-800 text-xs">
            &copy; 2025 InvestX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
