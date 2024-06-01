export const getCollections = async () => {
    const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`, { cache: 'no-store' });
    return await collections.json()
}

export const getCollectionDetails = async (collectionId: string) => {
    console.log('collectionId:', collectionId);

    const collection = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`, { cache: 'no-store' });
    return await collection.json()
}

export const getProducts = async () => {
    const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, { cache: 'no-store' });
    return await products.json()
}

export const getProductDetails = async (productId: string) => {
    // Log the productId before making the fetch request
    console.log('Product ID:', productId);

    const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, { cache: 'no-store' });
    console.log('This is product:', product)
    return await product.json();
}

export const getProductOrders = async (productId: string) => {
    try {
        console.log('Product ID:', productId);
        const productOrders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/products/${productId}`, { cache: 'no-store' });
        console.log('This is product orderes here:', productOrders)
        
        // Check if the response is empty or not OK
        if (!productOrders.ok) {
            throw new Error("Failed to fetch product orders");
        }
        
        // Parse response as JSON
        return await productOrders.json();
    } catch (error) {
        console.error("Error fetching product orders:", error);
        // Handle the error gracefully, e.g., return an empty array
        return [];
    }
};

export const getSearchedProducts = async (query: string) => {
    const searchedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`, { cache: 'no-store' });
    return await searchedProducts.json();
}

export const getOrders = async (customerId: string) => {
    const orders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`, { cache: 'no-store' });
    return await orders.json()
}



export const getRelatedProducts = async (productId: string) => {
    const relatedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`, { cache: 'no-store' });
    return await relatedProducts.json();
}