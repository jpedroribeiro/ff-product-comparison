"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

interface ProductContextType {
    products: Product[]
    selectedProducts: Product[]
    selectedSortOptions: string
    setSelectedSortOptions: (option: string) => void
    isLoading: boolean
    error: string | null
    sortOption: string
    toggleProductSelection: (product: Product) => void
    setSortOption: (option: string) => void
    MAX_SELECTED: number
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
    const MAX_SELECTED = 5; // Arbitrary, but more than 5 the UX is not ideal
    const [products, setProducts] = useState<Product[]>([])
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [sortOption, setSortOption] = useState("default")
    const [selectedSortOptions, setSelectedSortOptions] = useState<string>("")

    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsLoading(true)
                const response = await fetch("https://fakestoreapi.com/products")

                if (!response.ok) {
                    throw new Error("Failed to fetch products")
                }

                const data = await response.json()
                setProducts(data)
                setError(null)
            } catch (err) {
                setError("Failed to load products. Please try again later.")
                console.error("Error fetching products:", err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const toggleProductSelection = (product: Product) => {
        setSelectedProducts((prev) => {
            const isSelected = prev.some((p) => p.id === product.id)

            if (isSelected) {
                return prev.filter((p) => p.id !== product.id)
            } else {
                if (selectedProducts.length >= MAX_SELECTED) {
                    return prev
                }
                return [...prev, product]
            }
        })
    }


    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === "price-low") {
            return a.price - b.price
        } else if (sortOption === "price-high") {
            return b.price - a.price
        } else if (sortOption === "rating-high") {
            return b.rating.rate - a.rating.rate
        } else if (sortOption === "rating-low") {
            return a.rating.rate - b.rating.rate
        }
        return 0
    })

    useEffect(() => {
        setSelectedProducts((prev) => {
            return [...prev].sort((a, b) => {
                if (selectedSortOptions === "price-high") {
                    return b.price - a.price
                } else if (selectedSortOptions === "price-low") {
                    return a.price - b.price
                } else if (selectedSortOptions === "rating-high") {
                    return b.rating.rate - a.rating.rate
                } else if (selectedSortOptions === "rating-low") {
                    return a.rating.rate - b.rating.rate
                }
                return 0
            })
        })
    }, [selectedSortOptions])

    return (
        <ProductContext.Provider
            value={{
                products: sortedProducts,
                selectedProducts,
                selectedSortOptions,
                setSelectedSortOptions,
                isLoading,
                error,
                sortOption,
                toggleProductSelection,
                setSortOption,
                MAX_SELECTED
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductContext)
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider")
    }
    return context
}

