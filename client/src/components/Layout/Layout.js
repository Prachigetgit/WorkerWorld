import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Helmet} from "react-helmet" ;

import  {Toaster} from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
function Layout({ children, title, description,keywords,author }) {
  return (
    <div>
       <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content={description} />
                <meta name='Keywords' content={keywords} />
                <meta name='author' content={author} />
                <title>{title}</title>
               
            </Helmet>
       <Header/>
       <main style = {{minHeight:'70vh'}}>
        <Toaster />
        {children}
        </main>
        <Footer ></Footer>
    </div>
  );
};

Layout.defaultProps = {
  title: 'Workers World -Book now ',
  description: 'We provide you helpers at your doorsteps.',
  keywords: 'Electrician, mechanic, sweeper, Househelper, carpentar ',
  author: "Prachi jain"
}

export default Layout;