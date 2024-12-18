import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function currency(value, currency) {
	return new Intl.NumberFormat('en', { style: 'currency', currency: currency, currencyDisplay: "narrowSymbol" }).format(
		value,
	)
}
