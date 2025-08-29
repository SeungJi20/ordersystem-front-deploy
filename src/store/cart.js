function initState(){
    return {
        totalQuantity: localStorage.getItem("totalQuantity") || 0, // 있으면 가져오고 없으면 0
        productsInCart: JSON.parse(localStorage.getItem("productsInCart")) || [], // 배열형식의 문자열을 배열로
// Cart API가 있으면 가져오면 되니까 로컬스토리지 안써도 됨
    }
}

export const cart = {
    state: initState,
    mutations: {
        addCart(state, product){
            // 장바구니 수량
            state.totalQuantity = parseInt(state.totalQuantity) + product.productCount; 
            // 로컬 스토리지는 무조건 문자열이기 때문에 parseInt해야 함
            localStorage.setItem("totalQuantity", state.totalQuantity)
            
            // 장바구니 안에 상품목록
            // 기존에 productId가 있는지 확인. find는 for문 돌려서 찾는것
            const existProduct = state.productsInCart.find(p => p.productId === product.productId )
            if(existProduct){
                existProduct.productCount += product.productCount;
            }else{
                state.productsInCart.push(product); // 이건 상태관리 안할거면 빼도 됨
            }
            localStorage.setItem("productsInCart", JSON.stringify(state.productsInCart)) // 직렬화는 직접 해야 함
        },
        clearCart(state){
            state.productsInCart = [];
            state.totalQuantity = 0;
            localStorage.removeItem("productsInCart");
            localStorage.removeItem("totalQuantity");
        }
    },
    actions: {
        addCart(context, product){
            context.commit("addCart", product)
        },
        clearCart(context){
            context.commit("clearCart")
        }
    },
    getters:{
        getTotalQuantity: state => state.totalQuantity,
        getProductsInCart: state => state.productsInCart
    }
}