import { useEffect, useState } from 'react'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'

import {
  Container,
  ImageContainer,
  ProductImage,
  ProductDetails,
  Title,
  Price,
  Unit,
  Actions,
  Quantity,
  MinusButton,
  PlusButton,
  RemoveButton,
  DivFora
} from './styles'

interface ICartSidebarProductsListItem extends ICartProduct {
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  removeProduct: (productId: string) => void
}

export const CartSidebarProductsListItem = ({
  product,
  quantity,
  increaseQuantity,
  decreaseQuantity,
  removeProduct
}: ICartSidebarProductsListItem): JSX.Element => {
  const [productQuantity, setProductQuantity] = useState<number>(quantity)

  useEffect(() => {
    setProductQuantity(quantity)
  }, [quantity])

  return (
    <>
      <Container role="listitem">
        <DivFora>
          <ImageContainer>
            <ProductImage
              src={product.image.url}
              alt={product.image.description}
            />
          </ImageContainer>

          <ProductDetails>
            <Title>{product.title}</Title>
            <Price>
              ${product.price} <Unit>/kg</Unit>
            </Price>
          </ProductDetails>
        </DivFora>

        <Actions>
          <MinusButton
            disabled={productQuantity === 1}
            aria-label={`Decrease ${product.title} quantity by 1`}
            onClick={() => {
              if (productQuantity > 1) {
                decreaseQuantity(product.id)
                setProductQuantity(previousState => previousState - 1)
              }
            }}
          >
            <FiMinus size={22} color="#fff" />
          </MinusButton>

          <Quantity aria-label="Current product quantity">
            {productQuantity}
          </Quantity>

          <PlusButton
            aria-label={`Increase ${product.title} quantity by 1`}
            onClick={() => increaseQuantity(product.id)}
          >
            <FiPlus size={22} color="#fff" />
          </PlusButton>

          <RemoveButton
            aria-label={`Remove ${product.title} from cart`}
            onClick={() => removeProduct(product.id)}
          >
            <FiTrash2 size={22} color="#008924" />
          </RemoveButton>
        </Actions>
      </Container>
    </>
  )
}
