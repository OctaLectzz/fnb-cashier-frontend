<template>
  <div class="flex flex-center text-center q-pa-md q-py-xl">
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn :to="{ name: 'home' }" color="primary" label="Go Home" class="q-mt-xl" unelevated no-caps />
    </div>
  </div>
</template>

<script setup></script>
