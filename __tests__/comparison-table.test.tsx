import { render, screen } from "@testing-library/react"
import ComparisonTable from "@/components/comparison-table"
import { ProductProvider } from "@/lib/product-context"

// Mock useProducts hook
jest.mock("@/lib/product-context", () => ({
  ...jest.requireActual("@/lib/product-context"),
  useProducts: () => ({
    selectedProducts: [
      {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and...",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
          "rate": 3.9,
          "count": 120
        }
      },
      {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style...",
        "category": "some other category",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
          "rate": 4.1,
          "count": 259
        }
      }
    ],
  }),
}))


describe("ComparisonTable", () => {
  it("renders comparison table with selected products", () => {
    render(
      <ProductProvider>
        <ComparisonTable />
      </ProductProvider>,
    )

    expect(screen.getByText("Product Comparison")).toBeInTheDocument()
    expect(screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")).toBeInTheDocument()
    expect(screen.getByText("Mens Casual Premium Slim Fit T-Shirts")).toBeInTheDocument()
    expect(screen.getByText("$109.95")).toBeInTheDocument()
    expect(screen.getByText("$22.30")).toBeInTheDocument()
    expect(screen.getByText("Your perfect pack for everyday use and...")).toBeInTheDocument()
    expect(screen.getByText("Slim-fitting style...")).toBeInTheDocument()
    expect(screen.getByText("men's clothing")).toBeInTheDocument()
    expect(screen.getByText("some other category")).toBeInTheDocument()
  })

  it("displays message when no products are selected", () => {
    jest.spyOn(require("@/lib/product-context"), "useProducts").mockImplementation(() => ({
      selectedProducts: [],
    }))

    render(
      <ProductProvider>
        <ComparisonTable />
      </ProductProvider>,
    )

    expect(screen.getByText("Select products to compare them side by side ✨")).toBeInTheDocument()
  })
})

