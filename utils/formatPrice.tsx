export function formatPrice(price: number) {
  const [int, dec] = price.toFixed(2).split(".");
  return (
    <span>
      {int},<span className="text-sm">{dec}</span> zł
    </span>
  );
}
