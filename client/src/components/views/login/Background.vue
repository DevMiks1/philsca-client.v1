<template>
  <div class="background flex h-[100vh] items-center justify-center">
    <img :src="PhilscaBackground" alt="Philsca Background" class="h-full w-full object-cover" />
  </div>
</template>
<script setup>
import PhilscaBackground from "@/assets/philsca-background.jpg";
</script>
<style scoped>
@media (max-width: 599px) and (min-width: 300px) {
  .background {
    height: 30vh;
    
  }
}
</style>
