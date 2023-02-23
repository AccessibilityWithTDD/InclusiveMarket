import { ReactElement } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'
import { act } from '@testing-library/react'

import { CartProvider, useCart } from '../cartContext'
import { startMirageServer } from '../../miragejs/server'
import { useFetchProducts } from '../../hooks/useFetchProducts'

describe('Cart Context', () => {
  let server: Server
  const wrapper = ({ children }: { children: ReactElement }) => (
    <CartProvider>{children}</CartProvider>
  )
  const fetchProducts = async () => {
    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    return productsResult.current.products
  }

  beforeAll(() => {
    server = startMirageServer({ environment: 'test' })

    server.createList('product', 5)
  })

  afterAll(() => {
    server.shutdown()
  })

  it('should be able to add two different products', async () => {
    const availableProducts = await fetchProducts()

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    const firstProduct = availableProducts[0]
    const secondProduct = availableProducts[1]

    act(() => result.current.addProduct(firstProduct))
    act(() => result.current.addProduct(secondProduct))

    expect(result.current.products.length).toBe(2)
    expect(result.current.products[0]).toEqual({
      product: firstProduct,
      quantity: 1
    })
    expect(result.current.products[1]).toEqual({
      product: secondProduct,
      quantity: 1
    })
  })

  it('should be able to add a product more than once', async () => {
    const availableProducts = await fetchProducts()

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    const product = availableProducts[0]

    act(() => result.current.addProduct(product))
    act(() => result.current.addProduct(product))
    act(() => result.current.addProduct(product))

    expect(result.current.products.length).toBe(1)
    expect(result.current.products[0]).toEqual({
      product: product,
      quantity: 3
    })
  })

  it("should be able to increase a product's quantity when trying to add it twice", async () => {
    const availableProducts = await fetchProducts()

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    const product = availableProducts[0]

    act(() => result.current.addProduct(product))
    act(() => result.current.addProduct(product))

    expect(result.current.products.length).toBe(1)
    expect(result.current.products[0]).toEqual({
      product,
      quantity: 2
    })
  })

  it('should be able to remove a product', async () => {
    const availableProducts = await fetchProducts()

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    const firstProduct = availableProducts[0]
    const secondProduct = availableProducts[1]

    act(() => result.current.addProduct(firstProduct))
    act(() => result.current.addProduct(secondProduct))

    act(() => result.current.removeProduct(firstProduct.id))

    expect(result.current.products.length).toBe(1)
    expect(result.current.products[0]).toEqual({
      product: secondProduct,
      quantity: 1
    })
  })

  it("should update number of products in the cart when changing product's quantity", async () => {
    const availableProducts = await fetchProducts()

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    const firstProduct = availableProducts[0]
    const secondProduct = availableProducts[1]
    const thirdProduct = availableProducts[2]

    // First Product
    act(() => result.current.addProduct(firstProduct))

    // Second Product
    act(() => result.current.addProduct(secondProduct))
    act(() => result.current.increaseQuantity(secondProduct.id))
    act(() => result.current.decreaseQuantity(secondProduct.id))
    act(() => result.current.addProduct(secondProduct))
    act(() => result.current.removeProduct(secondProduct.id))

    // Third Product
    act(() => result.current.addProduct(thirdProduct))
    act(() => result.current.increaseQuantity(thirdProduct.id))
    act(() => result.current.increaseQuantity(thirdProduct.id))
    act(() => result.current.decreaseQuantity(thirdProduct.id))

    expect(result.current.products.length).toBe(2)
    expect(result.current.numberOfProductsInTheCart).toBe(3)
  })

  it('should never hit 0 when decreasing quantity of a product in number of products in the cart', async () => {
    const availableProducts = await fetchProducts()

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    const firstProduct = availableProducts[0]
    const secondProduct = availableProducts[1]

    act(() => result.current.addProduct(firstProduct))
    act(() => result.current.increaseQuantity(firstProduct.id))
    act(() => result.current.increaseQuantity(firstProduct.id))

    act(() => result.current.addProduct(secondProduct))
    act(() => result.current.decreaseQuantity(secondProduct.id))
    act(() => result.current.decreaseQuantity(secondProduct.id))

    expect(result.current.numberOfProductsInTheCart).toBe(4)
  })

  it("should be able to increase a product's quantity by 1", async () => {
    const availableProducts = await fetchProducts()

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    const firstProduct = availableProducts[0]
    const secondProduct = availableProducts[1]

    act(() => result.current.addProduct(firstProduct))
    act(() => result.current.addProduct(secondProduct))

    act(() => result.current.increaseQuantity(firstProduct.id))
    act(() => result.current.increaseQuantity(firstProduct.id))
    act(() => result.current.increaseQuantity(firstProduct.id))
    act(() => result.current.increaseQuantity(firstProduct.id))

    act(() => result.current.increaseQuantity(secondProduct.id))
    act(() => result.current.increaseQuantity(secondProduct.id))

    expect(result.current.products.length).toBe(2)
    expect(result.current.products[0]).toEqual({
      product: firstProduct,
      quantity: 5
    })
    expect(result.current.products[1]).toEqual({
      product: secondProduct,
      quantity: 3
    })
  })

  it("should be able to decrease a product's quantity by 1", async () => {
    const availableProducts = await fetchProducts()

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    const firstProduct = availableProducts[0]
    const secondProduct = availableProducts[1]

    act(() => result.current.addProduct(firstProduct))
    act(() => result.current.addProduct(secondProduct))

    // Increasing products quantity
    act(() => result.current.increaseQuantity(firstProduct.id))
    act(() => result.current.increaseQuantity(firstProduct.id))

    act(() => result.current.increaseQuantity(secondProduct.id))
    act(() => result.current.increaseQuantity(secondProduct.id))

    // Decreasing products quantity
    act(() => result.current.decreaseQuantity(firstProduct.id))

    act(() => result.current.decreaseQuantity(secondProduct.id))
    act(() => result.current.decreaseQuantity(secondProduct.id))

    expect(result.current.products.length).toBe(2)
    expect(result.current.products[0]).toEqual({
      product: firstProduct,
      quantity: 2
    })
    expect(result.current.products[1]).toEqual({
      product: secondProduct,
      quantity: 1
    })
  })

  it("should be able to decrease a product's quantity by 1 but never hit 0", async () => {
    const availableProducts = await fetchProducts()

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    const firstProduct = availableProducts[0]
    const secondProduct = availableProducts[1]

    act(() => result.current.addProduct(firstProduct))
    act(() => result.current.addProduct(secondProduct))

    // Increasing products quantity
    act(() => result.current.increaseQuantity(firstProduct.id))
    act(() => result.current.increaseQuantity(firstProduct.id))

    // Decreasing products quantity
    act(() => result.current.decreaseQuantity(firstProduct.id))
    act(() => result.current.decreaseQuantity(firstProduct.id))
    act(() => result.current.decreaseQuantity(firstProduct.id))

    act(() => result.current.decreaseQuantity(secondProduct.id))
    act(() => result.current.decreaseQuantity(secondProduct.id))

    expect(result.current.products.length).toBe(2)
    expect(result.current.products[0]).toEqual({
      product: firstProduct,
      quantity: 1
    })
    expect(result.current.products[1]).toEqual({
      product: secondProduct,
      quantity: 1
    })
  })

  it('should be able to get number of products in the cart', async () => {
    const availableProducts = await fetchProducts()

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    const firstProduct = availableProducts[0]
    const secondProduct = availableProducts[1]
    const thirdProduct = availableProducts[2]

    act(() => result.current.addProduct(firstProduct))

    act(() => result.current.addProduct(secondProduct))
    act(() => result.current.increaseQuantity(secondProduct.id))

    act(() => result.current.addProduct(thirdProduct))
    act(() => result.current.removeProduct(thirdProduct.id))

    act(() => result.current.addProduct(thirdProduct))
    act(() => result.current.increaseQuantity(thirdProduct.id))
    act(() => result.current.increaseQuantity(thirdProduct.id))
    act(() => result.current.decreaseQuantity(thirdProduct.id))
    act(() => result.current.increaseQuantity(thirdProduct.id))

    expect(result.current.products.length).toBe(3)
    expect(result.current.numberOfProductsInTheCart).toBe(6)
  })
})
