<template>
    <div class="parent">
        <div class="popUp">
            <h6 class="text-danger">{{ pop }}</h6>
        </div>
        <div class="container">
            <div class="logo">
                <h1 class="text-dark">LOGO</h1>
            </div>
            <h6>SignUp</h6>
            <form>
                <input type="text" placeholder="name" v-model="name">
                <p class="rname">{{ nresult }}</p>
                <input type="email" placeholder="e-mail" v-model="email">
                <p class="rname">{{ mresult }}</p>
                <div class="PassWord">
                    <input :type="fieldType" placeholder="password" v-model="password" class="show">
                    <i :class="iconSrc" class="eye" @click.prevent="switchPass(), switchIconSrc()"></i>
                </div>
                <p class="rname">{{ presult }}</p>
                <div class="btnOptions">
                    <button class="btno1"
                        @click.prevent="callingFunc()">SignUp</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'SignUp',
    data() {
        return {
            pop: '',
            name: '',
            nresult: '',
            email: '',
            mresult: '',
            password: '',
            presult: '',
            fieldType: 'password',
            iconSrc: 'fa-solid fa-eye',
        }
    },
    methods: {
        testName() {
            // if (this.name.includes('#')||
            //     this.name.includes('!')||
            //     this.name.includes('?')||
            //     this.name.includes('%')||
            //     this.name.includes('$')||
            //     this.name.includes('@')||
            //     this.name.includes('&')||
            //     this.name.includes('^')||
            //     this.name.includes('*')) {
            //     this.nresult = ` Make sure name not contain "!/#/$/%/^/*/?/&/@" `;
            // }
            var forbiddenChars = ['!', '@', '#', '$', '%', '^', '&', '*', '?', ':', ';', '.', ',', '<', '>', '~', '/', '|', '\\'];
            if (forbiddenChars.some(char => this.name.includes(char))) {
                this.nresult = ` Make sure name not contain " !/#/$/%/^/* " or other special char `;
                return false;
            }
            else {
                this.nresult = '';
                return true;
            }
        },
        testMail() {
            if (this.email.includes('@') && this.email.includes('.')) {
                this.mresult = "";
                return true;
            } else {
                this.mresult = "e-mail is not valid";
                return false;
            }
        },
        testPassword() {
            if (this.password.length >= 8) {
                const lowerLetters = /[a-z]/;
                const upperLetters = /[A-Z]/;
                const chars = /[!@#$%^&*(){}?!*/|\\/]/;
                if (lowerLetters.test(this.password) &&
                    upperLetters.test(this.password) &&
                    chars.test(this.password)) {
                    this.presult = '';
                }
                else {
                    this.presult = 'password should contain upper, lower letters and special chars';
                    return false;
                }
                return true;
            }
            else {
                this.presult = "password should be more than or equal 8";
                return false;
            }
        },
        checkContent() {
            if (this.name.length > 0 && this.email.length > 0 && this.password.length > 0) {
                this.pop = "";
                return true;
            } else {
                this.pop = "You should fill in all the inputs";
                return false;
            }
        },
        switchPass() {
            if (this.fieldType === "password") {
                this.fieldType = "text";
            }
            else {
                this.fieldType = "password";
            }
        },
        switchIconSrc() {
            if (this.iconSrc === "fa-solid fa-eye") {
                this.iconSrc = "fa-solid fa-eye-slash";
            } else {
                this.iconSrc = "fa-solid fa-eye";
            }
        },
        async signUp() {
            let result = await axios.post("http://localhost:3000/users", {
                name: this.name,
                email: this.email,
                password: this.password
            });
            if (result.status == 201) {
                localStorage.setItem("user_data", JSON.stringfy(result.data))
            }
        },
        callingFunc(){
            this.testName(),this.testMail(),this.testPassword(),this.checkContent();
            if(this.testName()&&this.testMail()&&this.testPassword()&&this.checkContent())
            {
                this.signUp();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    text-transform: capitalize;
}

.parent {
    position: relative;
    height: 90vh;
    width: 100%;
    margin: 2rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .popUp {
        position: absolute;
        top: 0;
    }

    .container {
        width: 400px;
        padding: 7rem 0;
        border: 1px solid #000;
        background: rgba(253, 253, 253, 0.408);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(0, 76, 255, 0.408);

        .logo,
        h6 {
            margin: 1rem 0;
            position: relative;
            top: -80px;
        }

        form {
            input {
                margin: 0.5rem 0;
                width: 70%;
                border: 0;
                outline: rgba(0, 76, 255, 0.408) 2px solid;
                text-transform: none;

                &:focus {
                    outline: 0;
                    border: 2px solid #1f1f1f;
                }

                &::placeholder {
                    text-transform: uppercase;
                }
            }

            .PassWord {
                width: 70%;
                position: relative;
                margin: auto;

                .show {
                    position: relative;
                    width: 100%;
                }

                .eye {
                    position: absolute;
                    top: 30%;
                    right: 3%;
                    cursor: pointer;
                }
            }

            .btnOptions {
                button {
                    position: relative;
                    margin: 0.5rem;
                    background-color: unset;
                    border: 0;
                    overflow: hidden;
                    transition: all ease 0.5s;

                    &::before {
                        content: "";
                        position: absolute;
                        top: 200%;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 76, 255, 0.408);
                        z-index: -1;
                        transition: all ease 0.5s;
                    }

                    &:hover {
                        color: #fff;

                        &::before {
                            top: 0;
                        }
                    }
                }
            }

            p {
                width: 69%;
                text-transform: lowercase;
                font-size: 8px;
                color: red;
                opacity: 0.6;
                margin: 0 auto;
                text-align: left;
                padding: 0;
            }
        }
    }
}
</style>    