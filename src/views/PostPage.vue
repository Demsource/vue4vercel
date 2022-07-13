<template>
  <div class="user-data-wrapper">
    <div
      class="user-data"
      @click="goToUserPage(userData.id)"
      title="Go to user page"
    >
      <div class="user-fullname">
        <div class="col-left">Full Name:</div>
        <div class="col-right">
          {{ userData.name }}
        </div>
      </div>
      <div class="user-fullname">
        <div class="col-left">Email:</div>
        <div class="col-right">{{ userData.email }}</div>
      </div>
    </div>
  </div>
  <div class="post-wrapper">
    <div class="post">
      <div class="col-left">
        {{ post.title || "User Name" }}
      </div>
      <div class="col-right">
        {{ post.body }}
      </div>
    </div>
  </div>
  <div class="comments-wrapper">
    <div class="comments-wrapper-d2">
      <div class="col-left">Comments</div>
      <div
        class="comments"
        v-for="comment in computedComments"
        :key="comment.id"
      >
        <div class="col-left">
          {{ comment.name }}
        </div>
        <div class="col-right">
          {{ comment.body }}
        </div>
      </div>
      <div class="show-all" @click="displayAll">
        {{ showAllComments ? "Show Less" : "Show All" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostPage",
  data() {
    return {
      userData: {},
      post: {},
      postComments: [],
      showAllComments: false,
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
    async fetchPost(id) {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );

      const data = await res.json();

      return data;
    },
    async fetchComments(id) {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${id}`
      );

      const data = await res.json();

      return data;
    },
    goToUserPage(userId) {
      this.$router.push(`/user/${userId}`);
    },
    displayAll() {
      this.showAllComments = !this.showAllComments;
    },
  },
  async created() {
    this.post = await this.fetchPost(this.$route.params.id);
    this.userData = await this.fetchUser(this.post.userId);
    this.postComments = await this.fetchComments(this.post.id);
  },
  computed: {
    computedComments() {
      return !this.showAllComments
        ? this.postComments.slice(0, 3)
        : this.postComments;
    },
  },
};
</script>
<style scoped>
.user-data-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}
.user-data {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.user-data > div {
  display: flex;
}
.user-data .col-left {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
}

.user-data .col-right {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #424874;
  text-align: center;
  width: 200px;
  word-break: break-all;
}

.post-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.post {
  display: flex;
  flex-direction: column;
  width: 80%;
}

.comments-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.comments-wrapper-d2 {
  display: flex;
  flex-direction: column;
  width: 80%;
}
.comments-wrapper .col-left {
  width: 20%;
}
.comments-wrapper .col-right {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
}
.comments {
  display: flex;
  /* flex-direction: column; */
}
.show-all {
  align-self: end;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #424874;
  border: 2px solid #a6b1e1;
  color: white;
  font-weight: bold;
  padding: 5px;
  width: 100px;
}

.col-left {
  color: white;
}
.col-right a {
  color: #424874;
}
</style>