<template>
  <div id="app">
    <div id="nav">
      <div id="home">
        <router-link to="/">Forside</router-link>
      </div>
      <div id="menu">
        <router-link to="/about">Om</router-link>
        <!-- <router-link to="/album">Album</router-link> -->
      </div>
    </div>
    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fafafa;
  min-height: 100vh;
}
#content {
  padding-top: 70px;
}
#nav {
  height: 70px;
  padding-top: 15px;
  position: fixed;
  background-color: #333;
  z-index: 999;
  right: 0;
  left: 0;
  line-height: 40px;
}
#nav #home {
  position: fixed;
  left: 20px;
  z-index: 999999;
}
#nav #menu {
  right: 0;
  position: fixed;
}

#nav a {
  font-size: 22px;
  color: #fff;
  margin-right: 20px;
}

#nav a.router-link-exact-active {
  border-bottom: 2px solid #fff;
}
</style>
