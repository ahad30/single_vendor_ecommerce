type TPerVariant = {
  [index: string]: string;
};

const normalizeVariant = (variant: TPerVariant) => {
  const modifiedKey = Object.keys(variant).reduce(
    (acc: { [index: string]: string }, key) => {
      acc[key.toLowerCase()] = String(variant[key]).toLowerCase();
      return acc;
    },
    {}
  );
  return modifiedKey;
};

export const variantExists = (
  variants: TPerVariant[],
  newVariant: TPerVariant
) => {
  const normalizedNewVariant = normalizeVariant(newVariant);
  const exists = variants.some((variant) => {
    const normalizedVariant = normalizeVariant(variant);
    const s = Object.keys(normalizedVariant).every(
      (key) => normalizedVariant[key] === normalizedNewVariant[key]
    );
    return s;
  });
  return exists;
};
