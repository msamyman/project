<template>
  <div class="container-fluid fh5co-recent-work activity login">
    <div class="container recent">
      <div class="row mr-0 ml-0">
        <div class="col-md-12 content-us">
          <div class="form">
            <!-- Welcome message and logout button -->
            <h3>Change Password</h3>
            <input v-model="password" type="password" class="form-control" placeholder="Enter New Password" />
            <input v-model="passwordconfirm" type="password" class="form-control" placeholder="Enter New Password Confirm" />
            <button @click="updatePassword">Update</button>
            <p class="warningMsg">{{ message }}</p>
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
  name: 'ChangePassword',
  components: {
    Footer
  },
  data() {
      return {
          password: '',
          passwordconfirm: '',
          message: '',
          name: JSON.parse(localStorage.getItem('name'))
      }
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
  },
  methods: {
    updatePassword() {
      this.message = ''
      if( this.password.length == 0 || this.password != this.passwordconfirm) {
          this.message = 'Please provide necessary information.'
          return 
      }
      const body = JSON.stringify({
          'key': this.name.s,
          'newpwd': this.passwordconfirm
      })

      fetch('http://47.242.250.90:18888/update', { // [API endpoint]
          method: 'PUT',
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
              throw 'Log in Failed'
      }).catch(err => {
          if(err) {
              this.message = err                    
          }
      })
      alert("Password Change Successful, Please Login again!")
      localStorage.clear()
      this.$router.push("/login")
    }
  }
}
</script>

<style>
.form a:hover{
    text-decoration: none;
    color: #fff;
}

.warningMsg {
    color: red;
}
</style>