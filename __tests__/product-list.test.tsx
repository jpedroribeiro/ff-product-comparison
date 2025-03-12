import { render, screen } from "@testing-library/react"
import ProductList from "@/components/product-list"
import { ProductProvider } from "@/lib/product-context"

// Mocking useProducts hook since the focus is on the component on thte hook itself
jest.mock("@/lib/product-context", () => ({
  ...jest.requireActual("@/lib/product-context"),
  useProducts: () => ({
    products: [
      { id: 1, title: "Fjallraven", price: 109.95, rating: { rate: 3.9, count: 120 } },
      { id: 2, title: "Mens Casual Premium Slim Fit T-Shirts", price: 22.3, rating: { rate: 4.1, count: 259 } },
    ],
    isLoading: false,
    error: null,
    sortOption: "default",
    setSortOption: jest.fn(),
  }),
}))

/*
  Test for list to be rendered with dropdown and mocked error state
*/
describe("ProductList", () => {
  it("renders product list correctly", () => {
    render(
      <ProductProvider>
        <ProductList />
      </ProductProvider>,
    )

    expect(screen.getByText("Available Products")).toBeInTheDocument()
    expect(screen.getByText("Fjallraven")).toBeInTheDocument()
    expect(screen.getByText("Mens Casual Premium Slim Fit T-Shirts")).toBeInTheDocument()
  })

  it("renders sort dropdown", () => {
    render(
      <ProductProvider>
        <ProductList />
      </ProductProvider>,
    )

    expect(screen.getByLabelText("Sort by:")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveValue("default")
  })

  it("displays error state", () => {
    jest.spyOn(require("@/lib/product-context"), "useProducts").mockImplementation(() => ({
      products: [],
      isLoading: false,
      error: "Failed to load products",
      sortOption: "default",
      setSortOption: jest.fn(),
    }))

    render(
      <ProductProvider>
        <ProductList />
      </ProductProvider>,
    )

    expect(screen.getByText("❌ Failed to load products")).toBeInTheDocument()
  })
})

