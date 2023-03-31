import { CircularProgress, Grid } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ProductCard from '../Components/Common/ProductCard'
import Sidebar from '../Components/Sidebar'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import styles from '../styles/Home.module.css'

export default function Home() {
  const [data, setData] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageView, setPageView] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const handleApiOutput = async () => {
    setLoading(true);
    const result = await fetch('https://react-shopping-cart-67954.firebaseio.com/products.json').then((res) => res.json());
    const mappedData = (result?.products || []).map((item, index) => {
      item = {
        ...item,
        image: `https://source.unsplash.com/random/${Math.round(Math.random() * 100 + index * 100)}x${Math.round(Math.random() * 100 + index * 100)}/?cloths`,
        rating: (Math.round(((Math.random() * index) % 10) / 2)),
        save: false
      };
      return item;
    });
    setData(mappedData);
    setLoading(false);
  };

  setTimeout(() => {
    setPageView(false);
  }, [5000]);


  useEffect(() => {
    handleApiOutput();
  }, []);

  const styles = {
    main: {
      // margin: "20px"
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  };

  return (
    <>
      {
        pageView && <>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20%"
          }}>
            <CircularProgress />
          </div>
        </>
      }
      {
        !pageView &&
        <>
          <Sidebar isOpen={isOpen} setIsopen={setIsopen} cartItems={cartItems} />
          <div style={styles.main}>
            <Grid container>
              {
                (data || []).map((item) => {
                  return (
                    <>
                      <Grid xs={6} xl={2} sm={4} spacing={5}>
                        <div style={{
                          margin: "10px"
                        }}>
                          <ProductCard product={item} setData={setData} data={data} setCartItems={setCartItems} cartItems={cartItems} setIsopen={setIsopen} />
                        </div>
                      </Grid>

                    </>
                  )
                })
              }
            </Grid>
          </div>
        </>
      }

    </>
  )
}
