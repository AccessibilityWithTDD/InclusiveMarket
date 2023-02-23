import styled from 'styled-components'

export const HeaderContainer = styled.header`
  box-shadow: 0px 0px 15px rgb(0 0 0 / 10%), 0px 2px 22px 20px #1f1f49;
  background-color: #1f1f49;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  h1 {
    color: #fff;
    margin-left: 15px;
  }
`

export const ContentContainer = styled.div`
  width: 1030px;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 280px) {
    flex-direction: column;
  }
`

export const SkipToMainContentLink = styled.a`
  opacity: 0;
  background: #00a12a;
  border-radius: 34px;
  color: #fff;
  margin: 20px 25px;
  padding: 5px 10px;
  font-size: 13px;
  &:focus {
    opacity: 1;
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

export const CartButton = styled.button`
  width: 75px;
  height: 40px;
  background: #00a12a;
  border-radius: 34px;
  border: 0;
  padding: 0 14px 0 16px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    font-family: 'Jura';
    font-size: 18px;
    color: #fff;
  }
  @media screen and (max-width: 280px) {
    width: 100%;
    justify-content: center;
  }
`
