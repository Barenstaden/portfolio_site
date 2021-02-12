<template>
  <div v-if="aboutPage">
    <h1 class="mt-5">{{ aboutPage.overskrift }}</h1>
    <img
      class="mt-5"
      id="profileImage"
      :src="aboutPage.bilde.formats.medium.url"
      alt=""
    />
    <div v-html="aboutPage.om" class="mt-5"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      aboutPage: null,
    };
  },
  async created() {
    const aboutPage = await axios.get("/om");
    this.aboutPage = aboutPage.data;
  },
};
</script>

<style scoped>
#profileImage {
  height: 250px;
  width: 250px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
