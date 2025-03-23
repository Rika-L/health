<script lang="ts" setup>
</script>

<template>
  <div class="flex flex-col gap-4 min-h-[calc(100vh-64px)]">
    <div class="grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-3">
      <Card class="aspect-video pb-10 pt-5 px-2">
        <Chart />
      </Card>
      <Card class="aspect-video pb-10 pt-5 px-2">
        <Chart2 />
      </Card>
      <Card class="aspect-video p-4">
        <Chart4 />
      </Card>
    </div>
    <div class="grid auto-rows-min gap-4 grid-cols-1">
      <Card class="aspect-[16/5] pb-10 pt-5 px-2">
        <Chart3 />
      </Card>
    </div>
  </div>
</template>
