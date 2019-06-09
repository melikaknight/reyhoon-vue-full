<template>
  <a :href="url">
    <i :class="iconName"></i>
  </a>
</template>
<script>
  export default {
    name: "Icon",
    props: {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        default: "#",
      }
    },
    computed: {
      iconName(){
        return `fa fa-${this.name}`;
      }
    }
  }
</script>

