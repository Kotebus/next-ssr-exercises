'use client';
import React from 'react';
import {IData} from "./data";

function StoreItem({ item, handleAddToCart } : {
    item: IData,
    handleAddToCart: (item: IData) => void,
}) {
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(item.price);

  return (
    <article>
      <img src={item.imageSrc} alt={item.imageAlt} />
      <h2>{item.title}</h2>
      <p>{price}</p>
      <button onClick={() => handleAddToCart(item)}>
        Add to Cart
      </button>
    </article>
  );
}

export default StoreItem;
