<template>
  <h1>Posts</h1>
  <div class="posts">
    <ul>
      <li v-for="post in displayPosts" :key="post.id">
        <div class="col-left">
          <router-link
            :to="{ name: 'user', params: { id: post.userId } }"
            :title="post?.userName || 'User Name'"
            >{{ post?.userName || "User Name" }}</router-link
          >
        </div>
        <div class="col-right">
          <router-link :to="{ name: 'post', params: { id: post.id } }">{{
            post.title
          }}</router-link>
        </div>
      </li>
    </ul>
  </div>
  <vue-awesome-paginate
    :total-items="posts.length"
    :items-per-page="perPage"
    :max-pages-shown="3"
    :current-page="startPage"
    :on-click="onClickHandler"
  />
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      posts: [],
      displayPosts: [],
      perPage: 20,
      startPage: 1,
    };
  },
  methods: {
    async fetchPosts() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");

      const data = await res.json();

      return data;
    },
    async fetchUserName(userId) {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );

      const { username } = await res.json();

      return username;
    },
    onClickHandler(page) {
      const startIndex = this.perPage * (page - 1);
      const endIndex = startIndex + this.perPage;

      this.displayPosts = this.posts.slice(startIndex, endIndex);
    },
  },
  async created() {
    this.posts = await this.fetchPosts();

    this.posts = await Promise.all(
      this.posts.map(async (post) => {
        const userName = await this.fetchUserName(post.userId);
        return { ...post, userName };
      })
    );

    this.onClickHandler(this.startPage);
  },
};
</script>

<style>
.posts {
  display: flex;
  justify-content: center;
}
.posts ul {
  list-style-type: none;
}
.posts ul li {
  display: flex;
}

.posts .col-left {
  display: flex;
  align-items: center;
}
.posts .col-left a {
  display: inline-block;
  color: white;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  text-align: center;
  width: 100px;
}

.posts .col-right {
  width: 500px;
}
.posts .col-right a {
  color: #424874;
}

/* STYLING vue-awesome-paginate */

.pagination-container {
  display: flex;
  justify-content: center;
  column-gap: 10px;
  margin: 30px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #424874;
  border: 1px solid #424874;
  color: white;
}
.active-page:hover {
  background-color: #2a2e52;
}

/* END OF STYLING vue-awesome-paginate */
</style>