<script lang="ts">
import Input from "$lib/input.svelte";
import type { Option } from "$lib/schemas/option";

let options = [
  {
    id: "bitcoin",
    label: "BTC",
  },
  {
    id: "ethereum",
    label: "ETH",
  },
];

const handleDropdownItemSelect = (item: Option) => {
  console.log("Item selected", item);
};

const handleDropdownCurrencySelect = (item: Option) => {
  console.log("Currency selected", item);
};

</script>

<section class="flex items-center justify-center h-screen">
  <section class="bg-gray-600/50 backdrop-blur-sm w-1/3 rounded-md">
    <div class="bg-black/25 p-3">
      <h2>Crypto <strong>CONVERTER</strong></h2>
    </div>
    <div class="p-6 flex flex-col gap-4">
      <Input
        label="Reference currency"
        name="reference_currency"
        options={[
          {
            id: "usd",
            label: "USD",
          },
          {
            id: "eur",
            label: "EUR",
          }
        ]}
        onDropdownItemSelect={handleDropdownCurrencySelect}
      />
      <Input
        label="Crypto"
        name="crypto"
        options={options}
        onDropdownItemSelect={handleDropdownItemSelect}
      />
    </div>
  </section>
</section>