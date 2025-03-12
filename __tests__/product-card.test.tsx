import { render, screen, fireEvent } from "@testing-library/react"
import ProductCard from "@/components/product-card"
import { ProductProvider } from "@/lib/product-context"

const mockProduct = {
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    render(
      <ProductProvider>
        <ProductCard product={mockProduct} />
      </ProductProvider>,
    )

    expect(screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")).toBeInTheDocument()
    expect(screen.getByText("$109.95")).toBeInTheDocument()
    expect(screen.getByText("3.9")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
  })

  it("toggles selected on and off when clicking on the product", async () => {
    render(
      <ProductProvider>
        <ProductCard product={mockProduct} />
      </ProductProvider>,
    )

    const compareButton = screen.getByTestId("product-card")
    const ariaValue = compareButton.getAttribute("aria-checked")
    expect(ariaValue).toBe("false")

    fireEvent.click(compareButton)
    await new Promise((resolve) => setTimeout(resolve, 100))

    const ariaValue2 = compareButton.getAttribute("aria-checked")
    expect(ariaValue2).toBe("true")

  })
})

