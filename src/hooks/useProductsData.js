import { useQuery } from '@tanstack/react-query';
import axios from "axios";

async function fetchDailyProdcuts() {
    const response = await axios.get("http://localhost:4000/products");
    return response.data;
}

export const useProductsData = () => {
    return useQuery({
        queryKey: ["daily-products"],
        queryFn: fetchDailyProdcuts,
        // staleTime: Infinity,
        // refetchOnMount: true,
        // refetchOnWindowFocus: true
        // refetchInterval: 1000,
        // refetchIntervalInBackground: true
        // enabled: false
    })
}
