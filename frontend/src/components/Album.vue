<template>
  <b-col class="mt-3">
    <stack
      :column-min-width="300"
      :gutter-width="15"
      :gutter-height="15"
      monitor-images-loaded
    >
      <stack-item v-for="image in images" :key="image.id">
        <img
          class="gallery-image"
          width="300px"
          :src="
            image.image.formats && image.image.formats.small
              ? image.image.formats.small.url
              : image.image.url
          "
          @click="selectedImage = image"
        />
      </stack-item>
    </stack>

    <b-modal
      id="imageModal"
      centered
      v-model="showModal"
      size="lg"
      ok-title="Lukk"
      ok-only
    >
      <div v-for="(image, i) in images" :key="image.id">
        <div v-if="i == slide" class="text-center mb-2">
          <router-link
            :to="`/bilde/${album}/${image.id}`"
            class="comments-count"
          >
            <b-icon-chat></b-icon-chat> {{ image.comments.length }}
          </router-link>
          <!-- <h3>
            {{ image.title }}
          </h3> -->
          <p class="mb-0">
            <span class="mr-2">📷</span>{{ image.description }}
          </p>
          <router-link
            v-if="!$route.params.image || $route.params.image != image.id"
            :to="`/bilde/${album}/${image.id}`"
            >Åpne full størrelse</router-link
          >
        </div>
      </div>
      <b-carousel
        v-model="slide"
        :interval="0"
        controls
        fade
        background="#ababab"
      >
        <b-carousel-slide
          v-for="image in images"
          :key="image.id"
          :img-src="
            image.image.formats && image.image.formats.small
              ? image.image.formats.small.url
              : image.image.url
          "
        >
        </b-carousel-slide>
      </b-carousel>
    </b-modal>
  </b-col>
</template>

<script>
import { Stack, StackItem } from "vue-stack-grid";
export default {
  components: {
    Stack,
    StackItem
  },
  props: {
    images: Array,
    album: String
  },
  created() {
    console.log(this.images);
  },
  data() {
    return {
      selectedImage: null,
      slide: 0
    };
  },
  computed: {
    showModal: {
      get() {
        return this.selectedImage != null;
      },
      set() {
        this.selectedImage = null;
      }
    }
  },
  watch: {
    selectedImage() {
      if (!this.selectedImage) return 0;
      this.slide = this.images.findIndex(
        image => image.id == this.selectedImage.id
      );
    },
    $route() {
      this.selectedImage = null;
    }
  }
};
</script>

<style>
.gallery-image {
  cursor: pointer;
  width: 100%;
  height: auto;
  border-radius: 12px;
}
.carousel-caption h3 {
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}
.carousel-item img {
  border-radius: 7px;
}
.modal-footer button {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: red;
}
.comments-count {
  position: absolute;
  right: 20px;
  font-size: 20px;
}
</style>
