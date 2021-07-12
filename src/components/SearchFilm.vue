<template>
    <div class="container-fluid fh5co-recent-work activity login">
    <div class="container recent">
      <div class="row mr-0 ml-0">
        <div class="col-md-12 content-us">
          <div class="form">
            <h3 class="text-uppercase">Search &amp; Edit Film</h3>
            <p style="text-align: center">You may search and edit a film information.</p>
            <input v-model="title" type="text" class="form-control" placeholder="Enter Film Title" />
            <div class="btn-group">
                <button @click="searchResult">Search ➜</button>
                <button @click="addFilm">Add New Film</button>
            </div>
            <p class="warningMsg">{{ message }}</p>
        </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid fh5co-recent-work activity login login-edit">
    <div class="container recent">
        <div class="row single-blog">
          <h2>Film Information</h2>
          <div class="col-xl-4 col-lg-12 single-blog__img">
            <img class="card-img w-100" v-bind:src="filmposter" v-bind:alt="filmtitle" v-bind:title="filmtitle" v-if="search"/>
          </div>
          <div class="col-xl-8 col-lg-12 single-blog__text">
            <div class="form film-form">
                <div id="result">
                    <div v-if="add">
                        <h3>Please enter new film information.</h3>
                    </div>
                    <label>Title</label><input v-model="filmtitle" type="text" class="form-control" name="detail-film-item"/>
                    <label>Year</label><input v-model="filmyear" type="text" class="form-control" name="detail-film-item"/> 
                    <label>Released</label><input v-model="filmreleased" type="text" class="form-control" name="detail-film-item"/> 
                    <label>Runtime</label><input v-model="filmruntime" type="text" class="form-control" name="detail-film-item"/> 
                    <label>Language</label><input v-model="filmlanguage" type="text" class="form-control" name="detail-film-item"/> 
                    <label>Genre</label><input v-model="filmgenre" type="text" class="form-control" name="detail-film-item"/> 
                    <label>Director</label><input v-model="filmdirector" type="text" class="form-control" name="detail-film-item"/> 
                    <label>Poster</label><input v-model="filmposter" type="text" class="form-control" name="detail-film-item"/> 
                </div>
                <div v-if="!edit && !add">
                    <button @click="editFilm">Edit</button>
                </div>
                <div class="btn-group">
                    <div v-if="edit">
                        <button @click="saveUpdate">Save</button>
                        <button @click="cancelUpdate">Cancel</button>
                    </div>
                    <div v-if="add">
                        <button @click="saveAdd">Save</button>
                        <button @click="cancelAdd">Cancel</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            message: '',
            filmtitle: '',
            filmyear: '',
            filmreleased: '',
            filmruntime: '',
            filmlanguage: '',
            filmgenre: '',
            filmdirector: '',
            filmposter: '',
            name: JSON.parse(localStorage.getItem('name')),
            search: false,
            edit: false,
            add: false
        }
    }, 
    methods: {
        searchResult() {
            this.edit = false
            this.add = false
            this.message = ''
            this.filmtitle = ''
            this.filmposter = ''
            if( this.title.length == 0) {
                this.message = 'Please provide necessary information.'
                return 
            }
            fetch('http://47.242.250.90:18888/infofilm/' + this.title )
            .then((res, err) => {
                if(err) {
                    console.log(err)
                    throw 'communication error'
                }            
                if(res.status == 200)
                    return res.json()
                else 
                    throw 'Search Failed'
            }).then(json => {                
                const myJSON = JSON.stringify(json)
                const myObj = JSON.parse(myJSON)
                this.filmtitle = myObj.title
                this.filmyear = myObj.year
                this.filmreleased = myObj.released
                this.filmruntime = myObj.runtime
                this.filmlanguage = myObj.language
                this.filmgenre = myObj.genre
                this.filmdirector = myObj.director
                this.filmposter = myObj.poster

                const detailFilmItem = document.getElementsByName('detail-film-item')
                for(var x=0; x < detailFilmItem.length; x++){
                    detailFilmItem[x].readOnly = true
                }
                this.search = true
            }).catch(err => {
                if(err) {
                    this.message = err                    
                }
            })
        },
        editFilm() {
            const detailFilmItem = document.getElementsByName('detail-film-item')
            for(var x=1; x < detailFilmItem.length; x++){
                detailFilmItem[x].readOnly = false
                detailFilmItem[x].classList.add("item-edit")
            }
            alert("Reminder: You CANNOT update the film title.")
            this.edit = true
            this.add = false
        },
        saveUpdate() {
            const body = JSON.stringify({
                "s": this.name.s,
                "film":{
                    "title": this.filmtitle,
                    "year": this.filmyear,
                    "released": this.filmreleased,
                    "runtime": this.filmruntime,
                    "language": this.filmlanguage,
                    "genre": this.filmgenre,
                    "director": this.filmdirector,
                    "poster": this.filmposter
                }
            })

            fetch('http://47.242.250.90:18888/imfilm', { // [API endpoint]
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            }).then((res, err) => {
                if(err) {
                    console.log(err)
                    throw 'communication error'
                }            
                if(res.status == 201)
                    return res.json()
                else 
                    throw 'Update Failed'
            }).catch(err => {
                if(err) {   
                    this.message = err             
                }
            })

            const detailFilmItem = document.getElementsByName('detail-film-item')
            for(var x=1; x < detailFilmItem.length; x++){
                detailFilmItem[x].readOnly = true
                detailFilmItem[x].classList.remove("item-edit")
            }
            alert("You have updated this film infomation!")
            this.edit = false
        },
        cancelUpdate() {
            const detailFilmItem = document.getElementsByName('detail-film-item')
            for(var x=1; x < detailFilmItem.length; x++){
                detailFilmItem[x].readOnly = true
                detailFilmItem[x].classList.remove("item-edit")
            }
            this.edit = false
        },
        addFilm() {
            return {
                filmtitle: '',
                filmyear: '',
                filmreleased: '',
                filmruntime: '',
                filmlanguage: '',
                filmgenre: '',
                filmdirector: '',
                filmposter: ''
            },
            this.search = false,
            this.edit = false,
            this.add = true
        },
        saveAdd() {
            const body = JSON.stringify({
                "s": this.name.s,
                "film":{
                    "title": this.filmtitle,
                    "year": this.filmyear,
                    "released": this.filmreleased,
                    "runtime": this.filmruntime,
                    "language": this.filmlanguage,
                    "genre": this.filmgenre,
                    "director": this.filmdirector,
                    "poster": this.filmposter
                }
            })

            fetch('http://47.242.250.90:18888/imfilm', { // [API endpoint]
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            }).then((res, err) => {
                if(err) {
                    console.log(err)
                    throw 'communication error'
                }            
                if(res.status == 201)
                    return res.json()
                else 
                    throw 'Update Failed'
            }).catch(err => {
                if(err) {   
                    this.message = err            
                }
            })

            alert("You have added new film record!")
            this.add = false
        },
        cancelAdd() {
            this.add = false
        }
    }
}
</script>

<style>
.film-form{
    margin-top: 0 !important;
}

.film-form label{
    text-transform: capitalize;
}

.form .btn-group{
    width: 100%;
    justify-content: center;
}

.form .btn-group button, .film-form .btn-group button{
    margin: 20px
}

#result input.item-edit:not(:first-of-type){
    background-color: #fff;
}

</style>