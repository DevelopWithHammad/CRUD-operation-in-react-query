import Navbar from "./Navbar";
// import axios from "axios";
// import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { useProductsData } from "../hooks/useProductsData";
import { Link } from "react-router-dom";

// async function fetchDailyProdcuts() {
//     const response = await axios.get("http://localhost:4000/products");
//     return response.data;
// }

const DailyProducts = () => {
    // const [count, setCount] = useState(1)
    const {
        isLoading,
        isError,
        error,
        data: products,
        // isFetching,
        refetch,
    } = useProductsData()
    // = useQuery({
    //     queryKey: ["daily-product"],
    //     queryFn: fetchDailyProdcuts,
    //     // staleTime: Infinity,
    //     // refetchOnMount: true,
    //     // refetchOnWindowFocus: true
    //     // refetchInterval: 1000,
    //     // refetchIntervalInBackground: true
    //     // enabled: false
    //     select: (data) => {
    //         const dailyProduct = data?.map(products => products.dailyProduct);
    //         return dailyProduct;
    //     }
    // })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{error?.message}</div>
    }
    return (
        <div>
            <Navbar />
            <button onClick={refetch}>Show the data</button>
            <div >
                {products.map((product) => (
                    <Link key={product?.id} to={`/daily-products/${product.id}`}>
                        <div>{product.name}</div>
                    </Link>
                ))}
                {/* {products?.map((dailyProduct) => {
                    return <div key={dailyProduct}>{dailyProduct}</div>
                })} */}
            </div>

            {/* <button onClick={() => {
                setCount(count + 1)
            }}>add</button>
            <p>{count}</p> */}
        </div>
    )
}

export default DailyProducts
