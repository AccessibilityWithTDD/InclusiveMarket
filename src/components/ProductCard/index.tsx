import { FiPlus } from 'react-icons/fi'

import {
  Container,
  ImageContainer,
  ProductImage,
  ProductDetails,
  Title,
  Price,
  Unit,
  AddButton
} from './styles'

interface IProductProps {
  product: IProduct
  handleAddToCart: (product: IProduct) => void
}

export const ProductCard = ({
  product,
  handleAddToCart
}: IProductProps): JSX.Element => {
  return (
    <Container role="listitem">
      <ImageContainer>
        <ProductImage src={product.image.url} alt={product.image.description} />
      </ImageContainer>

      <ProductDetails>
        <Title>{product.title}</Title>
        <Price>
          ${product.price} <Unit>/kg</Unit>
        </Price>
      </ProductDetails>

      <AddButton
        aria-label={`Add ${product.title.toLowerCase()} to cart`}
        onClick={() => handleAddToCart(product)}
      >
        <FiPlus size={22} color="#fff" />
      </AddButton>
    </Container>
  )
}
