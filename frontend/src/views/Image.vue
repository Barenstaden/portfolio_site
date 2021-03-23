<template>
  <div>
    <b-container fluid>
      <b-row v-if="image">
        <b-col class="text-center mt-5">
          <!-- <h3>{{ image.title }}</h3> -->
          <img class="mt-3" :src="image.image.url" alt="" />
          <p>
            <strong>{{ image.description }}</strong>
          </p>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="mt-3 text-left" v-if="image">
      <b-row>
        <b-col>
          <h3 v-if="image.comments.length" class="ml-3">Kommentarer</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          sm="12"
          class="mt-4 ml-3 comment"
          v-for="comment in image.comments"
          :key="comment.id"
        >
          <h4>{{ comment.name }}</h4>
          <p>{{ comment.comment }}</p>
        </b-col>
        <b-col class="ml-3 mt-3">
          <b-form @submit.prevent="submitComment" v-if="!didComment">
            <h4>Legg til en kommentar</h4>
            <b-form-group>
              <b-form-input
                v-model="name"
                placeholder="Ditt navn"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-textarea
                id="textarea"
                v-model="comment"
                placeholder="Skriv en kommentar..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary">Lagre</b-button>
          </b-form>
          <h4 v-if="didComment">
            Takk for din kommentar!
          </h4>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="image" class="mt-5">
      <b-row>
        <b-col v-for="album in image.albums" :key="album.id">
          <h3 class="text-left ml-3">Flere bilder fra dette albumet</h3>
          <Album
            :images="otherImagesFromAlbum(album.images)"
            :album="album.id"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import gql from "graphql-tag";
import axios from "axios";
export default {
  data() {
    return {
      didComment: false,
      name: "",
      comment: ""
    };
  },
  components: {
    Album: () => import("@/components/Album.vue")
  },
  methods: {
    async submitComment() {
      try {
        const response = await axios({
          method: "post",
          url: "/s/comments",
          data: {
            name: this.name,
            comment: this.comment,
            image: this.image.id
          }
        });
        this.name = "";
        this.comment = "";
        this.image.comments.push(response.data);
        this.didComment = true;
      } catch (error) {
        this.error = true;
      }
    },
    otherImagesFromAlbum(images) {
      return images.filter(image => image.id != this.image.id);
    }
  },
  apollo: {
    image: {
      query: gql`
        query image($id: ID!) {
          image(id: $id) {
            title
            description
            id
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
            image {
              url
            }
            comments {
              id
              name
              comment
              published_at
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.image
        };
      }
    }
  },
  watch: {
    $route() {
      this.didComment = false;
    }
  }
};
</script>

<style scoped>
img {
  max-height: 80vh;
  max-width: 90vw;
}
</style>
