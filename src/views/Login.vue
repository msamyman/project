<template>
  <div class="container-fluid fh5co-recent-work activity login">
    <div class="container recent">
      <div class="row mr-0 ml-0">
        <div class="col-md-12 content-us">
          <Auth />
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
// @ is an alias to /src
import Auth from '@/components/Auth.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Login',
  components: {
    Auth, Footer
  }
}
</script>
