import axios from "axios";
import { useQuery } from '@tanstack/react-query';

const ParallelQueries = () => {

    async function fetchProducts() {
        const response = await axios.get("http://localhost:4000/products");
        return response.data;
    }
    async function fetchStudents() {
        const response = await axios.get("http://localhost:4000/students");
        return response.data;
    }

    useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts
    })

    useQuery({
        queryKey: ["students"],
        queryFn: fetchStudents
    })

    return (
        <div>
            ParallelQueries page!
        </div>
    )
}

export default ParallelQueries
