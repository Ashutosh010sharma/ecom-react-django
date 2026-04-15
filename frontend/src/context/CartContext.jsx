import {createContext,useContext,useState ,useEffect} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [cartItems , setCartItems] = useState([]);
    const [total,setTotal] = useState(0);

    // fetch data from backend

    const fetchCart = async () =>{
        try {
            const res = await fetch(`${BASEURL}/api/cart`)
            if(!res.ok){
                throw new Error("Failed to fetch cart");
            }
            const data = await res.json();
            setCartItems(data.items || []);
            setTotal(data.total || 0);
        } catch(error){
            console.error("Error fetching cart:",error)
        }
    }

    useEffect(()=>{
        fetchCart();
    },[]);
     useEffect(() => {
        console.log("Updated cart items:", cartItems);
    }, [cartItems]);


    // Add Product to Cart

    const addToCart = async (productID) => {
        try{
            await fetch(`${BASEURL}/api/cart/add`,{
                method : "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({ product_id : productID})
            });
            fetchCart();
        } catch (error){
            console.error("Error adding to cart",error)
        }
    }
    // const addToCart = (product) => {
    //     const existing = cartItems.find((item) => item.id === product.id);
    //     if(existing){
    //         setCartItems(
    //             cartItems.map((item) => 
    //             item.id == product.id
    //             ? { ...item,quantity: item.quantity+1}
    //             :item
    //             )
    //         )
    //     }else{
    //         setCartItems([...cartItems,{ ...product,quantity:1}])
    //     }
    // };

    // Remove product form the cart
    const removeFromCart = async (itemId) => {
        try{
            await fetch(`${BASEURL}/api/cart/remove`,{
                method:"POST",
                headers :{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({ item_id:itemId}),
            });
            fetchCart();
        }catch(error){
            console.error("Error removing from cart:",error);
        }
    }

    // const removeFromCart = (id) =>{
    //     setCartItems(cartItems.filter((item) => item.id !==id))
    // }

    //Update Quantity
    const updateQuantity = async (itemId,quantity) => {
        if(quantity<1){
            await removeFromCart(itemId);
            return;
        }
        try{
            await fetch(`${BASEURL}/api/cart/update`,{
                method:"POST",
                headers :{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({ item_id:itemId,quantity}),
            })
            fetchCart();
        }catch(error){
            console.error("Error update quantity:",error);
        }
    }
    // const updateQuantity = (id,quantity) => {
    //     if(quantity<1) return;
    //     setCartItems(
    //         cartItems.map((item)=>
    //             item.id === id ? {...item,quantity} :item
    //         )
    //     )
    // }

    const clearCart = () => {
        setCartItems([]);
        setTotal(0);
    }

    return (
        <CartContext.Provider
        value={{ cartItems , total, addToCart,removeFromCart,updateQuantity,clearCart}}>
            {children}
        </CartContext.Provider>
    )
}
export const useCart =() =>useContext(CartContext);