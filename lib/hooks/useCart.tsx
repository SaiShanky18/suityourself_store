import { create } from "zustand"
import toast, { Toast } from "react-hot-toast"
import { persist } from "zustand/middleware"
import { createJSONStorage } from "zustand/middleware"

interface CartItem {
    item: ProductType;
    quantity: number;
    colour?: string;
    size?: string;
    startDate?: Date;
    endDate?:Date;
    totalPrice?: number;
}

interface CartStore {
    cartItems: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (idToRemove: string) => void;
    increaseQuantity: (idToIncrease: string) => void;
    decreaseQuantity: (idToDecrease: string) => void;
    clearCart: () => void;
}

const useCart = create(persist<CartStore>(
    (set, get) => ({
        cartItems: [],
        addItem: (data: CartItem) => {
            const { item, quantity, colour, size, startDate, endDate, totalPrice} = data
            const currentItems = get().cartItems //all items already in cart
            const isExisting = currentItems.find((cartItem) => cartItem.item._id === item._id)

            if (isExisting) {
                return toast("Item already in cart")
            }

            set({ cartItems: [...currentItems, { item, quantity, colour, size, startDate, endDate, totalPrice }] })
            toast.success("Item added to cart", { icon: "🛒" })
        },
        removeItem: (_idToRemove: String) => {
            const newCartItems = get().cartItems.filter((cartItem) => cartItem.item._id !== _idToRemove)
            set({ cartItems: newCartItems })

            toast.success("Item removed from cart")
        },
        increaseQuantity: (_idToIncrease: String) => {
            const newCartItems = get().cartItems.map((cartItem) =>
                cartItem.item._id === _idToIncrease
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );

            set({ cartItems: newCartItems });
            toast.success("Quantity increased")
        },
        decreaseQuantity: (_idToDecrease: String) => {
            const newCartItems = get().cartItems.map((cartItem) =>
                cartItem.item._id === _idToDecrease
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            );

            set({ cartItems: newCartItems });
            toast.success("Quantity decreased")
        },
        clearCart: () => set({cartItems:[]})
    }),

    {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    }
))

export default useCart