import Contact from '../views/Contact.vue';
import About from '../views/About.vue';

const routes = [
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
];

export default routes;