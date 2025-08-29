<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="6">
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        로그인
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                label="이메일"
                                type="email"
                                v-model="email"
                                prepend-icon="mdi-email"
                            />
                            <v-text-field
                                label="비밀번호"
                                type="password"
                                v-model="password"
                                prepend-icon="mdi-lock"
                            />
                            <v-row>
                                <v-col>
                                    <v-btn color="primary" block @click="memberLogin()">
                                        로그인
                                    </v-btn>
                                </v-col>
                        
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getErrorMessage, getResultData } from '@/utils/commonDataHandler';
import axios from 'axios';

export default{
    data(){
        return{
            email: "",
            password: "",
        }
    },
    methods:{
        async memberLogin(){
            try{
            const data = {email:this.email, password:this.password}
            const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/doLogin`, data);
            const result = getResultData(response);
            const accessToken = result.accessToken;
            const refreshToken = result.refreshToken;
            console.log(accessToken)
            console.log(refreshToken)
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            window.location.href = "/";

            // this.$router.push("/"); // 헤더는 새로 반영 안됨
            }catch(e){
                console.log(e);
                alert(getErrorMessage(e));
            }
            
        }
    }
}
</script>