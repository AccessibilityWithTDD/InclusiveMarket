import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

export const useFetchProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/products')
      .then(response => setProducts(response.data.products))
      .catch((error: AxiosError) => setError(error.response?.data.error))
  }, [])

  return {
    products,
    error
  }
}
