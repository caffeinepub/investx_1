import { AlertTriangle, X } from "lucide-react";

interface RiskWarningModalProps {
  onClose: () => void;
}

export default function RiskWarningModal({ onClose }: RiskWarningModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Close disclaimer"
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Investment Disclaimer
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Investing in stocks, mutual funds, and bonds involves market
              risks. Please read all scheme-related documents carefully before
              investing. Past performance is not indicative of future results.
            </p>
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm font-semibold text-red-700">
                ⚠️ It may be risky — please signup at your own risk and
                responsibility.
              </p>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Mutual Fund investments are subject to market risks. SEBI
              Registration No: ABC123456789
            </p>
          </div>
        </div>
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors text-sm"
          >
            I Understand, Proceed
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
