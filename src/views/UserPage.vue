<template>
  <div class="user-wrapper">
    <div class="user-wrapper-d2">
      <div class="col-left">{{ userData.username }}</div>
      <div class="user-data" v-for="(data, name) in userData" :key="data.id">
        <div class="col-left">
          {{ name }}
        </div>
        <div
          v-if="
            typeof data === 'object' && !Array.isArray(data) && data !== null
          "
          class="col-right"
          style="flex-direction: column"
        >
          <div
            class="user-data-nested"
            v-for="(dataItem, dataItemName) in data"
            :key="dataItemName"
          >
            <div class="col-left">
              {{ dataItemName }}
            </div>

            <div
              class="col-right"
              v-if="
                typeof dataItem === 'object' &&
                !Array.isArray(dataItem) &&
                dataItem !== null
              "
              style="flex-direction: column"
            >
              <div
                class="user-data-nested-two"
                v-for="(childDataItem, childDataItemName) in dataItem"
                :key="childDataItemName"
              >
                <div class="col-left">
                  {{ childDataItemName }}
                </div>
                <div class="col-right">
                  {{ childDataItem }}
                </div>
              </div>
            </div>
            <div v-else class="col-right">
              {{ dataItem }}
            </div>
          </div>
        </div>
        <div v-else class="col-right">
          {{ data }}
        </div>
      </div>

      <div class="user-posts">
        <div class="col-left">Posts</div>
        <div
          class="user-data user-post"
          v-for="post in userPosts"
          :key="post.id"
          @click="goToPostPage(post.id)"
        >
          <div class="col-left">
            {{ post.title }}
          </div>
          <div class="col-right">
            {{ post.body }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPage",
  data() {
    return {
      userData: {},
      allPosts: [],
    };
  },

  methods: {
    async fetchUser(id) {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      const data = await res.json();

      return data;
    },
    async fetchAllPosts() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

      const data = await res.json();

      return data;
    },
    goToPostPage(postId) {
      this.$router.push(`/post/${postId}`);
    },
  },
  computed: {
    userPosts() {
      return this.allPosts.filter(
        (post) => post.userId.toString() === this.$route.params.id
      );
    },
  },
  async created() {
    this.userData = await this.fetchUser(this.$route.params.id);
    this.allPosts = await this.fetchAllPosts();
  },
};
</script>

<style scoped>
.user-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}
.user-wrapper-d2 {
  display: flex;
  flex-direction: column;
  width: 80%;
}
.user-wrapper .col-left {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
}
.user-wrapper .col-right {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
}
.user-data {
  display: flex;
  /* flex-direction: column; */
}
.user-data-nested,
.user-data-nested-two {
  display: flex;
  width: 100%;
}

.user-posts {
  margin-top: 20px;
}
.user-post {
  cursor: pointer;
}

.col-left {
  color: white;
}
.col-right a {
  color: #424874;
}
</style>