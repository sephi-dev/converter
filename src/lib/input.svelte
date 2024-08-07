<script lang="ts">
  import cx from "classnames";
  import Dropdown from "./dropdown.svelte";
  import type { Option } from "$lib/schemas/option";

  // Props
  export let label: string;
  export let name: string;
  export let onDropdownItemSelect: (item: Option) => void;
  export let options: Option[] = [];
  export let dropdownValue: Option;
  export let handleChange = (event: Event) => {
    value = parseFloat((event.target as HTMLInputElement).value);
  };

  export let value: number | string = "";

  let inputElement: HTMLInputElement;
  let isFocused = false;

  function handleFocus() {
    isFocused = true;
  }

  function handleBlur() {
    isFocused = false;
  }

  $: labelClasses = cx({
    "translate-y-[-8px] text-xs": isFocused || value,
    "translate-y-[0] text-sm": !isFocused && !value,
  });
</script>

<div class="relative flex items-center gap-3">
  <div class="relative border border-gray-700 rounded-md p-4 h-[54px] overflow-hidden w-80">
    <input
      type="text"
      id={name}
      {name}
      bind:this={inputElement}
      bind:value
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:input={handleChange}
      class="bg-gray-900 text-base md:text-sm focus:outline-none peer bg-transparent absolute right-10 inset-x-4 top-6 appearance-none"
    />
    <label
      class="absolute left-4 transform z-0 transition-all duration-100 ease-in-out font-semibold text-gray-400 {labelClasses}"
      for={name}
    >
      {label}
    </label>
  </div>
  <div class="w-fit">
    <Dropdown {options} {onDropdownItemSelect} {dropdownValue} />
  </div>
</div>
