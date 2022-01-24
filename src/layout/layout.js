import React from 'react'
import Head from '../component/header'
import Content from '../component/content'
import Footer from '../component/footer'

import { Layout } from 'antd';


const layout = () => {


    return (
        <div>

<Layout>
    <Head/>
    <div className="head-center">
    <h3>              Type Value in the input form and the output will show result </h3>
    </div>
    <Layout>
     
      <Layout style={{ padding: '0 24px 24px' }}>

      <Content/>
       <Footer/>
      </Layout>
    </Layout>
  </Layout>
        </div>
    )
}

export default layout
