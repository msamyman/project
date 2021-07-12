<template>
  <div class="container-fluid fh5co-recent-work">
    <div class="container recent" id="film">
      <div class="row">
        <h2>ALL Film List</h2>
        <div class="grid-list" v-if="!loading">
          <div v-for="film in data" :key="film._id">
            <div class="card" v-if="film.title != 0"> 
              <a @click="showDetail(film._id)">
                <img class="card-img" v-if="film.poster == 'N/A' || film.poster == null || film.poster == 0" src="../assets/logo.png" v-bind:alt="film.title" />
                <img class="card-img" v-else v-bind:src="film.poster" v-bind:alt="film.title" />
                <div class="card-img-overlay">
                  <div class="bottom-text">
                    <h5 class="card-title">{{ film.title }}</h5>
                    <p class="card-text">{{ film.released }}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Footer
  },
  data(){
      return {
          data: [],
          loading: false
      }
  },
  beforeMount(){
      this.fetchFilm()
  },
  methods: {
      async fetchFilm(){
          const res = await fetch('http://47.242.250.90:18888/list')
          const data = await res.json();
          this.data = data
      },
      showDetail(id){
          this.$router.push({name: 'DetailFilm', params: {idx: id}})
      }
  }
}

</script>

