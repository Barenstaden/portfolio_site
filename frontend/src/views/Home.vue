<template>
  <div v-if="frontPage">
    <b-container fluid :style="backgroundImage" id="frontPageHeader">
      <b-row>
        <b-col>
          <h1>{{ frontPage.overskrift }}</h1>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-row>
        <b-col class="text-center">
          <h3 class="mt-5">{{ frontPage.album.tittel_album }}</h3>
          <Album :images="frontPage.album.bilder" />
        </b-col>
      </b-row>
      <b-row v-for="album in albums" :key="album.id">
        <b-col class="text-center" v-if="album.id != frontPage.album.id">
          <h3 class="mt-5">{{ album.tittel_album }}</h3>
          <p>{{ album.beskrivelse_album }}</p>
          <Album :images="album.bilder" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {
    Album: () => import("@/components/Album.vue")
  },
  data() {
    return {
      frontPage: null,
      selectedImage: "",
      hoveredImage: "",
      albums: []
    };
  },
  async created() {
    const response = await axios.get("/s/forside");
    if (response.data) this.frontPage = response.data;

    const albums = await axios.get("/s/albums");
    this.albums = albums.data;
  },
  methods: {
    getWidth(image) {
      return image.bilde.width - (image.bilde.height - 300) + "px";
    }
  },
  computed: {
    backgroundImage() {
      return `
      background-image: url('${this.frontPage.bakgrunnsbilde.url}');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      `;
    }
  }
};
</script>
<style scoped>
#frontPageHeader {
  color: #fff;
  height: 50vh;
}
#frontPageHeader h1 {
  margin-top: 200px;
}
.images {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
img {
  height: 400px;
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
