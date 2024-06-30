<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { Option } from "./schemas/option";
  import { browser } from "$app/environment";

  export let options: Option[] = [];
  export let onDropdownItemSelect: (item: Option) => void;

  let selectedOption: Option | null = null;
  let isDropdownOpen = false;
  let dropdownElement: HTMLElement | null = null;

  type Targets = {
    relatedTarget: EventTarget | null;
    currentTarget: HTMLElement;
  };

  const handleDropdownClick = () => {
    isDropdownOpen = !isDropdownOpen;
  };

  const handleDropdownItemSelect = (item: Option) => {
    isDropdownOpen = false;
    onDropdownItemSelect(item);
    selectedOption = item;
  };

  const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }: Targets) => {
    if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return;
    isDropdownOpen = false;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
      isDropdownOpen = false;
    }
  };

  onMount(() => {
    if (browser) {
      document.addEventListener("click", handleClickOutside);
    }
  });

  onDestroy(() => {
    if (!browser) return;
    document.removeEventListener("click", handleClickOutside);
  });
</script>

<div>
  <div class="">
    <button
      type="button"
      bind:this={dropdownElement}
      class="flex items-center justify-between w-fit px-4 py-2 text-sm text-left bg-transparent focus:outline-none border border-gray-700 rounded-md h-[54px]"
      on:click={handleDropdownClick}
    >
      <span>{selectedOption ? selectedOption?.label : options[0].label}</span>
      <svg
        class="w-4 h-4 transform transition-transform"
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.293 7.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
        ></path>
      </svg>
    </button>
    {#if isDropdownOpen}
      <div
        class="absolute z-10 w-full mt-2 bg-gray-900 border border-gray-700 rounded-md h-40 overflow-y-scroll"
        on:blur={handleDropdownFocusLoss}
      >
        {#each options as option}
          <button
            on:click={() => handleDropdownItemSelect(option)}
            type="button"
            class="block w-full px-4 py-2 text-left hover:bg-gray-800 focus:outline-none"
          >
            {option.label}
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>
