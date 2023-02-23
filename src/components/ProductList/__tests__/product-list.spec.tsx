import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'

import { ProductList } from '..'
import { useFetchProducts } from '../../../hooks/useFetchProducts'
import { startMirageServer } from '../../../miragejs/server'

describe('<ProductList />', () => {
  let server: Server
  let products: IProduct[]

  const fetchProducts = async () => {
    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    return productsResult.current.products
  }

  beforeAll(async () => {
    server = startMirageServer({ environment: 'test' })

    server.createList('product', 5)

    products = await fetchProducts()
  })

  afterAll(() => {
    server.shutdown()
  })

  it('should render a list of 5 products', async () => {
    render(<ProductList products={products} />)

    const productsList = await screen.findByRole('list')

    const productsListItem = productsList.querySelectorAll('[role="listitem"]')

    expect(productsListItem.length).toBe(5)
  })

  it('should have "main-content" ID to enable "skip to main content" link for accessibility', async () => {
    render(<ProductList products={products} />)

    const mainElement = await screen.findByRole('main')

    expect(mainElement).toHaveAttribute('id', 'main-content')
  })
})
