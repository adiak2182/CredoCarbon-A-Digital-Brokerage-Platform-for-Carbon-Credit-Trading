
import { LiveServerMessage, Modality } from "@google/genai";

export enum ProjectType {
    FORESTRY = 'Forestry',
    RENEWABLE_ENERGY = 'Renewable Energy',
    METHANE_CAPTURE = 'Methane Capture',
    BLUE_CARBON = 'Blue Carbon',
    COMMUNITY = 'Community'
  }

  export enum ExchangeSource {
      TOUCAN = 'Toucan Protocol',
      CBL = 'CBL Markets',
      ACX = 'AirCarbon Exchange',
      GOLD_STANDARD = 'Gold Standard Marketplace',
      VERRA = 'Verra Registry',
      CREDO = 'Credo Direct'
  }
  
  export interface PricePoint {
    time: string;
    price: number;
  }

  export interface Candle {
    time: string;
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }

  export interface OrderBookEntry {
    price: number;
    size: number;
    total: number; // Cumulative
  }

  export interface OrderBook {
    bids: OrderBookEntry[];
    asks: OrderBookEntry[];
    spread: number;
  }

  export interface ImpactQualityScore {
      total: number; // 0-100
      permanence: number;
      additionality: number;
      leakage: number; // Low leakage = high score
      verification: number;
      governance: number;
  }

  export interface RiskFactor {
      level: 'low' | 'medium' | 'high' | 'critical';
      category: 'Methodology' | 'Over-crediting' | 'Social' | 'Political';
      description: string;
      source?: string;
  }

  export interface CoBenefit {
      title: string;
      description: string;
      icon: 'users' | 'leaf' | 'bird' | 'water' | 'briefcase' | 'zap'; 
  }

  export interface ProjectDetails {
      registryName: string; // e.g., Verra
      registryId: string;
      registryLink: string;
      methodology: string; // e.g., VM0007
      validator: string;
      startDate: string;
      developer: string;
  }
  
  export interface CarbonCredit {
    id: string;
    externalId: string; // ID on the source exchange
    sourceExchange: ExchangeSource;
    name: string;
    ticker: string;
    type: ProjectType;
    vintage: number;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    description: string;
    location: string;
    certification: string; // e.g., Gold Standard, Verra
    
    // Pro Data
    chartData: PricePoint[]; // Legacy simple line data
    candles: Candle[]; // OHLC Data for Pro Chart
    orderBook: OrderBook; // Simulated depth

    // Due Diligence Data
    details: ProjectDetails;
    iqs: ImpactQualityScore;
    risks: RiskFactor[];
    coBenefits: CoBenefit[];
    locationCoords?: { lat: number; lng: number }; // For map
  }
  
  export interface PortfolioItem {
    creditId: string;
    ticker: string;
    name: string;
    quantity: number;
    avgBuyPrice: number;
  }
  
  export type TransactionType = 'buy' | 'sell' | 'deposit' | 'withdraw';
  export type OrderStatus = 'executed' | 'pending' | 'failed' | 'cancelled';
  export type OrderType = 'market' | 'limit' | 'stop-loss' | 'take-profit' | 'oco';

  export interface Transaction {
      id: string;
      type: TransactionType;
      assetId?: string;
      assetTicker?: string;
      assetName?: string;
      quantity?: number;
      price?: number;
      total: number;
      date: string;
      status: OrderStatus;
      txHash?: string; // Blockchain Link
  }

  export interface ActiveOrder {
      id: string;
      assetId: string;
      assetTicker: string;
      type: OrderType;
      side: 'buy' | 'sell';
      quantity: number;
      triggerPrice?: number; // For Stop/Limit
      limitPrice?: number;   // For Limit/OCO
      status: 'active' | 'triggered';
      date: string;
  }

  export interface PriceAlert {
      id: string;
      assetId: string;
      assetTicker: string;
      targetPrice: number;
      condition: 'above' | 'below';
      active: boolean;
  }

  export interface Notification {
      id: string;
      title: string;
      message: string;
      type: 'success' | 'info' | 'error' | 'warning';
      read: boolean;
      timestamp: number;
  }

  export interface BlockchainCertificate {
      id: string;
      txHash: string;
      blockNumber: number;
      assetId: string;
      assetName: string;
      ticker: string;
      quantity: number;
      vintage: number;
      owner: string;
      timestamp: string;
      status: 'active' | 'retired';
      retirementReason?: string;
  }

  export type TimeRange = '1H' | '1D' | '1W' | '1M' | '1Y' | 'ALL';

  export interface MarketPrediction {
      forecastRangeLow: number;
      forecastRangeHigh: number;
      sentimentScore: number; // 0-100 (0=Bearish, 100=Bullish)
      confidence: number; // 0-100%
      trend: 'bullish' | 'bearish' | 'neutral';
      volatility: 'low' | 'medium' | 'high';
      predictedPath: PricePoint[]; // Next 24h
  }

  export type OptimizationStrategy = 'min_volatility' | 'max_impact' | 'balanced' | 'max_sharpe';

  export interface MarketContextType {
    credits: CarbonCredit[];
    marketIndex: number;
    marketChangePercent: number;
    isLoading: boolean;
    getById: (id: string) => CarbonCredit | undefined;
  }
  
  export interface UserContextType {
      balance: number;
      portfolio: PortfolioItem[];
      transactions: Transaction[];
      activeOrders: ActiveOrder[];
      priceAlerts: PriceAlert[];
      watchlist: string[];
      notifications: Notification[];
      certificates: BlockchainCertificate[];
      
      // Impact Stats
      totalImpactTonnes: number;

      deposit: (amount: number) => void;
      withdraw: (amount: number) => void;
      executeTrade: (asset: CarbonCredit, type: 'buy' | 'sell', quantity: number, price: number) => Promise<boolean>;
      addToPortfolio: (asset: CarbonCredit, quantity: number, avgBuyPrice: number) => void;
      placeOrder: (order: Omit<ActiveOrder, 'id' | 'status' | 'date'>) => void;
      cancelOrder: (id: string) => void;
      addPriceAlert: (alert: Omit<PriceAlert, 'id'>) => void;
      removePriceAlert: (id: string) => void;
      toggleWatchlist: (assetId: string) => void;
      markNotificationRead: (id: string) => void;
      clearNotifications: () => void;
      retireCertificate: (id: string, reason: string) => void;
  }