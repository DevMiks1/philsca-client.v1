<template>
    <div class="background flex justify-center items-center h-[100vh]">
      <img :src="PhilscaBackground" alt="Philsca Background" class="h-full"/>
    </div>
  </template>
  <script setup>
  import PhilscaBackground from "@/assets/philsca-background.jpg";
  </script>
  <style scoped>
  @media (max-width:600px) and (min-width:300px){
    .background {
      height: 12rem;
    }
  }

  
  </style>