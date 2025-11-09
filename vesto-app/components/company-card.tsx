import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Company, CompanyQuote } from '@/types';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

interface CompanyCardProps {
  company: Company;
  quote?: CompanyQuote | null;
  onClick?: () => void;
  selected?: boolean;
}

export function CompanyCard({ company, quote, onClick, selected }: CompanyCardProps) {
  const priceChange = quote?.percent_change || 0;
  const isPositive = priceChange >= 0;

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${selected ? 'ring-2 ring-primary' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{company.symbol}</CardTitle>
            <p className="text-sm text-muted-foreground">{company.name}</p>
          </div>
          {quote && (
            <Badge variant={isPositive ? 'default' : 'destructive'}>
              {isPositive ? '+' : ''}{formatPercent(priceChange, 1)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {quote && (
          <div className="space-y-1">
            <p className="text-2xl font-bold">{formatCurrency(quote.current_price)}</p>
            <p className="text-sm text-muted-foreground">
              {isPositive ? '+' : ''}{formatCurrency(quote.change)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

