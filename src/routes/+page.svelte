<script lang="ts">
  import Switch from "$lib/icons/switch.svelte";
  import Input from "$lib/input.svelte";
  import type { Option } from "$lib/schemas/option";

  export let data;

  let currencies = data.currencies;
  let coins = data.coins;

  let formattedCurrencies = currencies.map((currency: string) => ({
    id: currency,
    label: currency.toUpperCase(),
  }));

  let coinsList = data.coinsList.map((coin: string) => ({
    id: coin,
    label: coin.toUpperCase(),
  }));

  let selectedCurrency = formattedCurrencies.find((currency) => currency.id === "usd");
  let selectedCoin = coinsList.find((coin) => coin.id === "bitcoin");
  let currencyValue: number | string;
  let coinValue: number | string;
  let coinPrice: number;
  let isSwitched = false;

  const handleCurrencyValueChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = parseFloat(target.value);

    if (!isNaN(newValue)) {
      currencyValue = newValue;
      coinValue = currencyValue / coinPrice;
    } else {
      currencyValue = 1;
      coinValue = "";
    }
  };

  const handleCoinValueChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = parseFloat(target.value);

    if (!isNaN(newValue)) {
      coinValue = newValue;
      currencyValue = coinValue * coinPrice;
    } else {
      coinValue = 1;
      currencyValue = "";
    }
  };

  const handleDropdownCoinSelect = (item: Option) => {
    selectedCoin = item;
  };

  const handleDropdownCurrencySelect = (item: Option) => {
    selectedCurrency = item;
  };

  const handleSwitch = () => {
    isSwitched = !isSwitched;
  };

  $: if (selectedCoin && selectedCurrency) {
    coinPrice = coins[selectedCoin.id][selectedCurrency.id];
  }
</script>

<section class="flex items-center justify-center h-screen">
  <section class="bg-gray-600/50 backdrop-blur-sm w-1/3 rounded-md">
    <div class="bg-black/25 p-3">
      <h2 class="font-light">Crypto <strong class="font-bold">CONVERTER</strong></h2>
    </div>
    <div class="p-6 flex flex-col gap-4">
      {#if selectedCurrency}
        <Input
          label="Reference currency"
          name="reference_currency"
          value={currencyValue}
          handleChange={handleCurrencyValueChange}
          options={formattedCurrencies}
          onDropdownItemSelect={handleDropdownCurrencySelect}
          dropdownValue={selectedCurrency}
        />
      {/if}
      {#if selectedCoin}
        <Input
          label="Crypto"
          name="crypto"
          value={coinValue}
          handleChange={handleCoinValueChange}
          options={coinsList}
          onDropdownItemSelect={handleDropdownCoinSelect}
          dropdownValue={selectedCoin}
        />
      {/if}
      <p class="text-gray-400 text-xs flex items-center gap-2">
        {#if !isSwitched}
          1 {selectedCoin?.label} = {coinPrice}
          {selectedCurrency?.label}
        {:else}
          1 {selectedCurrency?.label} = {1 / coinPrice}
          {selectedCoin?.label}
        {/if}
        <button on:click={handleSwitch} class="w-5 h-5 block cursor-pointer">
          <Switch />
        </button>
      </p>
    </div>
  </section>
</section>
