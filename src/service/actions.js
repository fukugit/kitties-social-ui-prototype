'use server'

import apiClient from "@/lib/api"

export async function createProduct({ name, description, price, currency }) {
  try {
    const response = await apiClient.post('/stripe/createproduct', {
      name,
      description,
      price,
      currency
    })

    if (response.ok) {
      const data = await response.json()
      return { success: true, productId: data.productId, priceId: data.priceId }
    } else {
      const errorData = await response.json()
      return { error: errorData.message || 'Failed to create product' }
    }
  } catch (error) {
    console.error('Error creating product:', error)
    return { error: 'An unexpected error occurred' }
  }
}

