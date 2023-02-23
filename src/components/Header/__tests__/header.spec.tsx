/* eslint-disable react/display-name */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'

import { Header } from '..'
import { CartContext } from '../../../context/cartContext'
import { useFetchProducts } from '../../../hooks/useFetchProducts'
import { startMirageServer } from '../../../miragejs/server'

const openCartSidebarMock = jest.fn().mockImplementation(() => {})

describe('<Header />', () => {
  let server: Server
  let cartProducts: ICartProduct[]

  const fetchProducts = async () => {
    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    return productsResult.current.products
  }

  let numberOfProductsInTheCart = 0
  const renderHeader = () => {
    return render(
      <CartContext.Provider
        value={{
          products: cartProducts,
          addProduct: () => {},
          removeProduct: () => {},
          increaseQuantity: () => {},
          decreaseQuantity: () => {},
          numberOfProductsInTheCart
        }}
      >
        <Header openCartSidebar={openCartSidebarMock} openSidebarButtonRef={jest.fn()} showCartSidebar={false}/>
      </CartContext.Provider>
    )
  }

  it('should render application logo with an alternative text', async () => {
    renderHeader()

    const applicationLogo = await screen.findByAltText('Inclusive market logo')

    expect(applicationLogo).toBeInTheDocument()
  })

  it('should show 0 products added on cart button when nothing was added to cart', () => {
    cartProducts = []

    numberOfProductsInTheCart = 0
    renderHeader()

    const cartTotalPriceElement = screen.getByLabelText(
      'Number of products added to cart'
    )

    expect(cartTotalPriceElement).toBeInTheDocument()
    expect(cartTotalPriceElement.textContent).toBe('0')
  })

  it('should show the correct number of products added on cart button when something was added to cart', async () => {
    const numberOfProducts = 9
    const productsQuantity = 2

    server = startMirageServer({ environment: 'test' })

    server.createList('product', numberOfProducts)

    cartProducts = (await fetchProducts()).map(product => ({
      product,
      quantity: productsQuantity
    }))

    numberOfProductsInTheCart = 18
    renderHeader()

    const cartTotalPriceElement = screen.getByLabelText(
      'Number of products added to cart'
    )

    expect(cartTotalPriceElement).toBeInTheDocument()
    expect(cartTotalPriceElement.textContent).toBe(
      (numberOfProducts * productsQuantity).toString()
    )

    server.shutdown()
  })

  it('should call open cart sidebar when clicking on open sidebar button', async () => {
    renderHeader()

    const openCartSidebarButton = await screen.findByRole('button', {
      name: 'Open cart'
    })

    fireEvent.click(openCartSidebarButton)

    expect(openCartSidebarMock).toHaveBeenCalledTimes(1)
  })

  it('should have a h1 element to respect DOMs typography hierarchy and care for accessibility', async () => {
    renderHeader()
    expect(screen.getByRole('heading', { name: 'Inclusive Market' }))
  })

  it('should have a "skip to main content" link that takes the user to the product\'s list for accessibility', async () => {
    renderHeader()

    const skipToMainContentElement = screen.getByRole('link', {
      name: 'Skip to main content'
    })
    expect(skipToMainContentElement).toHaveAttribute('href', '#main-content')
  })

  it('should not display "skip to main content" when it is mobile', async () => {
    renderHeader()

    const skipToMainContentElement = screen.getByRole('link', {
      name: 'Skip to main content'
    })
    global.innerWidth = 768
    expect(skipToMainContentElement).toBeInTheDocument()
    global.innerWidth = 767
    expect(skipToMainContentElement).not.toBeVisible()
  })

  it('should display "skip to main content" only when cart sidebar is not open', async () => {
    renderHeader()

    const openCartSidebarButton = await screen.findByRole('button', {
      name: 'Open cart'
    })
    const skipToMainContentElement = screen.getByRole('link', {
      name: 'Skip to main content'
    })
    expect(skipToMainContentElement).toBeInTheDocument()
    fireEvent.click(openCartSidebarButton)
    waitFor(() => {
      expect(skipToMainContentElement).not.toBeInTheDocument()
    })
  })
})
