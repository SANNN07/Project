


// product section

function display(products) {
  products.forEach((product) => {
    if (product.category == "kids") {
      document.getElementById("gift-row-kids").innerHTML += `<div class="card">
        <img src="./images/${product.photoUri}" class="card-img-top" alt="...">
        <p class="card-title" id="product-detail">${product.detail}</p>
        <p class="card-text" id="product-price">$ ${product.price}</p>
        <a href="#shopping-cart"><button id= "${product._id}" onclick = "addToCart(this.id)" class="btn btn-primary">Add to cart</button></a>
         </div>`;
    }
    if (product.category == "women") {
      document.getElementById("gift-row-women").innerHTML += `<div class="card">
        <img src="./images/${product.photoUri}" class="card-img-top" alt="...">
        <p class="card-title" id="product-detail">${product.detail}</p>
        <p class="card-text" id="product-price">$ ${product.price}</p>
        <a href="#shopping-cart"><button id= "${product._id}" onclick = "addToCart(this.id)" class="btn btn-primary">Add to cart</button></a>
         </div>`;
    }
    if (product.category == "men") {
      document.getElementById("gift-row-men").innerHTML += `<div class="card">
        <img src="./images/${product.photoUri}" class="card-img-top" alt="...">
        <p class="card-title" id="product-detail">${product.detail}</p>
        <p class="card-text" id="product-price">$ ${product.price}</p>
        <a href="#shopping-cart"><button id= "${product._id}" onclick = "addToCart(this.id)" class="btn btn-primary">Add to cart</button></a>
         </div>`;
    }
    // console.log(product._id);
  });
}

// add to cart function
let subtotal = 0;
const calculateTotal = (subtotal) => {
  const total = parseFloat(subtotal);
  const formattedTotal = total;
  console.log(formattedTotal);
  return formattedTotal;
};

function addToCart(clickedId) {
  console.log(`id of the product clicked is ${clickedId}`);
  fetchAll(clickedId);
}

// fetching
function fetchProducts() {
  fetch("http://localhost:4005/products-db", {
    method: "GET",

  })
    .then((response) => response.json())
    .then((data) => {
      const products = data;
      display(products);
      console.log("products from server", products);
    })
    .catch((error) => console.error(error.message));
}

// fetch product details from the clicked button
function fetchAll(idClicked) {
  fetch("http://localhost:4005/products-db", {
    method: "GET"
    // node: "cors",
    // credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((data) => {
      const products = data;
      products.forEach((product) => {
        if (idClicked == product._id) {
          const selectedProductDetail = product.detail;
          const selectedProductPrice = product.price;
          const selectedProductImage = product.photoUri;
          console.log(selectedProductDetail);
          console.log(selectedProductPrice);

          const itemsListUl = document.querySelector("#items-list-ul");
          const newList = document.createElement("li");
          const newListName = document.createElement("p");
          const newListPrice = document.createElement("p");
          const productImage = document.createElement("img");
          const newListDeleteBtn = document.createElement("button");
          productImage.src="./images/"+selectedProductImage;
    

          itemsListUl.appendChild(newList); //nesting list to the ul
          newList.appendChild(productImage); 
          newList.appendChild(newListName); // nesting span to the list
          newList.appendChild(newListPrice); // nesting span to the list
          newList.appendChild(newListDeleteBtn);
        // nesting span to the list

          // add bootstrap class to list and button,span dont need this
          productImage.classList.add("img-product", "list-group-item","item-list");
          newList.classList.add("list-group-item", "item-list");
          newListDeleteBtn.classList.add("btn", "btn-danger");
          newListDeleteBtn.textContent = "delete";

          newListName.textContent = selectedProductDetail;
          const selectedPrice = "$ " + selectedProductPrice;
          newListPrice.textContent = selectedPrice;

          // total calculation
          subtotal = subtotal + selectedProductPrice;
          console.log(subtotal);
          const totalInCart = calculateTotal(subtotal);
          const total = totalInCart.toFixed(2);
          console.log(total);
          document.getElementById("totalAmount").innerHTML = `$ ${total}`;

          //   delete task
          const deleteTask = () => {
            newListDeleteBtn.addEventListener("click", deleteTask);
            //   newList.remove();
            const deletedPrice = newListPrice.textContent;
            var deletedPriceFromCart = parseFloat(deletedPrice.substring(1));
            console.log("deleted item", deletedPriceFromCart);
            console.log(total);
            // subtotal = total - selectedProductPrice;
            subtotal = subtotal - deletedPriceFromCart;
            if (subtotal != 0) {
              subtotal = subtotal.toFixed(2);
            }
            console.log("subtotal after deleting", subtotal);
            newList.remove();
            document.getElementById("totalAmount").innerHTML = `$ ${subtotal}`;
            // newList.remove();
          };
          newListDeleteBtn.addEventListener("click", deleteTask);
        }
      });
    })
    .catch((error) => console.error(error.message));
}
fetchProducts();

// check out
function checkAmountToPay() {
  if (subtotal == 0) {
    alert("Your Cart is empty.");
  } else {
    window.location.href = "#paymentConfirmation";
    subtotalPayment = subtotal.toFixed(2);
    const tax = subtotal * 0.05;
    const taxFormatted = tax.toFixed(2);
    const finalAmount = (
      parseFloat(subtotal) + parseFloat(taxFormatted)
    ).toFixed(2);

    document.getElementById("subtotal").innerHTML = `$ ${subtotalPayment}`;
    document.getElementById("tax").innerHTML = `$ ${taxFormatted}`;
    document.getElementById("total").innerHTML = `$ ${finalAmount}`;

  }
}
const payNowBtn = document.querySelector("#payNow");
payNowBtn.addEventListener("click", checkAmountToPay);

