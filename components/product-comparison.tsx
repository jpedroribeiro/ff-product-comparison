"use client"
import { ProductProvider } from "../lib/product-context"
import ProductList from "../components/product-list"
import ComparisonTable from "../components/comparison-table"

export default function ProductComparison() {
    return (
        <ProductProvider>
            <div className="grid grid-cols-1 gap-8">
                <ProductList />
                <ComparisonTable />
            </div>
        </ProductProvider>
    )
}

