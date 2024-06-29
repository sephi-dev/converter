import { COINGECKI_API_KEY } from "$env/static/private";

const COINGECKO_API_URL = 'https://pro-api.coingecko.com/api/v3';

export async function load() {
  const coinsList = ["bitcoin", "ethereum", "usd", "tether", "polkadot", "starknet"];
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-pro-api-key': COINGECKI_API_KEY
    }
  };

  try {
    const vsCurrenciesResponse = await fetch(`${COINGECKO_API_URL}/simple/supported_vs_currencies`, options);
    
    if (!vsCurrenciesResponse.ok) {
      throw new Error(`Failed to fetch supported vs currencies: ${vsCurrenciesResponse.statusText}`);
    }

    const vsCurrencies: string[] = await vsCurrenciesResponse.json();
    
    const coinPriceResponse = await fetch(
      `${COINGECKO_API_URL}/simple/price?ids=${coinsList.join(',')}&vs_currencies=${vsCurrencies.join(',')}`,
      options
    );

    if (!coinPriceResponse.ok) {
      throw new Error(`Failed to fetch coin prices: ${coinPriceResponse.statusText}`);
    }

    const coinPrices = await coinPriceResponse.json();

    return {
      currencies: vsCurrencies,
      coins: coinPrices,
      coinsList
    };

  } catch (error) {
    console.error('Error loading data:', error);
    return {
      currencies: [],
      coins: {},
      coinsList
    };
  }
}
