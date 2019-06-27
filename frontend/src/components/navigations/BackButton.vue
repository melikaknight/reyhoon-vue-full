<template>
  <div class="back-button-container">
    <router-link
      :to="path"
      class="back-button-link"
    >
      {{ label }}
    </router-link>
    <span class="icon">
      <i class="fa fa-angle-left"></i>
    </span>
  </div>
</template>
<script>
  export default {
    name: "BackButton",
    props: {
      path: {
        type: String,
        required: true,
        default: '/tehran/saadat-abad',
      },
      label: {
        type: String,
        required: true,
        default: 'رستوران ها',
      },
    }
  }
</script>
<style scoped>
  .back-button-container {
    padding: .5rem;
    width: 8rem;
    display: flex;
    background-color: hsla(0,0%,100%,.9);
    border-radius: .4rem;
    justify-content: center;
    align-items: center;
    font-size: .9rem;
  }
  .back-button-link {
    color: #888 !important;
    text-decoration: none;
  }
  .icon {
    width: 1rem;
    height: 1rem;
    line-height: 0;
    margin-right: .5rem;
    color: #888;
  }
</style>

