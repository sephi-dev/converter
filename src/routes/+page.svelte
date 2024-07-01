<script lang="ts">
  import Converter from "$lib/converter.svelte";

  // Data Props coming from the +page.server
  export let data;
</script>

<section class="flex items-center justify-center h-screen relative px-4">
  <div class="backdrop-blur-sm bg-slate-600 absolute inset-0">
    <enhanced:img
      src="../lib/images/bg.webp"
      alt="bg"
      class="absolute inset-0 object-cover h-screen"
    />
    <div class="absolute inset-0 backdrop-blur-md bg-black/70" />
  </div>
  <Converter {data} />
</section>
