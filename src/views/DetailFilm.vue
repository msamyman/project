<template>
    <section class="fh5co-filmdetail-content">
        <div class="blog-content-bckg">
            <p class="breadcrumbs"><router-link to="/">Home</router-link> / Film / {{ film.title }}</p>
            <div class="blog-content-inner">
                <div class="container-fluid">
                <div class="row single-blog">
                    <div class="col-xl-6 col-lg-12 single-blog__img">
                    <img class="card-img w-100" v-bind:src="film.poster" v-bind:alt="film.title" />
                    </div>
                    <div class="col-xl-6 col-lg-12 single-blog__text">
                    <h2>{{ film.title }}</h2>
                    <p>{{ film.genre }} ({{ film.year }})</p>
                    <table>
                        <tbody>
                        <tr>
                            <th width="100">Released</th>
                            <td>{{ film.released }}</td>
                        </tr>
                        <tr>
                            <th>Runtime</th>
                            <td>{{ film.runtime }}</td>
                        </tr>
                        <tr>
                            <th>Language</th>
                            <td>{{ film.language }}</td>
                        </tr>
                        <tr>
                            <th>Director</th>
                            <td>{{ film.director }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <button class="button" @click="back()">Back ⮌</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
    <Footer />
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'

export default {
    name: 'DetailFilm',
    components: {
        Footer
    },
    data() {
        return {
            idx: '',
            film: {},
            loading: false
        }
    },
    beforeMount() {
        this.fetchFilm(this.$route.params.idx)
    },
    methods: {
        async fetchFilm(idx){
            const res = await fetch(`http://47.242.250.90:18888/film/${idx}`)
            const data = await res.json();
            this.film = data[0]
        },
        back(){
            return this.$router.go(-1)
        }
    }
}
</script>

