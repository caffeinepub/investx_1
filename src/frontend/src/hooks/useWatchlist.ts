import { useCallback, useEffect, useState } from "react";

export interface WatchlistItem {
  id: string;
  type: "stock" | "fund" | "bond";
  name: string;
  ticker?: string;
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("investx_watchlist");
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const save = useCallback((items: WatchlistItem[]) => {
    localStorage.setItem("investx_watchlist", JSON.stringify(items));
    setWatchlist(items);
  }, []);

  const addToWatchlist = useCallback((item: WatchlistItem) => {
    setWatchlist((prev) => {
      if (prev.find((w) => w.id === item.id && w.type === item.type))
        return prev;
      const next = [...prev, item];
      localStorage.setItem("investx_watchlist", JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFromWatchlist = useCallback((id: string, type: string) => {
    setWatchlist((prev) => {
      const next = prev.filter((w) => !(w.id === id && w.type === type));
      localStorage.setItem("investx_watchlist", JSON.stringify(next));
      return next;
    });
  }, []);

  const isInWatchlist = useCallback(
    (id: string, type: string) => {
      return watchlist.some((w) => w.id === id && w.type === type);
    },
    [watchlist],
  );

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    save,
  };
}
