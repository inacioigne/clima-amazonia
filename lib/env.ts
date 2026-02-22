type CurrentBoletimDate = {
  iso: string;
  year: string;
  month: string;
  day: string;
};

function parseCurrentBoletimDate(value?: string): CurrentBoletimDate | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim();
  const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    throw new Error(
      "Invalid CURRENT_BOLETIM_DATE. Use format YYYY-MM-DD, example: 2026-02-18."
    );
  }

  const [, year, month, day] = match;
  return { iso: normalized, year, month, day };
}

export const env = {
  currentBoletimDate: parseCurrentBoletimDate(process.env.CURRENT_BOLETIM_DATE),
};

export function getCurrentBoletimDataDir(): string {
  if (!env.currentBoletimDate) {
    return "data/boletim/current";
  }

  const { year, month, day } = env.currentBoletimDate;
  return `data/boletim/${year}/${month}/${day}`;
}
