<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <header><router-link to="/">Go to Home Page</router-link></header>
  <router-view />
</template>

<script>
// // import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  background: #2c3e50;
  padding: 10px;
}
header a {
  font-weight: bold;
  color: white;
  margin-left: 50px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin: 20px 0;
}
a {
  text-decoration: none !important;
}

.col-left {
  display: inline-block;
  background: #424874;
  border: 2px solid #a6b1e1;
  /* border-bottom: 2px solid #a6b1e1; */
  padding: 10px;
  text-align: center;
}
.col-right {
  display: inline-block;
  background: #dcd6f7;
  border: 2px solid #a6b1e1;
  padding: 10px;
}
</style>
