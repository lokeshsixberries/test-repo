import { Button, CardMedia, Container, Drawer } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Sidebar({
    isOpen,
    setIsopen,
    cartItems
}) {
    console.log("cartItems", cartItems);
    return (
        <div>
            {(['right']).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor='right'
                        open={isOpen}
                        onClose={() => setIsopen(false)}
                    >
                        <Container>Order</Container>
                        <div>
                            {
                                (cartItems || []).map((item) => {
                                    return (
                                        <>
                                            <Card sx={{ minWidth: 400 }} style={{
                                                margin: "10px",
                                                border: "1px solid lavender",
                                                boxShadow: "0px 0px 1px lavender",
                                                padding: "0px"
                                            }}>
                                                <CardContent>
                                                    <img
                                                        style={{
                                                            height: "40px",
                                                            width: "40px",
                                                            borderRadius: "3px"
                                                        }}
                                                        src={item?.image}
                                                        alt="Paella dish"
                                                    />
                                                    <Typography>
                                                        {item?.count}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    )
}
