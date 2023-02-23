/* eslint-disable react/display-name */
import { render, screen, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'
import { ProductCard } from '..'

import { useFetchProducts } from '../../../hooks/useFetchProducts'
import { startMirageServer } from '../../../miragejs/server'

const addProductMock = jest.fn().mockImplementation((product: IProduct) => {})

describe("<ProductCard />", () => {
    let server: Server
    let availableProduct: IProduct;
    const fetchProducts = async () => {
        const { result: productsResult, waitForNextUpdate } =
            renderHook(useFetchProducts)
        await waitForNextUpdate()
        return productsResult.current.products
    }
    

    beforeAll(async () => {
        server = startMirageServer({ environment: 'test' })
        server.createList('product', 5)
        availableProduct = (await fetchProducts())[0]
    })
    
    beforeEach(() => {
        jest.clearAllMocks()
        render(<ProductCard product={availableProduct} handleAddToCart={addProductMock} />);
    })

    afterAll(() => {
        server.shutdown()
    })

    it('should render the product card component with product info', async () => {
        expect(screen.getByText(availableProduct.title)).toBeInTheDocument();
        const img = screen.getByAltText(availableProduct.image.description);
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute("src", availableProduct.image.url)
        expect(screen.getByText(availableProduct.price, { exact: false })).toBeInTheDocument();
    })

    it("should call add product to cart function when clicking + button", async () => {
        const addToCartButton = await screen.findByRole('button', { name: `Add ${availableProduct.title.toLowerCase()} to cart`})
        fireEvent.click(addToCartButton)
        expect(addProductMock).toHaveBeenCalledTimes(1)
    })

    it("should add two products when clicking + button twice", async () => {
        const addToCartButton = await screen.findByRole('button', { name: `Add ${availableProduct.title.toLowerCase()} to cart`})
        fireEvent.click(addToCartButton)
        fireEvent.click(addToCartButton)
        expect(addProductMock).toHaveBeenCalledTimes(2)
    })
})