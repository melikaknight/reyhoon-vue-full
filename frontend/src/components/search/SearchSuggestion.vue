<template>
  <div>
    <span class="icon"><i class="fa fa-map-marker"></i></span>
    {{item.area}}
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true },
  }
}
</script>
<style scoped>
  .icon {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    line-height: 0;
    margin-left: 20px;
    color: #D40062;
  }
</style>
