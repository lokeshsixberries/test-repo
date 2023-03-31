import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Alert, Button, Container, Rating, Snackbar } from '@mui/material';

export default function ProductCard({
    product,
    setData,
    data,
    setCartItems,
    cartItems,
    setIsopen
}) {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleSaveButton = (id) => {
        const updatedData = (data || []).map((item) => {
            if (item?.id === id) {
                const vals = {
                    ...item,
                    save: !item?.save
                }
                return vals;
            } else {
                return item;
            }
        });
        setData(updatedData);
    };


    const addToCart = (product) => {
        const prod = {
            ...product,
            count: 0
        };
        console.log("prod", prod);
        setCartItems([...cartItems, prod]);
        setIsopen(true);
    }

    useEffect(() => {
        const mappedArray = (cartItems || []).map((item) => item?.id);
        const result = {};
        for (var i = 0; i < mappedArray.length; ++i) {
            if (!result[mappedArray[i]])
                result[mappedArray[i]] = 0;
            ++result[mappedArray[i]];
        }

        const data = (cartItems || []).map((item) => {
            const vals = {
                ...item,
                count: result[item?.id]
            }
            return vals;
        });

        const ids = data.map(o => o.id)
        const filtered = data.filter(({ id }, index) => !ids.includes(id, index + 1));
        setCartItems(filtered);

    }, [])



    return (
        <>
            <Card sx={{ maxWidth: 345 }} style={{
                border: "1px solid lavender",
                boxShadow: "0px 0px 2px lavender"
            }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {product?.title[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={(product?.title || '').length > 25 ? `${product?.title?.substr(0, 10)}...` : product?.title}
                    subheader={product?.description ? product?.description : 'No Description'}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={product?.image}
                    alt="Paella dish"
                    style={{
                        boxShadow: "1px 1px 1px lightgray",
                    }}
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                    </Typography>
                </CardContent>
                <Container style={{
                    display: "flex",
                    position: "relative",
                    left: "-10px"
                }}>
                    {(product?.availableSizes || []).map((item) => {
                        return (
                            <>
                                <Avatar sx={{ bgcolor: blue[500] }} style={{
                                    marginRight: "5px",
                                    height: "30px",
                                    width: "30px",
                                    fontSize: "12px",
                                    fontWeight: "600"
                                }} aria-label="recipe">
                                    {item}
                                </Avatar>
                            </>
                        )
                    })
                    }

                    <div style={{
                        position: "absolute",
                        right: "0px",
                        top: "2px",
                        fontSize: "18px",
                        fontWeight: "700",
                        color: red[400]
                    }}>
                        {product?.currencyFormat}{product?.price}
                    </div>
                </Container>

                <Container style={{
                    display: "flex",
                    position: "relative",
                    left: "-10px",
                    marginTop: "10px"
                }}>
                    <Rating
                        readOnly
                        name="simple-controlled"
                        value={product?.rating}
                    />
                </Container>

                <CardActions disableSpacing style={{
                    display: "block",
                    position: "relative"
                }}>
                    <IconButton aria-label="add to favorites" onClick={() => { handleSaveButton(product?.id) }}>
                        <FavoriteIcon style={{
                            color: product?.save ? red[400] : 'gray'
                        }} />
                    </IconButton>

                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>


                    <Button variant="contained" onClick={() => { addToCart(product) }} style={{
                        position: "absolute",
                        right: "10px"
                    }}
                        endIcon={<ShoppingCart />}
                    >
                        Add to Cart
                    </Button>
                </CardActions>

            </Card >
        </>
    );
}