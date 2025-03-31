document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            
            fetch(`/api/carts/1/products/${productId}`, { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity: 1 })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("Product added to cart.");
                } else {
                    alert("Error adding product.");
                }
            })
            .catch(error => console.error("Error:", error));
        });
    });
});
