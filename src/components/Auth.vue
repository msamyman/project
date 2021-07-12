<template>
    <div class="form" v-if="!login">
        <!-- User name, Password and login button -->
        <h3 class="text-uppercase">Staff / Customer</h3>
        <input v-model="username" type="text" class="form-control" placeholder="Username" />
        <input v-model="password" type="password" class="form-control" placeholder="Password" />
        <button @click="checkLogin">Login ➜</button>
        <p class="warningMsg">{{ message }}</p>
    </div>
    <div class="form" v-if="login">
        <!-- Welcome message and logout button -->
        <h3>Welcome, {{ role }}</h3>
        <div class="container recent">
            <div class="row mr-0 ml-0">
                <div class="col-md-12">
                    <router-link to="/changepassword">
                        <button>Change password</button>
                    </router-link>
                </div>
                <div class="col-md-12">
                    <button @click="logout">Logout ➜</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            login: false,
            username: '',
            password: '',
            message: '',
            role: ''
        }
    },beforeMount() {
        if(localStorage.getItem('name')) {
            this.login = true
        }
        if(localStorage.getItem('role')) {
            this.role = localStorage.getItem('role')
        }
    }, 
    methods: {
        logout() {
            localStorage.clear()
            this.login = false
        },
        checkLogin() {
            this.message = ''
            if( this.username.length == 0 || this.password.length == 0 ) {
                this.message = 'Please provide necessary information.'
                return 
            }
            const body = JSON.stringify({
                'user': this.username,
                'pwd': this.password
            })
    
            fetch('http://47.242.250.90:18888/auth', { // [API endpoint]
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
                if(res.status == 200 || res.status == 403)
                    return res.json()
                else 
                    throw 'Log in Failed'
            }).then(json => {                
                this.login = true                
                if(json.role == 1)
                    this.role = 'Staff'
                else 
                    this.role = 'Customer'
                localStorage.setItem('name', JSON.stringify(json))
                localStorage.setItem('role', this.role)
            }).catch(err => {
                if(err) {
                    this.login = false
                    this.message = err                    
                }
            })
        }
    }
}
</script>

<style> 
.warningMsg {
    color: red;
}
</style>