import { formatPrice } from '@/lib/utils';

interface PriceBlockProps {
  label: string;
  value: number;
}

export function PriceBlock({ label, value }: PriceBlockProps) {
  return (
    <div className="shrink-0 px-3 text-right">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{formatPrice(value)}</p>
    </div>
  );
}
