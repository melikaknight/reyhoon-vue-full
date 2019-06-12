<template>
  <section class="guide container">
    <row>
      <column 
        width="33"
        v-for="(step, index) in orderSteps"
        :key="index"
      >
        <guide-box 
          :icon="step.icon"
          :title="step.title"
          :subTitle="step.subTitle"
        />
      </column>
    </row>
  </section>
</template>
<script>
  import GuideBox from '@/components/guide-box/GuideBox.vue';
  import sectionContent from './sectionContent.json';
  export default {
    name: "ShowCaseSection",
    data: () => ({
      orderSteps: sectionContent,
    }),
    components: {
      GuideBox,
    },
  }
</script>

