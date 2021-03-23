<template>
  <div v-if="frontPage">
    <b-container fluid>
      <b-row :style="backgroundImage" id="frontPageHeader" align-v="center">
        <b-col>
          <h1>{{ frontPage.header }}</h1>
          <h5>{{ frontPage.text }}</h5>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-row>
        <b-col class="text-center">
          <h3 class="mt-5">{{ frontPage.album.title }}</h3>
          <Album :images="frontPage.album.images" :album="frontPage.album.id" />
        </b-col>
      </b-row>
      <b-row v-for="album in albums" :key="album.id">
        <b-col class="text-center" v-if="album.id != frontPage.album.id">
          <h3 class="mt-5">{{ album.title }}</h3>
          <p>{{ album.description }}</p>
          <Album :images="album.images" :album="album.id" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  components: {
    Album: () => import("@/components/Album.vue")
  },
  data() {
    return {
      selectedImage: "",
      hoveredImage: "",
      albums: []
    };
  },
  apollo: {
    frontPage: {
      query: gql`
        query {
          frontPage {
            header
            text
            background {
              url
            }
            album {
              id
              title
              description
              images {
                id
                image {
                  url
                }
                description
                title
                comments {
                  id
                }
              }
            }
          }
        }
      `
    },
    albums: {
      query: gql`
        query {
          albums {
            id
            title
            images {
              id
              title
              description
              image {
                url
              }
              comments {
                id
              }
            }
          }
        }
      `
    }
  },
  computed: {
    backgroundImage() {
      return `
      background-image: url('${this.frontPage.background.url}');
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
