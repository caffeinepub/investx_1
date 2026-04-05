# InvestX - Share Market & Mutual Funds Platform

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Risk warning banner/modal on login/landing page: "It may be risky so please signup at your own risk and responsibility."
- Landing page with hero section, market overview stats, and call-to-action
- User authentication (signup/login) with authorization component
- Dashboard showing portfolio overview, holdings, and watchlist
- Markets page listing all companies with their current stock prices, % change, market cap
- Stocks detail page with price chart, company info, buy/sell simulation
- Mutual Funds page listing funds with NAV, returns (1Y/3Y/5Y), risk rating
- Bonds page listing government and corporate bonds with yield and maturity
- Watchlist feature to track favourite instruments
- Search functionality across stocks, mutual funds, and bonds
- Portfolio page showing user's holdings, invested value, current value, P&L
- Sample data: 30+ companies across sectors (IT, Banking, Auto, Pharma, Energy)
- Sample mutual funds data (large-cap, mid-cap, ELSS, debt funds)
- Sample bonds data
- Responsive design matching Groww/OctaFX aesthetic: dark-accented, green primary color, clean cards

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: Store users, watchlists, portfolios. Provide APIs for stocks, mutual funds, bonds (seeded data). Support buy/sell simulation tracking.
2. Frontend: Landing page with risk warning modal, auth flow, dashboard, markets listing, stock detail with simulated chart, mutual funds page, bonds page, portfolio page, search.
3. Use authorization component for user auth.
4. Seed realistic company/fund/bond data in backend.
