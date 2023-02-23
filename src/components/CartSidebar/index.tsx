import { FiX } from 'react-icons/fi'

import { CartSidebarProductsListItem } from '../CartSidebarProductsListItem'
import {
  Overlay,
  Sidebar,
  Header,
  CloseButton,
  CartSidebarProductsList,
  Footer,
  TotalPrice,
  CtaButton
} from './styles'
import { useCart } from '../../context/cartContext'
import React, { Ref } from 'react'

export interface ICartSidebar {
  closeCartSidebar: () => void
  isHidden: boolean
  role: string
  closeSidebarButtonRef: Ref<HTMLButtonElement>
}

export const getCartTotalPrice = (products: ICartProduct[]) => {
  let totalPrice: number = 0

  products.map(
    product => (totalPrice += product.product.price * product.quantity)
  )

  return totalPrice.toFixed(2)
}

export const CartSidebar = ({
  closeCartSidebar,
  isHidden,
  role,
  closeSidebarButtonRef
}: ICartSidebar): JSX.Element => {
  const { products, increaseQuantity, decreaseQuantity, removeProduct } = useCart()

  type Props = { children: JSX.Element; type: 'button'}
  type Ref = HTMLButtonElement
  const CloseSidebarButton = React.forwardRef<Ref, Props>((props, ref) => (
    <CloseButton ref={ref} aria-label="Close cart" onClick={closeCartSidebar}>
      {props.children}
    </CloseButton>
  ));
  CloseSidebarButton.displayName = "CloseSidebarButton"
  
  return (
    <>
    {!isHidden && (
      <Sidebar
        aria-hidden={isHidden}
        role={role}
      >
        <Header>
          <CloseSidebarButton type='button' ref={closeSidebarButtonRef}>
            <FiX size={26} color="#00DD06" />
          </CloseSidebarButton>

          <h3>Cart</h3>
        </Header>

        <CartSidebarProductsList role="list">
          {products?.map(({ product, quantity }) => (
            <CartSidebarProductsListItem
              key={product.id}
              product={product}
              quantity={quantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeProduct={removeProduct}
            />
          ))}
        </CartSidebarProductsList>

        <Footer>
          <TotalPrice>
            <p>Total</p>

            <p>$ {getCartTotalPrice(products)}</p>
          </TotalPrice>

          <CtaButton>place order</CtaButton>
        </Footer>
      </Sidebar>
    )}

      {!isHidden && (
        <Overlay
          aria-hidden={true}
          data-testid="overlay"
        />
      )}
    </>
  )
}
