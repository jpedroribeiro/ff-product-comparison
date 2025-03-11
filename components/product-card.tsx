"use client"

import Image from "next/image"
import { useProducts, type Product } from "../lib/product-context"

export default function ProductCard({ product }: { product: Product }) {
    const { selectedProducts, toggleProductSelection, MAX_SELECTED } = useProducts()
    const isSelected = selectedProducts.some((prod) => prod.id === product.id)

    return (
        <div
            className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:cursor-pointer transition hover:scale-103
                ${isSelected ? "ring-3 ring-[var(--ff-green)] bg-blue-50" : ""
                }`}

            onClick={(e) => {
                const target = e.currentTarget;
                if (selectedProducts.length >= MAX_SELECTED && !isSelected) {
                    target.style.filter = "opacity(0.5)"
                    setTimeout(() => {
                        target.style.filter = ""
                    }, 750)
                } else {
                    toggleProductSelection(product)
                }
            }}
        >
            <div className="relative h-48 bg-white">
                <span className="absolute top-2 right-2 bg-gray-100/80 z-10 px-2 rounded-full text-xs text-[var(--ff-green)]">{product.category}</span>
                <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "contain" }}
                    className="py-5 px-4"
                />
            </div>

            <div className="p-4 bg-gradient-to-t from-white to-transparent">
                <h3 className=" text-sm font-bold h-10 overflow-hidden text-gray-600">{product.title}</h3>

                <div className="mt-3 flex justify-between items-center">
                    <span className="text-sm">${product.price.toFixed(2)}</span>
                    <div className="flex items-center">
                        <span className="text-sm mr-1">⭐️</span>
                        <span className="text-xs">{product.rating.rate}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

