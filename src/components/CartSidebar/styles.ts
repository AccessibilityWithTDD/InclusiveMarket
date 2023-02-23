import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(31 31 73 / 51%);
`

export const Sidebar = styled.aside`
  position: fixed;
  z-index: 3;
  top: 0;
  right: 0;
  width: 440px;
  height: 100vh;
  background: #4a497a;
  box-shadow: -24px 0px 40px #1f1f49;
  padding: 30px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 767px) {
    overflow: scroll;
    width: 100%;
  }
`

export const CloseButton = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Header = styled.header`
  display: flex;
  align-items: center;

  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e5e5e5;

  & h3 {
    margin: 0 0 0 10px;
    color: #fff;
    font-family: 'Nunito';
    font-weight: 700;
    font-size: 26px;
  }
`

export const CartSidebarProductsList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  list-style: none;
  padding: 0;
`

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TotalPrice = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  width: 100%;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e5e5;

  & p {
    font-family: 'Nunito';
    margin: 0;
  }

  & p:nth-child(1) {
    font-weight: 700;
    font-size: 22px;
    color: #fff;
  }

  & p:nth-child(2) {
    font-weight: 800;
    font-size: 32px;
    color: #00dd06;
  }
`

export const CtaButton = styled.button`
  font-family: 'Nunito';
  font-weight: 700;
  font-size: 22px;
  background: #00dd06;
  color: #000;
  width: 300px;
  height: 50px;
  border-radius: 34px;
  margin-top: 32px;

  @media screen and (max-width: 280px) {
    width: 225px;
  }
`
