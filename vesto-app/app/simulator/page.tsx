'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatPercent } from '@/lib/utils/format';

// Mock data for MVP demonstration
const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 172.45, change: 1.2, profile: 'Designs and manufactures consumer electronics, software, and services.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 330.89, change: 0.8, profile: 'Develops software, cloud services, and devices globally.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 140.12, change: -0.5, profile: 'Provides search, advertising, and cloud services globally.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 135.22, change: 2.1, profile: 'Operates e-commerce, cloud computing, and digital streaming.' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 470.10, change: 1.9, profile: 'Provides GPUs and accelerated computing platforms for AI.' },
];

export default function SimulatorPage() {
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [pitch, setPitch] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [portfolio] = useState([]);
  const cash = 10000;

  const handleSubmitPitch = async () => {
    if (!selectedStock || pitch.length < 50) {
      setFeedback({
        status: 'rejected',
        message: 'Please provide a more detailed analysis (minimum 50 characters).',
      });
      return;
    }

    // Mock AI review (in production, this would call the API)
    const mockReview = Math.random() > 0.5;
    setFeedback({
      status: mockReview ? 'approved' : 'rejected',
      message: mockReview
        ? `Excellent analysis of ${selectedStock.symbol}. Your pitch demonstrates strong understanding of the business model and financials. You are cleared to invest.`
        : `Your pitch for ${selectedStock.symbol} needs more depth. Consider discussing specific financial metrics, competitive advantages, and risk factors in detail.`,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Column 1: Market & Portfolio */}
      <div className="lg:col-span-1 space-y-6">
        <div>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">Market</h2>
          <Card className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticker</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStocks.map((stock) => (
                  <TableRow
                    key={stock.symbol}
                    onClick={() => {
                      setSelectedStock(stock);
                      setFeedback(null);
                      setPitch('');
                    }}
                    className={`cursor-pointer ${
                      selectedStock?.symbol === stock.symbol ? 'bg-zinc-100 dark:bg-zinc-800' : ''
                    }`}
                  >
                    <TableCell>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground">{stock.name}</div>
                    </TableCell>
                    <TableCell>{formatCurrency(stock.price)}</TableCell>
                    <TableCell className={stock.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {stock.change >= 0 ? '+' : ''}{formatPercent(stock.change, 1)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Portfolio</CardTitle>
            <CardDescription>
              Total Assets: <span className="font-medium">{formatCurrency(cash)}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Total Holdings</span>
                <span>{formatCurrency(0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Available Cash</span>
                <span>{formatCurrency(cash)}</span>
              </div>
            </div>
            {portfolio.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Get a pitch approved to start investing!
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {/* Column 2 & 3: Details & AI Manager */}
      <div className="lg:col-span-2 space-y-6">
        {selectedStock ? (
          <>
            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">Details</h2>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedStock.name} ({selectedStock.symbol})
                  </CardTitle>
                  <CardDescription>
                    {formatCurrency(selectedStock.price)}{' '}
                    <span className={selectedStock.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {selectedStock.change >= 0 ? '+' : ''}{formatPercent(selectedStock.change, 1)}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Company Profile</h4>
                    <p className="text-sm text-muted-foreground">{selectedStock.profile}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">AI Fund Manager</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Pitch: {selectedStock.name} ({selectedStock.symbol})</CardTitle>
                  <CardDescription>
                    Write your investment thesis to get approval from the AI Portfolio Manager
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Write your analysis here. Cover the business model, financials, risks, and your core thesis..."
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    rows={8}
                  />
                  <Button onClick={handleSubmitPitch} className="w-full">
                    Submit Pitch to PM
                  </Button>

                  {feedback && (
                    <Card className="mt-4">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Badge variant={feedback.status === 'approved' ? 'default' : 'destructive'}>
                            {feedback.status}
                          </Badge>
                          <CardTitle className="text-lg">PM Feedback</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{feedback.message}</p>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Select a Stock</CardTitle>
              <CardDescription>
                Choose a company from the market list to view details and submit a pitch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Click on a stock in the market table to get started
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

