<template>
  <div class="guide-box">
    <div class="guide-box-img">
      <i :class="iconClass"></i>
    </div>
    <h4 class="mb-1"> {{ title }} </h4>
    <div class="guide-box-desc">
      {{ subTitle }}
    </div>
  </div>
</template>
<script>
  export default {
    name: "GuideBox",
    props: {
      icon: String,
      title: String,
      subTitle: String,
    },
    computed: {
      iconClass() {
        return `fa fa-${this.icon}`;
      }
    },
  }
</script>

