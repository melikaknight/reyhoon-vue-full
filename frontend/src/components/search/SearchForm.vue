<template>
  <div class="search-state-form mb-5">
    <form>
      <div class="row">
        <div class="col-20">
          <select>
            <option value="tehran" selected>تهران</option>
            <option value="qom">قم</option>
            <option value="isfahan">اصفهان</option>
          </select>
        </div>
        <div class="col-80">
          <input type="text" name="s" placeholder="مثلا نیاوران">
          <button type="submit"><i class="fa fa-search"></i></button>
        </div>
      </div>
    </form>
    <div class="last-search">
      <i class="fa fa-clock-o"></i> آخرین جستجو: تهران، شیخ هادی، چهارراه ولیعصر
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchForm",
    components: {

    }
  }
</script>

