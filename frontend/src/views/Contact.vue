<template>
  <div class="home">
    <HelloWorld msg="Contact"/>
  </div>
</template>

<script>

// @ is an alias to /frontend
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'contact',
  components: {
    HelloWorld
  }
}
</script>
