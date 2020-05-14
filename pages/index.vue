<template>
    <div class="container">
        <Header />
        <h1 class="title">
            zodiac-G12.github.io
        </h1>
        <h2 class="subtitle">
            Wellcome to my homepage
        </h2>
        <div class="links">
            <a
                href="https://zodiac-g12.github.io/creation/description.html"
                target="_blank"
                rel="noopener noreferrer"
                class="button--green"
                >
                Portfolio
            </a>
            <a
                href="https://github.com/zodiac-G12"
                target="_blank"
                rel="noopener noreferrer"
                class="button--grey"
                >
                GitHub
            </a>
            <a
                href="https://zodiac-g12.github.io/blog/"
                target="_blank"
                rel="noopener noreferrer"
                class="button--indigo"
                >
                Blog
            </a>
        </div>
        <footer class="subtitle" style="position:absolute;font-size:90%;bottom:5vh;left:0;right:0;margin: auto;">© ZODIAC-G12 2020</footer> 
    </div>
</template>

<script>
const Header = () => import('~/components/header.vue');

export default {
  components: {
    Header
  }
}
</script>

<style>
.container {
  margin-top: 5vh;
  display: block;
  /* justify-content: center; */
  /* align-items: center; */
  text-align: center;
}

.title {
  margin-top: 5vh;
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 140%;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 120%;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
