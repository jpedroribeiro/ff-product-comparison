"use client"

import { useProducts } from "../lib/product-context"
import ProductCard from "../components/product-card"

export default function ProductList() {
    const { products, isLoading, error, sortOption, setSortOption } = useProducts()

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    if (error) {
        return <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">❌ {error}</div>
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl">Available Products</h2>
                <div className="flex items-center space-x-2">
                    <label htmlFor="sort" className="text-sm font-medium hidden">
                        Sort by:
                    </label>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border rounded-md p-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)]"
                    >
                        <option value="default">Sort by</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating-high">Rating: High to Low</option>
                        <option value="rating-low">Rating: Low to High</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

