import Image from 'next/image'
import { FiShoppingCart } from 'react-icons/fi'

import { useCart } from '../../context/cartContext'
import {
  CartButton,
  HeaderContainer,
  LogoContainer,
  ContentContainer,
  SkipToMainContentLink
} from './styles'
import { Ref } from 'react'

interface IHeader {
  openCartSidebar: () => void
  showCartSidebar: boolean
  openSidebarButtonRef: Ref<HTMLButtonElement>
}

export const Header = ({
  openCartSidebar,
  showCartSidebar,
  openSidebarButtonRef
}: IHeader): JSX.Element => {
  const { numberOfProductsInTheCart } = useCart()

  return (
    <HeaderContainer>
      <ContentContainer>
        <LogoContainer>
          <Image
            src="/images/dehsmarket.svg"
            alt="Inclusive market logo"
            width={75}
            height={75}
          />
          <h1>Inclusive Market</h1>
          {!showCartSidebar && (
            <SkipToMainContentLink href="#main-content">
              Skip to main content
            </SkipToMainContentLink>
          )}
        </LogoContainer>

        <CartButton aria-label="Open cart" ref={openSidebarButtonRef} onClick={openCartSidebar}>
          <span aria-label="Number of products added to cart">
            {numberOfProductsInTheCart}
          </span>

          <FiShoppingCart size={22} color="#fff" role="img" />
        </CartButton>
      </ContentContainer>
    </HeaderContainer>
  )
}
