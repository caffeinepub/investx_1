export interface Bond {
  id: string;
  name: string;
  issuer: string;
  type: "Government" | "Corporate";
  faceValue: number;
  currentPrice: number;
  couponRate: number;
  yieldToMaturity: number;
  maturityDate: string;
  rating: string;
  description: string;
}

export const bonds: Bond[] = [
  {
    id: "goi726",
    name: "GOI 7.26% 2029",
    issuer: "Government of India",
    type: "Government",
    faceValue: 1000,
    currentPrice: 1034.5,
    couponRate: 7.26,
    yieldToMaturity: 7.1,
    maturityDate: "14-Jan-2029",
    rating: "AAA",
    description:
      "Sovereign bond issued by the Government of India, considered the safest investment option with guaranteed returns.",
  },
  {
    id: "goi654",
    name: "GOI 6.54% 2032",
    issuer: "Government of India",
    type: "Government",
    faceValue: 1000,
    currentPrice: 978.3,
    couponRate: 6.54,
    yieldToMaturity: 6.9,
    maturityDate: "17-Jan-2032",
    rating: "AAA",
    description:
      "Long-term sovereign bond with coupon payments semi-annually. Ideal for risk-averse investors seeking stable income.",
  },
  {
    id: "goi718",
    name: "GOI 7.18% 2033",
    issuer: "Government of India",
    type: "Government",
    faceValue: 1000,
    currentPrice: 1012.7,
    couponRate: 7.18,
    yieldToMaturity: 7.0,
    maturityDate: "24-Jul-2033",
    rating: "AAA",
    description:
      "Government of India dated securities offering regular semi-annual interest and capital safety.",
  },
  {
    id: "nhaibd",
    name: "NHAI Bond 7.35% 2030",
    issuer: "NHAI",
    type: "Government",
    faceValue: 1000,
    currentPrice: 1028.9,
    couponRate: 7.35,
    yieldToMaturity: 7.2,
    maturityDate: "22-Mar-2030",
    rating: "AAA",
    description:
      "National Highways Authority of India bond backed by Government of India for highway infrastructure financing.",
  },
  {
    id: "hdfc845",
    name: "HDFC Ltd NCD 8.45%",
    issuer: "HDFC Limited",
    type: "Corporate",
    faceValue: 1000,
    currentPrice: 1052.4,
    couponRate: 8.45,
    yieldToMaturity: 8.2,
    maturityDate: "15-Sep-2026",
    rating: "AAA",
    description:
      "HDFC Limited Non-Convertible Debenture offering higher returns than government bonds with excellent credit quality.",
  },
  {
    id: "tata875",
    name: "Tata Capital NCD 8.75%",
    issuer: "Tata Capital",
    type: "Corporate",
    faceValue: 1000,
    currentPrice: 1067.8,
    couponRate: 8.75,
    yieldToMaturity: 8.5,
    maturityDate: "30-Jun-2027",
    rating: "AA+",
    description:
      "Tata Capital NCD backed by strong Tata group brand with attractive coupon rates and semi-annual interest payments.",
  },
  {
    id: "bajaj910",
    name: "Bajaj Finance NCD 9.10%",
    issuer: "Bajaj Finance",
    type: "Corporate",
    faceValue: 1000,
    currentPrice: 1045.2,
    couponRate: 9.1,
    yieldToMaturity: 8.9,
    maturityDate: "05-Dec-2025",
    rating: "AA+",
    description:
      "Bajaj Finance NCD offering one of the highest coupon rates with strong credit rating and consistent performance.",
  },
  {
    id: "rec820",
    name: "REC Ltd Bond 8.20%",
    issuer: "REC Limited",
    type: "Corporate",
    faceValue: 1000,
    currentPrice: 1038.6,
    couponRate: 8.2,
    yieldToMaturity: 7.9,
    maturityDate: "11-Oct-2028",
    rating: "AAA",
    description:
      "Rural Electrification Corporation bond financing India's power sector with government backing and AAA rating.",
  },
  {
    id: "sbiperp",
    name: "SBI Perpetual Bond 8.50%",
    issuer: "State Bank of India",
    type: "Corporate",
    faceValue: 1000,
    currentPrice: 1023.5,
    couponRate: 8.5,
    yieldToMaturity: 8.3,
    maturityDate: "Perpetual",
    rating: "AA+",
    description:
      "SBI AT1 perpetual bond offering regular income with call option. Suitable for investors seeking higher income.",
  },
  {
    id: "ilfs940",
    name: "Infra Bond 9.40% 2028",
    issuer: "IL&FS",
    type: "Corporate",
    faceValue: 1000,
    currentPrice: 892.3,
    couponRate: 9.4,
    yieldToMaturity: 9.1,
    maturityDate: "28-Feb-2028",
    rating: "A",
    description:
      "Infrastructure bond offering high coupon rate. Carries moderate risk. Suitable for investors with higher risk appetite.",
  },
];

export const getBondById = (id: string): Bond | undefined =>
  bonds.find((b) => b.id === id);
