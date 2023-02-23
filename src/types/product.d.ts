interface IProduct {
  id: string
  title: string
  price: number
  image: {
    url: string,
    description: string,
  }
}

interface ICartProduct {
  product: IProduct
  quantity: number
}
