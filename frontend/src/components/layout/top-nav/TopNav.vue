<template>
  <!-- Top Navigation -->
  <nav class="mj-nav">
    <ul>
      <li>
        <router-link to="/login">ورود</router-link>
        <router-link to="/register">عضویت</router-link>
      </li>
      <li>
        <a href="#">توسعه توسط: {{ appAuthor }}</a>
      </li>
      <li class="logo-container">
        <router-link to="/">
          <logo-wide />
        </router-link>
      </li>
    </ul>
  </nav>
  <!-- /Top Navigation -->
</template>
<script>
  import LogoWide from '@/components/logo/LogoWide.vue';
  import { mapState } from 'vuex';
  export default {
    name: "TopNav",
    components: {
      LogoWide,
    },
    computed: {
      ...mapState([
        'appAuthor',
      ])
    },
  }
</script>

<style scoped>
  .logo-container {
    margin-right: auto;
  }
</style>


