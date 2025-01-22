import { useEffect } from "react";
// import { useParams } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { itemName, itemPicture, itemBaseBid } = product;
  // const { productId } = useParams();

  return (
    <section className=" bg-gray-200 py-2 w-96 rounded-xl flex justify-around  items-center gap-3 hover:bg-gray-300">
      <img
        src={itemPicture}
        alt="Product"
        className="rounded-xl w-24 h-20 bg-co"
      />

      <div>
        <h3 className="font-semibold">{itemName}</h3>
        <p>Current Bid: ${itemBaseBid}</p>
        <p>Bid status: Open</p>
      </div>
    </section>
  );
};

export default ProductCard;
