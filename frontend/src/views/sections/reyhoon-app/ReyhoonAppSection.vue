<template>
  <section class="reyhoon-app container">
    <div class="reyhoon-app-box">
      <div class="reyhoon-app-form">
        <h2 class="main-title mb-3">{{ content.sectionTitle }}</h2>
        <div class="main-subtitle mb-3">
          {{ content.sectionSubTitle }}
        </div>
        <form class="mb-2">
          <input type="text" name="phonenumber" placeholder="**091220530">
          <button type="submit" @click.prevent="">دریافت لینک از طریق SMS</button>
        </form>
        <p class="mb-3">اپلیکیشن ریحون برای Android و iOS در دسترس است.</p>
        <div class="app-links">
          <a
            v-for="(appLink, index) in content.appLinks" 
            :key="index"
            :href="appLink.url"
          >
            <img 
              :src="appLink.imageSrc" 
              :alt="appLink.imageAlt"
            >
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import sectionContent from './sectionContent.json';

  export default {
    name: "ReyhoonAppSection",
    data: () => ({
      content: sectionContent,
    }),
  }
</script>

