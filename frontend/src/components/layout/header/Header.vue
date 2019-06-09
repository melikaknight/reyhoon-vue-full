<template>
  <!-- Header -->
  <header class="header container text-center">
    <div class="logo mb-5">
      <router-link to="/">
        <img src="/assets/images/logo.png" alt="Reyhoon Logo">
      </router-link>
    </div>
    <h2 class="main-title mb-1">
      {{ headerContent.headerTitle }}
    </h2>
    <p> {{ headerContent.headerSubTitle }} </p>
    <search-form />
  </header>
  <!-- /Header -->
</template>

<script>
  import headerContent from './headerContent.json';
  import SearchForm from '@/components/search/SearchForm.vue';

  export default {
    name: "Header",
    data: () => ({
      headerContent,
    }),
    components: {
      SearchForm,
    },
  }
</script>

