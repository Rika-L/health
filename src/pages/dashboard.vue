<script lang="ts" setup>
import NProgress from 'nprogress'

function test() {
  NProgress.start()
}
</script>

<template>
  <div class="pl-6 pt-6">
    <Button>
      <RouterLink to="/authentication">
        Login
      </RouterLink>
    </Button>
    <Button @click="test">
      1
    </Button>
  </div>
</template>
