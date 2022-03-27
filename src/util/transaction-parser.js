export const parseTransactions = text => {
  return text
    .split('\n')
    .filter(line => typeof line === 'string')
    .map(line => line.trim())
    .map((_, i, lines) =>
      isStartOfRow(lines, i) ? getRow(lines.slice(i)) : null,
    )
    .filter(x => x)
    .map(formatRow);
};

const isTimeString = str => str.endsWith(' AM') || str.endsWith(' PM');

const isBlank = str => str === '';

const isNumeric = val =>
  typeof val === 'number' || (typeof val === 'string' && !isNaN(Number(val)));

const formatRow = cells => ({
  amount: cells.find(isNumeric),
  cells,
});

const isStartOfRow = (lines, index) =>
  isBlank(lines[index - 1]) && isTimeString(lines[index]);

const getRow = lines => {
  const index = lines.findIndex(isBlank);
  return lines.slice(0, index + 1);
};
