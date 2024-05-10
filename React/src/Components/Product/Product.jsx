 
const Product = ({ products }) => {
  return (
    <>
      {products.map(({ Id, name, description,price,quantity }) => (
        <div key={Id} id={Id}>
          {name} <br />
              {description} <br />
              Цена: {price} Количество: {quantity} <hr />
            
        </div>
      ))}
    </>
  );
};

export default Product;
