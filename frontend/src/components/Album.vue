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
          :src="image.bilde.url"
          @click="selectedImage = image"
        />
      </stack-item>
    </stack>

    <b-modal centered v-model="showModal" size="lg" ok-title="Lukk" ok-only>
      <div v-for="(image, i) in images" :key="image.id">
        <div v-if="i == slide" class="text-center">
          <h3>
            {{ image.tittel }}
          </h3>
          <p>{{ image.beskrivelse }}</p>
        </div>
      </div>
      <b-carousel
        v-model="slide"
        :interval="0"
        controls
        indicators
        fade
        background="#ababab"
      >
        <b-carousel-slide
          v-for="image in images"
          :key="image.id"
          :img-src="image.bilde.url"
        ></b-carousel-slide>
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
    images: Array
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
    }
  }
};
</script>

<style>
a {
  color: #333;
}
.gallery-image {
  cursor: pointer;
  width: 100%;
  height: auto;
  border-radius: 12px;
}
.carousel-caption h3 {
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}
</style>
