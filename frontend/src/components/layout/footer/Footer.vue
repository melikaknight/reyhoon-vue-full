<template>
  <!-- Footer -->
  <footer class="footer">
    <div class="footer-a container">
      <row>
        <column width="33" class="mb-4">
          <p> {{ footerContent.level1.footerRight.about }} </p>
          <router-link 
            :to="footerContent.level1.footerRight.linkPath"
          >
            {{ footerContent.level1.footerRight.linkText }}
          </router-link>
        </column>
        <column width="66" class="mb-4">
          <row>
            <column
              v-for="(footerLink, index) in footerContent.level1.footerLeft"
              :key="index"
              class="mb-4"
            >
              <footer-links
                :headerColor="footerLink.headerBorderColor"
                :headerText="footerLink.headerText"
                :links="footerLink.links"
                :linksType="footerLink.linksType"
              />
            </column>
          </row>
        </column>
      </row>
      <!-- Etemad Logo -->
      <div class="etemad-logo text-center">
        <a href="#">
          <img src="/assets/images/etemad_logo.png" alt="Etemad Logo">
        </a>
        <a href="#">
          <img src="/assets/images/anjoman_logo.png" alt="Anjoman Logo">
        </a>
      </div>
    </div>
    <div class="footer-b">
      <div class="social-links">
        <icon
          v-for="(icon, index) in footerContent.level3.socialIcons"
          :key="index"
          :name="icon"
        />
      </div>
      <p v-html="footerContent.level3.copyRightText" />
    </div>
  </footer><!-- /Footer -->
</template>

<script>
  import Row from '@/components/elements/Row.vue';
  import Column from '@/components/elements/Column.vue';
  import Icon from '@/components/elements/Icon.vue';
  import FooterLinks from './FooterLinks.vue';
  import footerContent from './footerContent.json';
  export default {
    name: 'Footer',
    data: () => ({
      footerContent
    }),
    props: {
      msg: String
    },
    components: {
      Row,
      Column,
      Icon,
      FooterLinks,
    }
  }
</script>