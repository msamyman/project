<template>
  <SearchFilm />
  <Footer />
</template>

<script>
// @ is an alias to /src
import SearchFilm from '@/components/SearchFilm.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Film',
  components: {
    SearchFilm, Footer
  },
  beforeMount() {
    if(localStorage.getItem('name')) {
      const n = JSON.parse(localStorage.getItem('name'))
      if(n.role!=1) {
        this.$router.push("/")
        alert("You have no rights to access")
      }
    } else {
      this.$router.push("/")
      alert("You have no rights to access")
    }
  }
}
</script>
