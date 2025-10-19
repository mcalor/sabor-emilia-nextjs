
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
}

export class CartManager {
  private static STORAGE_KEY = 'sabor_emilia_cart'

  static getCart(): CartItem[] {
    if (typeof window === 'undefined') return []
    
    try {
      const cart = localStorage.getItem(this.STORAGE_KEY)
      return cart ? JSON.parse(cart) : []
    } catch (error) {
      console.error('Error loading cart:', error)
      return []
    }
  }

  static saveCart(cart: CartItem[]): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart))
      // Dispatch custom event for cart updates
      window.dispatchEvent(new CustomEvent('cartUpdated'))
    } catch (error) {
      console.error('Error saving cart:', error)
    }
  }

  static addItem(product: Omit<CartItem, 'quantity'>, quantity = 1): void {
    const cart = this.getCart()
    const existingItem = cart.find(item => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({ ...product, quantity })
    }

    this.saveCart(cart)
  }

  static removeItem(productId: string): void {
    const cart = this.getCart()
    const filteredCart = cart.filter(item => item.id !== productId)
    this.saveCart(filteredCart)
  }

  static updateQuantity(productId: string, quantity: number): void {
    const cart = this.getCart()
    const item = cart.find(item => item.id === productId)

    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId)
      } else {
        item.quantity = quantity
        this.saveCart(cart)
      }
    }
  }

  static clearCart(): void {
    this.saveCart([])
  }

  static getItemCount(): number {
    const cart = this.getCart()
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  static getTotal(): number {
    const cart = this.getCart()
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
}
