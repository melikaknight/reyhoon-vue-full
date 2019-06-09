<template>
  <div class="footer-links" :class="headerBorderColor">
    <h6> {{ headerText }} </h6>
    <a 
      v-for="(link, index) in links"
      :key="index"
      :href="link.linkPath"
    >
      <template v-if="linksType==='text'">
        {{link.linkText}}
      </template>
      <template v-if="linksType==='image'">
        <img 
          :src="link.linkImage" 
          :alt="link.imageAlt"
        >
      </template>
    </a>
  </div>
</template>
<script>
export default {
  name: "FooterLinks",
  props: {
    headerColor: {
      type: String,
      default: "yellow"
    },
    headerText: {
      type: String,
      default: "ریحون"
    },
    links: {
      type: Array,
      default: () => ([]),
    },
    linksType: {
      type: String,
      default: "text",
    }
  },
  computed: {
    headerBorderColor(){
      return `${this.headerColor}-border`;
    }
  }
}
</script>

