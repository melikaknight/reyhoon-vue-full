<template>
  <div :class="columnWidth">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: "Column",
    props: {
      // Prop Validation
      width: {
        type: String,
        default: "25",
      }
    },
    computed: {
      columnWidth(){
        return `col-${this.width}`;
      }
    }
  }
</script>

