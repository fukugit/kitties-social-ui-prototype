import ProductForm from '@/components/ProductForm'

export default function CreateProductPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stripe商品登録</h1>
      <ProductForm />
    </div>
  )
}

