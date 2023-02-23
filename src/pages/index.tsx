import { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { Header } from '../components/Header'
import { ProductList } from '../components/ProductList'
import { useFetchProducts } from '../hooks/useFetchProducts'
import { CartSidebar } from '../components/CartSidebar'
import React from 'react'

const Home: NextPage = () => {
  const { products } = useFetchProducts()

  const [showCartSidebar, setShowCartSidebar] = useState(false)
  const closeSidebarButtonRef = React.createRef<HTMLButtonElement>()
  const openSidebarButtonRef = React.createRef<HTMLButtonElement>()

  useEffect(() => {
    if (showCartSidebar && closeSidebarButtonRef.current){
      closeSidebarButtonRef.current.focus()
    }
  }, [showCartSidebar, closeSidebarButtonRef, openSidebarButtonRef])

  return (
    <div>
      <Head>
        <title>Aplicação Fullstack de Acessibilidade Digital com TDD</title>
      </Head>

      <Header showCartSidebar={showCartSidebar} openSidebarButtonRef={openSidebarButtonRef} openCartSidebar={() => {
        setShowCartSidebar(true)
        }} />

      <CartSidebar
        closeCartSidebar={() => {
          openSidebarButtonRef.current.focus()
          setShowCartSidebar(false)
        }
        }
        isHidden={!showCartSidebar}
        role="dialog"
        closeSidebarButtonRef={closeSidebarButtonRef}
      />

      <ProductList products={products} />
    </div>
  )
}

export default Home
