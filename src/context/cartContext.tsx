import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

interface ICartContextData {
  products: Array<ICartProduct>
  addProduct: (product: IProduct) => void
  removeProduct: (productId: string) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  numberOfProductsInTheCart: number
}

const CartContext = createContext<ICartContextData>({} as ICartContextData)

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<ICartProduct[]>([])
  const [numberOfProductsInTheCart, setNumberOfProductsInTheCart] =
    useState<number>(0)

  const addProduct = useCallback((product: IProduct) => {
    setNumberOfProductsInTheCart(
      previousNumberOfProducts => previousNumberOfProducts + 1
    )
    setProducts(previousState => {
      const productIndex = previousState.findIndex(
        previousProduct => previousProduct.product.id === product.id
      )
      const productAlreadyExists = productIndex !== -1

      if (productAlreadyExists) {
        previousState[productIndex].quantity += 1

        return previousState
      }

      return [...previousState, { product, quantity: 1 }]
    })
  }, [])

  const removeProduct = useCallback((productId: string) => {
    setProducts(previousState => {
      let productRemovedQuantity = 0

      const filteredState = previousState.filter(previousProduct => {
        if (previousProduct.product.id !== productId) return previousProduct
        productRemovedQuantity = previousProduct.quantity
      })

      setNumberOfProductsInTheCart(
        previousNumberOfProducts =>
          previousNumberOfProducts - productRemovedQuantity
      )

      return filteredState
    })
  }, [])

  const increaseQuantity = useCallback((productId: string) => {
    setNumberOfProductsInTheCart(
      previousNumberOfProducts => previousNumberOfProducts + 1
    )
    setProducts(previousState =>
      previousState.map(previousProduct => {
        if (previousProduct.product.id === productId)
          return {
            product: previousProduct.product,
            quantity: previousProduct.quantity + 1
          }
        return previousProduct
      })
    )
  }, [])

  const decreaseQuantity = useCallback((productId: string) => {
    setProducts(previousState =>
      previousState.map(previousProduct => {
        if (
          previousProduct.product.id === productId &&
          previousProduct.quantity > 1
        ) {
          setNumberOfProductsInTheCart(
            previousNumberOfProducts => previousNumberOfProducts - 1
          )

          return {
            product: previousProduct.product,
            quantity: previousProduct.quantity - 1
          }
        }
        return previousProduct
      })
    )
  }, [])

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
        numberOfProductsInTheCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartContext, CartProvider, useCart }
