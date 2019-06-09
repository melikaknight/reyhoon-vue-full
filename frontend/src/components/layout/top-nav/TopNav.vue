<template>
  <!-- Top Navigation -->
  <nav class="mj-nav">
    <ul>
      <li>
        <router-link to="/login">ورود</router-link>
        <router-link to="/register">عضویت</router-link>
      </li>
      <li>
        <router-link to="/help">راهنما</router-link>
      </li>
    </ul>
  </nav>
  <!-- /Top Navigation -->
</template>
<script>
  export default {
    name: "TopNav"
  }
</script>

