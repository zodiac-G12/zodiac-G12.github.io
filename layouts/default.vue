<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
html, body {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 3vh;
  word-spacing: 1px;
  -ms-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  width: 100vw;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 1vh 3vh;
  font-size: 70%;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 1vh 3vh;
  font-size: 70%;
  margin-left: 1vh;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.button--indigo {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid indigo;
  color: indigo;
  text-decoration: none;
  padding: 1vh 3vh;
  font-size: 70%;
  margin-left: 1vh;
}

.button--indigo:hover {
  color: #fff;
  background-color: indigo;
}
</style>
