<template>
    <div>라우트화면3</div>
</template>

<script>
export default{
    data(){
        return{
            id: null
            // 전역적으로 사용하기 위해 초기에 null로 세팅
        }
    },
    created(){
        // 라우터에서 전달된 id값(param) 꺼내기
        this.id = this.$route.params.postId;
        // 서버에 id값으로 데이터 요청
        // const response = axios.get("http://localhost:8080/post/detail/" + this.id);
        // console.log(response);
        
    },

    methods:{
        

    }
}
</script>