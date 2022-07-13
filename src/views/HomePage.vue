<template>
  <h1>Posts</h1>
  <div class="posts">
    <ul>
      <li v-for="post in posts" :key="post.id">
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
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      posts: [],
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
  },
  async created() {
    this.posts = await this.fetchPosts();

    this.posts = await Promise.all(
      this.posts.map(async (post) => {
        const userName = await this.fetchUserName(post.userId);
        return { ...post, userName };
      })
    );
  },
};
</script>

<style scoped>
.posts {
  display: flex;
  justify-content: center;
}
ul {
  list-style-type: none;
}
ul li {
  display: flex;
}

.col-left {
  display: flex;
  align-items: center;
}
.col-left a {
  display: inline-block;
  color: white;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  text-align: center;
  width: 100px;
}

.col-right {
  width: 500px;
}
.col-right a {
  color: #424874;
}
</style>