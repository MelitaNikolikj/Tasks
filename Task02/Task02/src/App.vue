<template>
  <div id="app">
    <header>
      <div class="logo-container">
        <h1>Hacker News Clone</h1>
      </div>
      <search-bar></search-bar>
    </header>
    <div class="container">
      <sidebar></sidebar>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    SearchBar,
    Sidebar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.logo-container {
  width: 30%;
}

h1 {
  margin: 0;
  color: rgb(133, 133, 133);
}

search-bar {
  width: 70%;
}

.container {
  display: flex;
}

main {
  padding: 20px;
  flex-grow: 1;
}
</style>
