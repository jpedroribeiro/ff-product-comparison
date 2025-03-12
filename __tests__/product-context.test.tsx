"use client"

import { render, screen, waitFor } from "@testing-library/react"
import { ProductProvider, useProducts } from "@/lib/product-context"

const mockProducts = [
  { id: 1, title: "Fjallraven", price: 109.95, rating: { rate: 3.9, count: 120 } },
  { id: 2, title: "Mens Casual Premium Slim Fit T-Shirts", price: 22.3, rating: { rate: 4.1, count: 259 } },
]

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockProducts),
  }),
) as jest.Mock

// Test component that consumes our context
function TestComponent() {
  const { products, isLoading, error } = useProducts()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <div>
      {products.map((p) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  )
}

// Testt for loading, mocked content and error state
describe("ProductContext", () => {
  it("fetches products", async () => {
    render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>,
    )

    expect(screen.getByText("Loading...")).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText("Fjallraven")).toBeInTheDocument()
      expect(screen.getByText("Mens Casual Premium Slim Fit T-Shirts")).toBeInTheDocument()
    })
  })

  it("error state for fetch", async () => {
    global.fetch = jest.fn(() => Promise.reject("API error")) as jest.Mock

    render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>,
    )

    await waitFor(() => {
      // Error message is copy/paste from context, ideally we would centralise this in a constants file
      expect(screen.getByText("Error: Failed to load products. Please try again later.")).toBeInTheDocument()
    })
  })
})

