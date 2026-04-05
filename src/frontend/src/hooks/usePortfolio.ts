import { useCallback, useEffect, useState } from "react";

export interface Holding {
  id: string;
  type: "stock" | "fund" | "bond";
  name: string;
  ticker?: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
}

export function usePortfolio() {
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("investx_portfolio");
    if (stored) {
      try {
        setHoldings(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const save = useCallback((items: Holding[]) => {
    localStorage.setItem("investx_portfolio", JSON.stringify(items));
    setHoldings(items);
  }, []);

  const buy = useCallback(
    (item: Omit<Holding, "averageBuyPrice"> & { price: number }) => {
      setHoldings((prev) => {
        const existing = prev.find(
          (h) => h.id === item.id && h.type === item.type,
        );
        let next: Holding[];
        if (existing) {
          const totalQty = existing.quantity + item.quantity;
          const avgPrice =
            (existing.averageBuyPrice * existing.quantity +
              item.price * item.quantity) /
            totalQty;
          next = prev.map((h) =>
            h.id === item.id && h.type === item.type
              ? {
                  ...h,
                  quantity: totalQty,
                  averageBuyPrice: avgPrice,
                  currentPrice: item.price,
                }
              : h,
          );
        } else {
          next = [
            ...prev,
            {
              id: item.id,
              type: item.type,
              name: item.name,
              ticker: item.ticker,
              quantity: item.quantity,
              averageBuyPrice: item.price,
              currentPrice: item.price,
            },
          ];
        }
        localStorage.setItem("investx_portfolio", JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const sell = useCallback((id: string, type: string, quantity: number) => {
    setHoldings((prev) => {
      const next = prev
        .map((h) => {
          if (h.id === id && h.type === type) {
            const newQty = h.quantity - quantity;
            return newQty <= 0 ? null : { ...h, quantity: newQty };
          }
          return h;
        })
        .filter(Boolean) as Holding[];
      localStorage.setItem("investx_portfolio", JSON.stringify(next));
      return next;
    });
  }, []);

  const totalInvested = holdings.reduce(
    (s, h) => s + h.averageBuyPrice * h.quantity,
    0,
  );
  const currentValue = holdings.reduce(
    (s, h) => s + h.currentPrice * h.quantity,
    0,
  );
  const totalPnL = currentValue - totalInvested;
  const pnlPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

  return {
    holdings,
    buy,
    sell,
    save,
    totalInvested,
    currentValue,
    totalPnL,
    pnlPercent,
  };
}
