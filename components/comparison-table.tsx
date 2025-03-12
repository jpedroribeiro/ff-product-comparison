"use client"

import Image from "next/image"
import { useProducts } from "../lib/product-context"

export default function ComparisonTable() {
    const { selectedProducts, error, isLoading, MAX_SELECTED, selectedSortOptions,
        setSelectedSortOptions, } = useProducts()

    if (error || isLoading) return null;

    if (selectedProducts.length === 0) {
        return (
            <div className="mt-8 p-6 border rounded-lg bg-gray-50 text-center">
                <p className="text-gray-500">Select products to compare them side by side ✨</p>
            </div>
        )
    }

    return (
        <div className="mt-14">
            <div className="flex justify-between items-center">
                <h2 className="text-xl mb-4">Product Comparison</h2>
                <span className="text-sm text-gray-700"><b>{selectedProducts.length}</b> out of <b>{MAX_SELECTED}</b> selected</span>
            </div>


            <div className="overflow-x-auto">
                <table className="border-collapse bg-white table-fixed">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="align-baseline border p-3 text-left font-bold w-[200px] min-w-[200px] max-w-[200px] text-sm text-gray-600">Product</th>
                            {selectedProducts.map((product) => (
                                <th key={product.id} className="align-baseline border p-3 text-center overflow-hidden text-ellipsis w-[250px] min-w-[250px] max-w-[250px]">
                                    {product.title}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="">
                            <td className="border p-3 font-bold align-baseline text-sm text-gray-600">Image</td>
                            {selectedProducts.map((product) => (
                                <td key={product.id} className="border p-3 text-center">
                                    <div className="relative h-32 w-full">
                                        <Image
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.title}
                                            fill={process.env.NODE_ENV === "test" ? undefined : true}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            style={{ objectFit: "contain" }}
                                        />
                                    </div>
                                </td>
                            ))}
                        </tr>

                        <tr className="bg-gray-50 hover:bg-gray-100">
                            <td className="border p-3 font-bold text-sm text-gray-600 hover:cursor-pointer underline" onClick={() => {
                                setSelectedSortOptions(selectedSortOptions === "price-high" ? "price-low" : "price-high")
                            }} title="Sort by price">Price</td>
                            {selectedProducts.map((product) => (
                                <td key={product.id} className={`border p-3 text-center font-bold ${
                                    // adds background if it's the cheapest or most expensive compared to other products
                                    selectedProducts.length > 1 &&
                                    (product.price === Math.min(...selectedProducts.map(p => p.price))
                                        ? 'bg-green-100/70' :
                                        product.price === Math.max(...selectedProducts.map(p => p.price))
                                            ? 'bg-red-100/70' : '')
                                    }`}>
                                    ${product.price.toFixed(2)}
                                </td>
                            ))}
                        </tr>

                        <tr className="hover:bg-gray-100">
                            <td className="border p-3 font-bold text-sm text-gray-600 hover:cursor-pointer underline" onClick={() => {
                                setSelectedSortOptions(selectedSortOptions === "rating-high" ? "rating-low" : "rating-high")
                            }} title="Sort by rating">Rating</td>
                            {selectedProducts.map((product) => (
                                <td key={product.id} className={`border p-3 text-center font-bold ${
                                    // adds background if it's the highest or lowest rating compared to other products
                                    selectedProducts.length > 1 &&
                                    (product.rating.rate === Math.max(...selectedProducts.map(p => p.rating.rate))
                                        ? 'bg-green-100/70' :
                                        product.rating.rate === Math.min(...selectedProducts.map(p => p.rating.rate))
                                            ? 'bg-red-100/70' : '')
                                    }`}>
                                    <div className="flex items-center justify-center">
                                        <span className="mr-1">⭐</span>
                                        <span>{product.rating.rate}</span>
                                        <span className="text-gray-400 text-sm ml-1">({product.rating.count})</span>
                                    </div>
                                </td>
                            ))}
                        </tr>

                        <tr className="bg-gray-50">
                            <td className="border p-3 font-bold text-sm text-gray-600">Category</td>
                            {selectedProducts.map((product) => (
                                <td key={product.id} className="border p-3 text-center">
                                    <span className="inline-block bg-gray-100 px-2 py-1 rounded-full text-xs">{product.category}</span>
                                </td>
                            ))}
                        </tr>

                        <tr>
                            <td className="border p-3 font-bold align-baseline text-sm text-gray-600">Description</td>
                            {selectedProducts.map((product) => (
                                <td key={product.id} className="border p-3 text-sm overflow-hidden text-ellipsis align-baseline">
                                    {product.description}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

