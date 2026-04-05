export interface MutualFund {
  id: string;
  name: string;
  fundHouse: string;
  category: string;
  nav: number;
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  riskRating: "Low" | "Moderate" | "High" | "Very High";
  aum: string;
  minInvestment: number;
  description: string;
}

export const funds: MutualFund[] = [
  {
    id: "sbibluechip",
    name: "SBI Bluechip Fund",
    fundHouse: "SBI Mutual Fund",
    category: "Large Cap",
    nav: 68.45,
    returns1Y: 14.2,
    returns3Y: 18.5,
    returns5Y: 16.8,
    riskRating: "Moderate",
    aum: "44,234 Cr",
    minInvestment: 500,
    description:
      "SBI Bluechip Fund is a large-cap equity fund that invests in well-established companies with strong fundamentals.",
  },
  {
    id: "hdfctop100",
    name: "HDFC Top 100 Fund",
    fundHouse: "HDFC Mutual Fund",
    category: "Large Cap",
    nav: 892.3,
    returns1Y: 16.1,
    returns3Y: 20.3,
    returns5Y: 17.2,
    riskRating: "Moderate",
    aum: "28,912 Cr",
    minInvestment: 500,
    description:
      "HDFC Top 100 Fund invests in top 100 companies by market capitalization, providing stable long-term growth.",
  },
  {
    id: "miraelarge",
    name: "Mirae Asset Large Cap Fund",
    fundHouse: "Mirae Asset",
    category: "Large Cap",
    nav: 98.45,
    returns1Y: 15.8,
    returns3Y: 19.7,
    returns5Y: 18.1,
    riskRating: "Moderate",
    aum: "32,567 Cr",
    minInvestment: 1000,
    description:
      "Mirae Asset Large Cap Fund aims to generate long-term capital appreciation through a diversified portfolio of large-cap stocks.",
  },
  {
    id: "axismid",
    name: "Axis Midcap Fund",
    fundHouse: "Axis Mutual Fund",
    category: "Mid Cap",
    nav: 87.32,
    returns1Y: 22.4,
    returns3Y: 28.1,
    returns5Y: 24.6,
    riskRating: "High",
    aum: "18,765 Cr",
    minInvestment: 500,
    description:
      "Axis Midcap Fund focuses on mid-sized companies with high growth potential, targeting capital appreciation.",
  },
  {
    id: "kotakemerging",
    name: "Kotak Emerging Equity Fund",
    fundHouse: "Kotak Mutual Fund",
    category: "Mid Cap",
    nav: 112.45,
    returns1Y: 24.6,
    returns3Y: 29.8,
    returns5Y: 26.3,
    riskRating: "High",
    aum: "22,341 Cr",
    minInvestment: 1000,
    description:
      "Kotak Emerging Equity Fund invests in emerging mid-cap companies poised for significant growth.",
  },
  {
    id: "sbismall",
    name: "SBI Small Cap Fund",
    fundHouse: "SBI Mutual Fund",
    category: "Small Cap",
    nav: 145.67,
    returns1Y: 32.1,
    returns3Y: 38.4,
    returns5Y: 31.7,
    riskRating: "Very High",
    aum: "14,523 Cr",
    minInvestment: 500,
    description:
      "SBI Small Cap Fund invests in small-cap companies with strong growth potential and competitive advantages.",
  },
  {
    id: "nipponsmall",
    name: "Nippon India Small Cap Fund",
    fundHouse: "Nippon India MF",
    category: "Small Cap",
    nav: 134.89,
    returns1Y: 35.2,
    returns3Y: 41.6,
    returns5Y: 33.8,
    riskRating: "Very High",
    aum: "38,921 Cr",
    minInvestment: 100,
    description:
      "Nippon India Small Cap Fund seeks long-term capital appreciation by investing in a diversified portfolio of small-cap equities.",
  },
  {
    id: "axiselss",
    name: "Axis Long Term Equity Fund",
    fundHouse: "Axis Mutual Fund",
    category: "ELSS",
    nav: 78.34,
    returns1Y: 18.9,
    returns3Y: 22.7,
    returns5Y: 20.4,
    riskRating: "High",
    aum: "32,145 Cr",
    minInvestment: 500,
    description:
      "Axis ELSS fund offers tax saving under Section 80C with a 3-year lock-in period and long-term capital appreciation.",
  },
  {
    id: "hdfcelss",
    name: "HDFC ELSS Tax Saver",
    fundHouse: "HDFC Mutual Fund",
    category: "ELSS",
    nav: 456.78,
    returns1Y: 17.4,
    returns3Y: 21.3,
    returns5Y: 19.8,
    riskRating: "High",
    aum: "11,234 Cr",
    minInvestment: 500,
    description:
      "HDFC ELSS Tax Saver provides dual benefit of tax saving and wealth creation through equity investments.",
  },
  {
    id: "sbidebt",
    name: "SBI Magnum Debt Fund",
    fundHouse: "SBI Mutual Fund",
    category: "Debt",
    nav: 45.23,
    returns1Y: 7.2,
    returns3Y: 7.8,
    returns5Y: 7.5,
    riskRating: "Low",
    aum: "8,912 Cr",
    minInvestment: 5000,
    description:
      "SBI Magnum Debt Fund provides stable income with lower risk by investing in government securities and corporate bonds.",
  },
  {
    id: "hdfccorp",
    name: "HDFC Corporate Bond Fund",
    fundHouse: "HDFC Mutual Fund",
    category: "Debt",
    nav: 28.9,
    returns1Y: 6.8,
    returns3Y: 7.4,
    returns5Y: 7.1,
    riskRating: "Low",
    aum: "12,456 Cr",
    minInvestment: 5000,
    description:
      "HDFC Corporate Bond Fund invests in high-quality corporate bonds to generate steady income returns.",
  },
  {
    id: "paragflexi",
    name: "Parag Parikh Flexi Cap Fund",
    fundHouse: "PPFAS MF",
    category: "Flexi Cap",
    nav: 67.45,
    returns1Y: 20.3,
    returns3Y: 26.1,
    returns5Y: 23.4,
    riskRating: "Moderate",
    aum: "54,321 Cr",
    minInvestment: 1000,
    description:
      "Parag Parikh Flexi Cap Fund invests across market capitalizations and geographies for long-term wealth creation.",
  },
  {
    id: "utiflexi",
    name: "UTI Flexi Cap Fund",
    fundHouse: "UTI Mutual Fund",
    category: "Flexi Cap",
    nav: 245.67,
    returns1Y: 18.7,
    returns3Y: 23.8,
    returns5Y: 21.2,
    riskRating: "Moderate",
    aum: "19,876 Cr",
    minInvestment: 500,
    description:
      "UTI Flexi Cap Fund dynamically allocates across large, mid, and small-cap stocks for optimal returns.",
  },
  {
    id: "icicibalanced",
    name: "ICICI Balanced Advantage Fund",
    fundHouse: "ICICI Prudential",
    category: "Hybrid",
    nav: 56.78,
    returns1Y: 13.4,
    returns3Y: 17.2,
    returns5Y: 15.8,
    riskRating: "Moderate",
    aum: "48,234 Cr",
    minInvestment: 100,
    description:
      "ICICI Balanced Advantage Fund dynamically manages equity and debt allocation based on market valuations.",
  },
  {
    id: "miraehybrid",
    name: "Mirae Asset Hybrid Equity Fund",
    fundHouse: "Mirae Asset",
    category: "Hybrid",
    nav: 34.56,
    returns1Y: 14.1,
    returns3Y: 18.3,
    returns5Y: 16.7,
    riskRating: "Moderate",
    aum: "7,654 Cr",
    minInvestment: 1000,
    description:
      "Mirae Asset Hybrid Equity Fund provides balanced growth with a mix of equity and debt investments.",
  },
];

export const getCategories = (): string[] => [
  ...new Set(funds.map((f) => f.category)),
];
export const getFundById = (id: string): MutualFund | undefined =>
  funds.find((f) => f.id === id);
