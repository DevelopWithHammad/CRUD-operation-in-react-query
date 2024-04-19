import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from '@tanstack/react-query';

const DailyProduct = () => {
  const params = useParams();
  const productId = params.productId;

  async function fetchDailyProduct() {
    const response = await axios.get(`http://localhost:4000/products/${productId}`);
    return response.data;
  }

  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: product,
  } = useQuery({
    queryKey: ["daily-product", productId],
    queryFn: fetchDailyProduct,
    initialData: () => {
      console.log("Initial data query key:", 'daily-products');
      const productsData = queryClient.getQueryData(['daily-products'])
      const product = productsData?.find(product => product?.id === productId)

      if (product) {
        console.log("found product ==>", product);
        return { data: product }
      }
      else {
        return undefined;
      }
    }

  })
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>{error?.message}</div>
  }


  return (
    <div>
      <p className="text-center">{`${product.name} - ${product.price}`}</p>
    </div>
  )
}

export default DailyProduct
