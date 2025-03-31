document.addEventListener("DOMContentLoaded", () => {
    const addToCartButton = document.getElementById("add-to-cart");

    addToCartButton.addEventListener("click", () => {
        const productId = addToCartButton.getAttribute("data-id");
        const quantity = parseInt(document.getElementById("quantity").value);
        const cartId = "1";

        fetch(`/api/cart/${cartId}/products/${productId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Product added to cart.");
            } else {
                alert("Error adding product.");
            }
        });
    });
});
