<template>
  <div class="breadcrumb-container">
    <router-link
      to="/"
      class="breadcrumb-link"
    >
      ریحون
    </router-link>
    <span class="icon">
      <i class="fa fa-angle-left"></i>
    </span>
    <router-link
      :to="cityAreaPath"
      class="breadcrumb-link"
    >
      {{ cityAreaLabel }}
    </router-link>
    <span class="icon">
      <i class="fa fa-angle-left"></i>
    </span>
    <span >
      {{ restaurantName }}
    </span>
  </div>
</template>
<script>
  export default {
    name: "BreadCrumb",
    props: {
      cityAreaPath: {
        type: String,
        required: true,
        default: '/tehran/saadat-abad',
      },
      cityAreaLabel: {
        type: String,
        required: true,
        default: 'تهران، سعادت آباد',
      },
      restaurantName: {
        type: String,
        required: true,
        default: '',
      },
    }
  }
</script>
<style scoped>
  .breadcrumb-container {
    padding: .5rem;
    width: auto;
    display: flex;
    background-color: hsla(0,0%,100%,.9);
    border-radius: .4rem;
    justify-content: flex-start;
    align-items: center;
    font-size: .9rem;
    font-weight: 400;
  }
  .breadcrumb-link {
    color: #5890ff !important;
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

