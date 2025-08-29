<template>
    <v-app-bar>
        <v-container>
            <v-row>
                <!-- justify-start : 왼쪽 기준 정렬 -->
                <v-col class="d-flex justify-start">
                    <div v-if="userRole==='ADMIN'">
                    <v-btn :to="'/member/list'">회원관리</v-btn>
                    <v-btn :to="'/product/manage'">상품관리</v-btn>
                    <v-btn href="/order/list">실시간주문건수 {{ liveOrderCount }}</v-btn>
                    <!-- <v-btn :to="'/practice/store'">스토어테스트</v-btn> -->
                    </div>
                </v-col>
                <v-col class="text-center">
                    <v-btn :to="'/'">devops shop</v-btn>
                </v-col>
                <v-col class = "d-flex justify-start">
                    <v-btn v-if="isLogined" :to="'/order/cart'">장바구니 {{ totalQuantity }}</v-btn>
                    <v-btn :to="'/product/list'">상품목록</v-btn>
                    <v-btn v-if="isLogined" :to="'/member/mypage'">마이페이지</v-btn>
                    <v-btn v-if="!isLogined" :to="'/member/create'">회원가입</v-btn>
                    <v-btn v-if="!isLogined" :to="'/member/login'">로그인</v-btn>
                    <v-btn v-if="isLogined" @click="doLogout()">로그아웃</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>


<script>
import { EventSourcePolyfill } from 'event-source-polyfill';
import { jwtDecode } from 'jwt-decode';

export default{
    data(){
        return {
            userRole : null,
            isLogined : false,
            cartProductCount : 0,
            liveOrderCount: 0,
        }
    },

    created(){
        const accessToken = localStorage.getItem("accessToken");
        if(accessToken){
            const payload = jwtDecode(accessToken);
            console.log(payload);
            this.userRole = payload.role;
            this.isLogined = true;
        }
        // SSE 연결 및 메시지 수신
        if(this.userRole === 'ADMIN'){
            // sse 연결을 위한 event-source-polyfill 라이브러리 사용
            let sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/sse/connect`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            sse.addEventListener('connect', (event)=>{
                console.log(event);
            })

            sse.addEventListener('ordered', (event)=>{
                console.log(event);
                this.liveOrderCount++;
            })
        }
    },
    
    computed:{
        totalQuantity(){
            return this.$store.getters.getTotalQuantity;
        }
    },

    methods:{
        doLogout(){
            localStorage.clear();
            // 1. 또는
            // window.location.reload();
            // 2.
            this.isLogined = false;
            this.userRole = null;
            this.$router.push("/");
            // 로컬에서는 지워지지만, 서버에는 RT가 남아있음
        }
    }
}
</script>