<template>
  <b-container fluid class="mb-5" v-if="album">
    <b-row>
      <b-col>
        <h1 class="mt-5">{{ album.tittel_album }}</h1>
        <p>{{ album.beskrivelse_album }}</p>
        {{ swiperOptionsGallery.loopedSlides }}
      </b-col>
    </b-row>

    <b-row>
      <b-col md="10" offset-md="1">
        <!-- Gallery -->
        <swiper
          id="mainImage"
          class="swiper"
          :options="swiperOptionsGallery"
          ref="swiperTop"
        >
          <swiper-slide v-for="image in album.bilder" :key="image.id">
            <img :src="image.bilde.url" class="swiper-lazy" />
            <!-- <div
              class="swiper-lazy-preloader swiper-lazy-preloader-white"
            ></div> -->
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </b-col>
      <!-- Thumbnails -->
    </b-row>
    <b-row>
      <b-col class="mt-3" md="8" offset-md="2" id="thumbnails">
        <img
          v-for="(image, index) in album.bilder"
          :key="image.id"
          :src="image.bilde.formats.thumbnail.url"
          :class="{ selectedImage: activeImage == index }"
        />
      </b-col>
    </b-row>

    <b-row>
      <b-col class="mt-5" md="8" offset-md="2">
        <h2>Alle album</h2>
        <b-col
          class="text-left mt-5"
          v-for="album in allAlbums"
          :key="album.id"
        >
          <router-link :to="`/album/${album.tittel_album.toLowerCase()}`">
            <h3>{{ album.tittel_album }}</h3>
            <img
              class="thumbnail"
              v-for="image in album.bilder"
              :key="image.id"
              :src="image.bilde.formats.thumbnail.url"
            />
          </router-link>
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import { Swiper as SwiperClass, Pagination, Navigation } from "swiper/core";
SwiperClass.use([Pagination, Navigation]);
import getAwesomeSwiper from "vue-awesome-swiper/dist/exporter";
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass);
import "swiper/swiper-bundle.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      onAlbumPage: false,
      selectedImage: "",
      swiperOptionsGallery: {
        spaceBetween: 50,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      album: [],
      allAlbums: [],
      activeImage: "",
    };
  },
  async created() {
    this.allAlbums = await this.fetchAlbums();
    this.selectAlbum(this.allAlbums);

    this.swiper.on("slideChangeTransitionEnd", (swiper) => {
      this.activeImage = swiper.realIndex;
    });
  },
  methods: {
    async fetchAlbums() {
      const response = await axios.get("/s/albums");
      return response.data;
    },
    selectAlbum(albums) {
      if (this.albumToView) {
        this.album = albums.find(
          (album) => album.tittel_album.toLowerCase() == this.albumToView
        );
      } else {
        this.album = albums[0];
      }
      if ("image" in this.$route.params) {
        this.openImage(this.$route.params.image);
      }
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    openImage(imageTitle) {
      const index = this.album.bilder.findIndex(
        (image) => image.tittel == imageTitle
      );
      this.swiperTop.slideTo(index);
    },
  },
  computed: {
    swiper() {
      return this.$refs.swiperTop.$swiper;
    },
    albumToView() {
      return "album" in this.$route.params ? this.$route.params.album : "";
    },
  },
  watch: {
    $route() {
      this.selectAlbum(this.allAlbums);
    },
  },
};
</script>

<style scoped>
a {
  color: #333;
}
#mainImage img {
  height: 80vh;
}
.swiper-pagination >>> .swiper-pagination-bullet {
  opacity: 1;
  border: white solid 1px;
  background-color: transparent;
}
.swiper-pagination >>> .swiper-pagination-bullet-active {
  background-color: white;
}
.image-wrapper {
  padding: 0;
}
img {
  object-fit: cover;
  padding: 0;
  margin: 0;
}
.swiper-slide-next {
  padding: 0;
  margin: 0;
}
#thumbnails {
  display: inline;
  text-align: left;
}
#thumbnails .selectedImage {
  opacity: 1;
}
#thumbnails img {
  opacity: 0.4;
  height: 100px;
  width: 10%;
}
.gallery-thumbs .swiper-slide {
  width: auto;
  height: 100%;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
.thumbnail {
  height: 150px;
  object-fit: cover;
  width: 20%;
}
</style>
