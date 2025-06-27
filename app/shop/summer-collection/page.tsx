"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Filter, Star, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function ShopSummerCollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [cartItems, setCartItems] = useState<string[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const { toast } = useToast()

  const addToCart = (itemId: string, itemName: string) => {
    setCartItems((prev) => [...prev, itemId])
    toast({
      title: "Added to Cart",
      description: `${itemName} has been added to your cart.`,
    })
  }

  const toggleWishlist = (itemId: string, itemName: string) => {
    setWishlist((prev) => {
      const isInWishlist = prev.includes(itemId)
      if (isInWishlist) {
        toast({
          title: "Removed from Wishlist",
          description: `${itemName} has been removed from your wishlist.`,
        })
        return prev.filter((id) => id !== itemId)
      } else {
        toast({
          title: "Added to Wishlist",
          description: `${itemName} has been added to your wishlist.`,
        })
        return [...prev, itemId]
      }
    })
  }

  const filteredProducts = summerProducts.filter(
    (product) => selectedCategory === "all" || product.category.toLowerCase() === selectedCategory,
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return Number.parseFloat(a.price.replace("$", "")) - Number.parseFloat(b.price.replace("$", ""))
      case "price-high":
        return Number.parseFloat(b.price.replace("$", "")) - Number.parseFloat(a.price.replace("$", ""))
      case "name":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
          alt="Summer Collection Shop"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sun className="h-8 w-8 text-yellow-400" />
              <h1 className="text-4xl md:text-6xl font-serif tracking-wide">Summer Collection</h1>
              <Sun className="h-8 w-8 text-yellow-400" />
            </div>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Light, breezy, and effortlessly chic pieces for the warmest days
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
          {/* Filters and Sorting */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="dresses">Dresses</SelectItem>
                    <SelectItem value="tops">Tops</SelectItem>
                    <SelectItem value="bottoms">Bottoms</SelectItem>
                    <SelectItem value="swimwear">Swimwear</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{sortedProducts.length} products</span>
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {sortedProducts.map((product, index) => (
              <Card
                key={product.id}
                className="overflow-hidden border border-ilary-border shadow-sm group hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.imageSrc || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {product.originalPrice && <Badge className="absolute top-4 left-4 bg-red-500 text-white">Sale</Badge>}

                  <Button
                    size="icon"
                    variant="ghost"
                    className={`absolute top-4 right-4 rounded-full bg-white/80 hover:bg-white transition-colors ${
                      wishlist.includes(product.id) ? "text-red-500" : "text-foreground"
                    }`}
                    onClick={() => toggleWishlist(product.id, product.title)}
                  >
                    <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                  </Button>

                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      className="w-full bg-ilary-button text-foreground hover:bg-ilary-buttonHover"
                      onClick={() => addToCart(product.id, product.title)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {product.category}
                  </Badge>
                  <h3 className="font-medium mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">({product.reviews})</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg">{product.price}</p>
                      {product.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">{product.originalPrice}</p>
                      )}
                    </div>
                    <Link href={`/shop/product/${product.slug}`}>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

const summerProducts = [
  {
    id: "s1",
    title: "Linen Midi Dress",
    description: "Breathable linen dress perfect for warm summer days",
    imageSrc: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1288&auto=format&fit=crop",
    category: "Dresses",
    price: "$95",
    rating: 5,
    reviews: 87,
    slug: "linen-midi-dress",
  },
  {
    id: "s2",
    title: "Cotton Tank Top",
    description: "Soft organic cotton tank in versatile neutral tones",
    imageSrc: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=1364&auto=format&fit=crop",
    category: "Tops",
    price: "$45",
    rating: 4,
    reviews: 156,
    slug: "cotton-tank-top",
  },
  {
    id: "s3",
    title: "Linen Shorts",
    description: "High-waisted linen shorts for effortless summer style",
    imageSrc: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1287&auto=format&fit=crop",
    category: "Bottoms",
    price: "$65",
    originalPrice: "$85",
    rating: 4,
    reviews: 92,
    slug: "linen-shorts",
  },
  {
    id: "s4",
    title: "Straw Sun Hat",
    description: "Wide-brim straw hat for stylish sun protection",
    imageSrc: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1470&auto=format&fit=crop",
    category: "Accessories",
    price: "$55",
    rating: 5,
    reviews: 73,
    slug: "straw-sun-hat",
  },
  {
    id: "s5",
    title: "Silk Camisole",
    description: "Luxurious silk camisole for elegant summer evenings",
    imageSrc: "https://images.unsplash.com/photo-1564257577-4a5e0e5b1b3e?q=80&w=1287&auto=format&fit=crop",
    category: "Tops",
    price: "$125",
    rating: 5,
    reviews: 64,
    slug: "silk-camisole",
  },
  {
    id: "s6",
    title: "Maxi Sundress",
    description: "Flowing maxi dress in vibrant summer prints",
    imageSrc: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1315&auto=format&fit=crop",
    category: "Dresses",
    price: "$110",
    rating: 4,
    reviews: 118,
    slug: "maxi-sundress",
  },
]
