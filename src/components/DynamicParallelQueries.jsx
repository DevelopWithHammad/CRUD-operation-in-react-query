import { useQueries } from '@tanstack/react-query';
import axios from "axios";

async function fetchProduct(productId) {
    return await axios.get(`http://localhost:4000/products/${productId}`)
}

const DynamicParallelQueries = ({ productIds }) => {
    console.log("productIds ===>", productIds);
    const queriesResult = useQueries(
        productIds?.map(id => {
            return {
                queryKey: ["product", id],
                queryFn: () => fetchProduct(id)
            }
        }) || [] // Use an empty array as a fallback if productIds is undefined
    );
    console.log({ queriesResult });
    return (
        <div>
            Dynamic Parallel Queries Page
        </div>
    )
}

export default DynamicParallelQueries
