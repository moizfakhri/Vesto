import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CompanyFundamentals } from '@/types';
import { formatNumber, formatPercent } from '@/lib/utils/format';

interface MetricsDisplayProps {
  fundamentals: CompanyFundamentals | null;
}

export function MetricsDisplay({ fundamentals }: MetricsDisplayProps) {
  if (!fundamentals) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No metrics available</p>
        </CardContent>
      </Card>
    );
  }

  const metrics = [
    { label: 'P/E Ratio', value: fundamentals.pe_ratio?.toFixed(2) || 'N/A' },
    { label: 'EBITDA', value: fundamentals.ebitda ? formatNumber(fundamentals.ebitda) : 'N/A' },
    { label: 'D/E Ratio', value: fundamentals.debt_to_equity?.toFixed(2) || 'N/A' },
    { label: 'ROE', value: fundamentals.roe ? formatPercent(fundamentals.roe) : 'N/A' },
    { label: 'ROA', value: fundamentals.roa ? formatPercent(fundamentals.roa) : 'N/A' },
    { label: 'Gross Margin', value: fundamentals.gross_margin ? formatPercent(fundamentals.gross_margin) : 'N/A' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <p className="text-lg font-semibold">{metric.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

