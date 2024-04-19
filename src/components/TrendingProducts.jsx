import Navbar from "./Navbar";
import axios from "axios";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useProductsData } from "../hooks/useProductsData";


const TrendingProducts = () => {
    const queryClient = useQueryClient();
    const productsData = queryClient.getQueryData(["daily-products"]);
    console.log("products Data =======>", productsData);


    // if (isLoading) {
    //     return <div>Loading...</div>
    // }

    // if (isError) {
    //     return <div>{error.message}</div>
    // }

    return (
        <div>
            <Navbar />
        </div>
    )
}

export default TrendingProducts
