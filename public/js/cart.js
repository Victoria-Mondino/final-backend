document.addEventListener("DOMContentLoaded", () => {
    const cartId = "1";
    const cartItems = document.querySelectorAll(".cart-item");

    // Update cart
    cartItems.forEach(item => {
        const updateButton = item.querySelector(".update-quantity");
        updateButton.addEventListener("click", () => {
            const productId = updateButton.getAttribute("data-id");
            const quantity = item.querySelector(".quantity-input").value;

            fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity: parseInt(quantity) })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("Updated quantity.");
                    location.reload();
                } else {
                    alert("Error updating quantity.");
                }
            });
        });
    });

    // Remove product
    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");

            fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("Product removed.");
                    location.reload();
                } else {
                    alert("Error deleting product.");
                }
            });
        });
    });

    // Vaciar carrito
    document.getElementById("empty-cart").addEventListener("click", () => {
        fetch(`/api/carts/${cartId}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Carrito vaciado.");
                location.reload();
            } else {
                alert("Error al vaciar carrito.");
            }
        });
    });
});
