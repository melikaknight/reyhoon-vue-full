<template>
  <div>
    <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19"><defs><linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="linearGradient-1"><stop stop-color="#FF0613" offset="0%"></stop><stop stop-color="#D40062" offset="49.9751626%"></stop><stop stop-color="#8B00AF" offset="100%"></stop></linearGradient></defs><g id="Home-page" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="homepagenew-cityinput-homepage4" transform="translate(-1177.000000, -2233.000000)" fill="url(#linearGradient-1)" stroke="url(#linearGradient-1)" stroke-width="0.7776"><path d="M1186.74202,2242.36519 L1178.14253,2242.36519 C1177.92934,2242.36519 1177.73577,2242.24073 1177.6473,2242.04676 C1177.52254,2241.77325 1177.64312,2241.45039 1177.91663,2241.32563 L1194.72944,2233.65659 C1194.87292,2233.59114 1195.03774,2233.59114 1195.18123,2233.65659 C1195.45474,2233.78135 1195.57533,2234.10421 1195.45057,2234.37772 L1187.78157,2251.19061 C1187.6931,2251.38458 1187.49953,2251.50904 1187.28634,2251.50904 C1186.98572,2251.50904 1186.74202,2251.26534 1186.74202,2250.96472 L1186.74202,2242.36519 Z" id="Path-3"></path></g></g></svg></span>
    {{item.area}}
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true },
  }
}
</script>
<style scoped>
  .icon {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    line-height: 0;
    margin-left: 20px;
  }
</style>
