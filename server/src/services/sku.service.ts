export const generateSku = (
  brandName: string,
  categoryName: string,
  generation: string,
  color: string,
) => {
  const getCode = (str?: string, len = 3) =>
    str
      ? str
          .replace(/[^a-zA-Z0-9]/g, '')
          .substring(0, len)
          .toUpperCase()
      : 'UNK';

  const brandCode = getCode(brandName, 3);
  const categoryCode = getCode(categoryName, 3);
  const genCode = getCode(generation || 'G1', 2);
  const colorCode = getCode(color, 2);

  return `${brandCode}-${categoryCode}-${genCode}-${colorCode}`;
};
