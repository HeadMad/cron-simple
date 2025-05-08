export default function (min, max, input) {
  const result = input.split(',').map((expr) => {

    if (/^\d+$/.test(expr))
      return Number(expr);

    if (/^\d+\/\d+$/.test(expr)) {
      const [start, offset] = expr.split('/').map(Number);
      if (offset < 1)
        throw new Error(`The divisor in expression "${expr}" must be greater than zero.`)

      const length = Math.floor((max-start)/offset) + 1;

      return Array.from({length}, (_, i) => start + i*offset);
    }

    if (/^\d+-\d+$/.test(expr)) {
      const [start, end] = expr.split('-').map(Number);
      const length = end - start + 1;

      return Array.from({length}, (_, i) => i + start);
    }
  }).flat().sort().filter(num => num >= min && num <= max);

  return [...new Set(result)];
}