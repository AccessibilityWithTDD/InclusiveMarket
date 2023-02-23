import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #fff;
  padding: 20px;
  margin-top: 10px;
  border-radius: 18px;

  @media screen and (max-width: 280px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const DivFora = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 375px) {
    flex-direction: column;
  }

  @media screen and (max-width: 280px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
  }
`

export const ImageContainer = styled.div`
  width: 70px;
  height: 50px;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const ProductImage = styled.img`
  width: 100%;
`

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  margin-left: 18px;

  @media screen and (max-width: 280px) {
    margin-left: 12px;
  }
`

export const Title = styled.p`
  font-family: 'IBM Plex Sans';
  font-size: 22px;
  color: #0a4565;
  margin: 0;
`

export const Price = styled.p`
  font-family: 'Nunito';
  font-weight: 800;
  font-size: 14px;
  color: #008924;
  margin: 0;
`

export const Unit = styled.span`
  font-weight: 700;
  color: #fff;
`

export const Quantity = styled.span`
  color: #008924;
  font-family: 'Nunito';
  font-weight: 700;
`

export const MinusButton = styled.button`
  background-color: #008924;

  &[disabled],
  &:disabled {
    filter: saturate(0);
  }
`

export const PlusButton = styled.button`
  background-color: #008924;
`

export const RemoveButton = styled.button`
  background-color: transparent;
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 120px;

  & button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
`
