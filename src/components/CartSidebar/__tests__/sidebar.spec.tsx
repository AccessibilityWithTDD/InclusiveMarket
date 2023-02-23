/* eslint-disable react/display-name */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'

import { CartSidebar, getCartTotalPrice, ICartSidebar } from '..'
import { CartContext } from '../../../context/cartContext'
import { useFetchProducts } from '../../../hooks/useFetchProducts'
import { startMirageServer } from '../../../miragejs/server'

const closeCartSidebarMock = jest.fn().mockImplementation(() => {})

const cartSidebarProps: ICartSidebar = {
  isHidden: false,
  closeCartSidebar: closeCartSidebarMock,
  role: 'dialog',
  closeSidebarButtonRef: jest.fn()
}

describe('<CartSidebar />', () => {
  let server: Server
  let cartProducts: ICartProduct[]

  const fetchProducts = async () => {
    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    return productsResult.current.products
  }

  const renderCartSidebar = ({ isHidden, closeCartSidebar, role, closeSidebarButtonRef }: ICartSidebar) => {
    return render(
      <CartContext.Provider
        value={{
          products: cartProducts,
          addProduct: () => {},
          removeProduct: () => {},
          increaseQuantity: () => {},
          decreaseQuantity: () => {},
          numberOfProductsInTheCart: 11
        }}
      >
        <CartSidebar isHidden={isHidden} closeCartSidebar={closeCartSidebar} role={role} closeSidebarButtonRef={closeSidebarButtonRef}/>
      </CartContext.Provider>
    )
  }

  beforeAll(async () => {
    server = startMirageServer({ environment: 'test' })

    server.createList('product', 5)

    cartProducts = (await fetchProducts()).map(product => ({
      product,
      quantity: 1
    }))
  })

  afterAll(() => {
    server.shutdown()
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render a list of 5 products', async () => {
    renderCartSidebar(cartSidebarProps)

    const cartSidebarProductsList = await screen.findByRole('list')

    const cartSidebarProductsListItem =
      cartSidebarProductsList.querySelectorAll('[role="listitem"]')

    expect(cartSidebarProductsListItem.length).toBe(5)
  })

  it('should update total price based on the added products', async () => {
    renderCartSidebar(cartSidebarProps)

    const cartTotalPrice = getCartTotalPrice(cartProducts)

    const cartTotalPriceElement = await screen.findByText(`$ ${cartTotalPrice}`)

    expect(cartTotalPriceElement).toBeInTheDocument()
  })

  it('should close the sidebar when clicking the "x" (close) button', () => {
    renderCartSidebar(cartSidebarProps)

    const cartSidebar = screen.getByRole('dialog', { hidden: false })

    expect(cartSidebar).toBeVisible()
    expect(cartSidebar).toHaveAttribute('aria-hidden', 'false')

    const closeButtonElement = screen.getByLabelText('Close cart')

    fireEvent.click(closeButtonElement)

    waitFor(() => {
      expect(cartSidebar).toHaveAttribute('aria-hidden', 'true')
      expect(closeCartSidebarMock).toHaveBeenCalledTimes(1)
      expect(cartSidebar).not.toBeVisible()
    })
  })

  it('should display overlay visually but hide it always for acessibility', () => {
    renderCartSidebar(cartSidebarProps)

    const cartSidebar = screen.getByRole('dialog', { hidden: false })
    const overlayElement = screen.getByTestId('overlay')

    expect(overlayElement).toBeVisible()
    expect(overlayElement).toHaveAttribute('aria-hidden', 'true')
    expect(cartSidebar).toBeVisible()
    expect(cartSidebar).toHaveAttribute('aria-hidden', 'false')

    const closeButtonElement = screen.getByLabelText('Close cart')

    fireEvent.click(closeButtonElement)
    waitFor(() => {
      expect(closeCartSidebarMock).toHaveBeenCalledTimes(1)
      expect(overlayElement).not.toBeInTheDocument()
    })
  })
})
