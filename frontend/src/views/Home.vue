<template>
  <div v-if="frontPage">
    <b-container fluid :style="backgroundImage" id="frontPageHeader">
      <b-row>
        <b-col class="mt-5">
          <h1 class="pt-5">{{ frontPage.overskrift }}</h1>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid>
      <b-row>
        <b-col
          md="4"
          class="image-wrapper"
          v-for="image in frontPage.album.bilder"
          :key="image.id"
          :class="{ selected: selectedImage == image.id }"
          @mouseover="hoveredImage = image.id"
          @mouseleave="hoveredImage = ''"
        >
          <img :src="image.bilde.formats.medium.url" alt="" />

          <transition name="fade">
            <div class="image-info" v-if="hoveredImage == image.id">
              <div class="image-info-header">
                <h3>{{ image.tittel }}</h3>
                <router-link
                  :to="
                    `/album/${frontPage.album.tittel_album.toLowerCase()}/${image.tittel.toLowerCase()}`
                  "
                  >Åpne stort bilde</router-link
                >
              </div>
              <div class="image-info-description">
                <p>{{ image.beskrivelse }}</p>
              </div>
            </div>
          </transition>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

export default {
  data() {
    return {
      frontPage: null,
      selectedImage: "",
      hoveredImage: "",
    };
  },
  async created() {
    const response = await axios.get("/forside");
    if (response.data) this.frontPage = response.data;
  },
  computed: {
    backgroundImage() {
      return `background: url('${this.frontPage.bakgrunnsbilde.url}') center; backround-position: cover;`;
    },
  },
};
</script>
<style scoped>
#frontPageHeader {
  color: #fff;
  height: 60vh;
}
#frontPageHeader h1 {
  margin-top: 200px;
}
.image-wrapper {
  padding: 0;
}
img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  padding: 0;
  margin: 0;
}
.image-info {
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.image-info .image-info-header {
  padding: 15px 0 10px;
  background-color: rgba(0, 0, 0, 0.7);
}
.image-info .image-info-header a {
  color: #fff;
}
.image-info .image-info-description {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 15px 0 0;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
