<template>
    <h1>vue 조건식</h1>
    <button v-if="!isLogined" @click="doLogin()">로그인버튼</button>
    <button v-if="isLogined" @click="doLogout()">로그아웃버튼</button>
    <div v-if="!isLogined">로그인 해주세요</div>
    <div v-if="isLogined">환영합니다</div>

    <h1>상품목록조회</h1>

    <table>
        <thead>
            <tr>
                <th>id</th>
                <th>상품명</th>
                <th>상품가격</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in productList" :key="product.id">
                <td>{{product.id}}</td>
                <td>{{product.name}}</td>
                <td>{{product.price}}</td>

            </tr>
        </tbody>
    </table>

</template>


<script>
import axios from 'axios';

export default{
    data(){
        return{
            isLogined : false,
            // productList: [{id:1, name:"사과", price:"1000"}, {id:2, name:"배", price:"2000"}, {id:3, name:"귤", price:"3000"}]
            productList: []
        }
    },
    // 화면이 열림과 동시에 실행되는 hook함수 : created
    async created(){
        const response = await axios.get("http://localhost:8080/product/list");
        console.log(response);
        this.productList = response.data.result.content;

    },

     methods: {
        doLogin(){
            this.isLogined = true;
        },
        doLogout(){
            this.isLogined = false;
        }

     }

}
</script>