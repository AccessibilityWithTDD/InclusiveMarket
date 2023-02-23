import { renderHook } from '@testing-library/react-hooks'
import { waitFor } from '@testing-library/react'
import { Server, Response } from 'miragejs'

import { startMirageServer } from '../../miragejs/server'
import { useFetchProducts } from '../useFetchProducts'

describe('Hooks', () => {
  let server: Server

  beforeEach(() => {
    server = startMirageServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should return a list of 3 products', async () => {
    server.createList('product', 3)

    const { result } = renderHook(useFetchProducts)

    await waitFor(() => expect(result.current.products.length).toBe(3))
  })

  it('should receive an error message when request fails', async () => {
    const errorMessage = "Couldn't fetch products"

    server.get('/products', () => {
      return new Response(500, {}, { error: errorMessage })
    })

    const { result } = renderHook(useFetchProducts)

    await waitFor(() => expect(result.current.error).toBe(errorMessage))
  })
})
