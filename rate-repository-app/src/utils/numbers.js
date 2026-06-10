export const formatCount = (count) => {
  if (count < 1000) return String(count);
  const formatted = (count / 1000).toFixed(1);
  return formatted.endsWith('.0') 
    ? `${formatted.slice(0, -2)}k` 
    : `${formatted}k`;
};