import {
  render,
  screen,
  fireEvent,
  within
} from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'

import { CartSidebarProductsListItem } from '..'
import { useFetchProducts } from '../../../hooks/useFetchProducts'
import { startMirageServer } from '../../../miragejs/server'

let productsQuantity = 5
const decreaseQuantityMock = jest
  .fn()
  .mockImplementation((productId: string) => {
    productsQuantity - 1
  })
const increaseQuantityMock = jest
  .fn()
  .mockImplementation((productId: string) => {
    productsQuantity + 1
  })
const removeProductMock = jest.fn().mockImplementation((productId: string) => {
  productsQuantity - productsQuantity
})

describe('<CartSidebarProductsListItem />', () => {
  let server: Server
  let cartProducts: ICartProduct[]

  const fetchProducts = async () => {
    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    return productsResult.current.products
  }

  const renderCartSidebarProductList = () => {
    return render(
      <div>
        {cartProducts.map(cartProduct => (
          <CartSidebarProductsListItem
            product={cartProduct.product}
            quantity={cartProduct.quantity}
            key={cartProduct.product.id}
            increaseQuantity={increaseQuantityMock}
            decreaseQuantity={decreaseQuantityMock}
            removeProduct={removeProductMock}
          />
        ))}
      </div>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    renderCartSidebarProductList()
  })

  beforeAll(async () => {
    server = startMirageServer({ environment: 'test' })

    server.createList('product', 1)

    cartProducts = (await fetchProducts()).map(product => ({
      product,
      quantity: productsQuantity
    }))
  })

  afterAll(() => {
    server.shutdown()
  })

  it('should render the product with its info', async () => {
    const { product } = cartProducts[0]

    const cartSidebarListItem = await screen.findByRole('listitem')

    const image = within(cartSidebarListItem).getByRole('img', {
      name: product.image.description
    })
    const quantityItem = within(cartSidebarListItem).getByLabelText(
      'Current product quantity'
    )

    expect(image).toBeInTheDocument()
    expect(quantityItem.textContent).toBe(productsQuantity.toString())
  })
  it('should be able to call function that increases product cart quantity by 1 with correct property', async () => {
    const { product } = cartProducts[0]

    const cartSidebarListItem = await screen.findByRole('listitem')

    const increaseButton = within(cartSidebarListItem).getByRole('button', {
      name: `Increase ${product.title} quantity by 1`
    })
    expect(increaseQuantityMock).not.toHaveBeenCalled()
    fireEvent.click(increaseButton)
    expect(increaseQuantityMock).toHaveBeenCalledTimes(1)
    expect(increaseQuantityMock).toHaveBeenCalledWith(product.id)
  })
  it('should be able to call function that decreases product cart quantity by 1 with correct property', async () => {
    const { product } = cartProducts[0]
    const cartSidebarListItem = await screen.findByRole('listitem')
    const decreaseButton = within(cartSidebarListItem).getByRole('button', {
      name: `Decrease ${product.title} quantity by 1`
    })
    expect(decreaseQuantityMock).not.toHaveBeenCalled()
    fireEvent.click(decreaseButton)
    expect(decreaseQuantityMock).toHaveBeenCalledTimes(1)
    expect(decreaseQuantityMock).toHaveBeenCalledWith(product.id)
  })
  it("should not call decrease function if product's quantity is 1", async () => {
    const { product } = cartProducts[0]
    const cartSidebarListItem = await screen.findByRole('listitem')

    const decreaseButton = within(cartSidebarListItem).getByRole('button', {
      name: `Decrease ${product.title} quantity by 1`
    })

    for (
      let numberOfCalls = 0;
      numberOfCalls <= productsQuantity + 1;
      numberOfCalls++
    ) {
      fireEvent.click(decreaseButton)
    }

    expect(decreaseQuantityMock).toHaveBeenCalledTimes(4)
  })
  it("should disable minus button if product's quantity is 1", async () => {
    const { product } = cartProducts[0]
    const cartSidebarListItem = await screen.findByRole('listitem')

    const decreaseButton = within(cartSidebarListItem).getByRole('button', {
      name: `Decrease ${product.title} quantity by 1`
    })

    expect(decreaseButton).not.toHaveAttribute('disabled')

    for (
      let numberOfCalls = 0;
      numberOfCalls <= productsQuantity + 1;
      numberOfCalls++
    ) {
      fireEvent.click(decreaseButton)
    }

    expect(decreaseButton).toHaveAttribute('disabled')
  })
  it('should be able to call function that removes product from cart', async () => {
    const { product } = cartProducts[0]
    const cartSidebarListItem = await screen.findByRole('listitem')
    const removeButton = within(cartSidebarListItem).getByRole('button', {
      name: `Remove ${product.title} from cart`
    })
    expect(removeProductMock).not.toHaveBeenCalled()
    fireEvent.click(removeButton)
    expect(removeProductMock).toHaveBeenCalledTimes(1)
    expect(removeProductMock).toHaveBeenCalledWith(product.id)
  })
})
