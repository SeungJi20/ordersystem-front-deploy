function initState(){
    return {
        count:0
    }
}

// 상태 유효 범위와 리셋 시점
// 리셋시점 : 페이지 새로고침, 브라우저 종료시
// 유효시점 : SPA라우팅시

// store에 저장하면 페이지 새로고침하면 날라감
// 그래서 local storage에 저장해서 날라가지 않도록!
// rdb에 해도 되긴 함 -> 그러면 reload해서 백엔드 api 호출이 돼야 함(이러면 영구적)
// 근데 백엔드 없이 어떻게 가능? -> 가능함
export const practice = {
    // 상태 초기화
    state: initState,
    // 상태값을 변경하는 메서드
    mutations: {
        incrementCount(state){
            state.count++;
        }
    },
    // 컴포넌트에서 mutation을 직접 호출하기 보다는, actions를 통해 mutation을 호출
    actions: {
        incrementCount(context){
            // vuex에서 actions에서 mutations를 호출할때는 commit함수를 사용
            // 이와 같은 구조는 여러 mutations의 조합을 actions에서 호출할 수 있기 때문
            context.commit("incrementCount");
        }
    },
    // 상태값을 가져가기 위한 메서드
    getters:{
        getCount: state => state.count,

    }
}