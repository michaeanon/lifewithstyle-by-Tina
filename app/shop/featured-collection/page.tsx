"use client"

import Image from "next/image"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  ShoppingCart,
  Filter,
  Star,
  Sun,
  Leaf,
  Snowflake,
  Flower,
  Sparkles,
  Palette,
  ChevronDown,
} from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { RotatingProductImage } from "@/components/rotating-product-image"
import Link from "next/link"

export default function ShopFeaturedCollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCollection, setSelectedCollection] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [cartItems, setCartItems] = useState<string[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const { toast } = useToast()
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null)
  const [showStyleGuides, setShowStyleGuides] = useState(false)
  const [showInspiration, setShowInspiration] = useState(false)

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

  // Combine all products from different collections
  const allProducts = [...featuredProducts, ...summerProducts, ...autumnProducts, ...winterProducts, ...springProducts]

  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory
    const collectionMatch = selectedCollection === "all" || product.collection === selectedCollection
    return categoryMatch && collectionMatch
  })

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

  const getCollectionIcon = (collection: string) => {
    switch (collection) {
      case "summer":
        return <Sun className="h-4 w-4 text-yellow-500" />
      case "autumn":
        return <Leaf className="h-4 w-4 text-orange-500" />
      case "winter":
        return <Snowflake className="h-4 w-4 text-blue-500" />
      case "spring":
        return <Flower className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getCollectionTitle = () => {
    switch (selectedCollection) {
      case "featured":
        return "Featured Collection"
      case "summer":
        return "Summer Collection"
      case "autumn":
        return "Autumn Collection"
      case "winter":
        return "Winter Collection"
      case "spring":
        return "Spring Collection"
      default:
        return "All Collections"
    }
  }

  const styleGuides = [
    { href: "/style-guides/scandinavian-simplicity", label: "Scandinavian Simplicity" },
    { href: "/style-guides/japanese-minimalism", label: "Japanese Minimalism" },
    { href: "/style-guides/modern-professional", label: "Modern Professional" },
    { href: "/style-guides/coastal-minimalism", label: "Coastal Minimalism" },
  ]

  const inspirationLinks = [
    { href: "/inspiration/minimalist-aesthetics", label: "Minimalist Aesthetics" },
    { href: "/inspiration/street-style", label: "Street Style" },
    { href: "/inspiration/vintage-revival", label: "Vintage Revival" },
    { href: "/inspiration/bold-expressions", label: "Bold Expressions" },
    { href: "/inspiration/runway-trends", label: "Runway Trends" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
          alt="Shop All Collections"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-serif tracking-wide mb-4">{getCollectionTitle()}</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Discover our complete range of carefully curated pieces for every season and occasion
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
                    <SelectItem value="essentials">Essentials</SelectItem>
                    <SelectItem value="dresses">Dresses</SelectItem>
                    <SelectItem value="tops">Tops</SelectItem>
                    <SelectItem value="bottoms">Bottoms</SelectItem>
                    <SelectItem value="knitwear">Knitwear</SelectItem>
                    <SelectItem value="outerwear">Outerwear</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="swimwear">Swimwear</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Collections" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Collections</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="summer">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-yellow-500" />
                      Summer
                    </div>
                  </SelectItem>
                  <SelectItem value="autumn">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-orange-500" />
                      Autumn
                    </div>
                  </SelectItem>
                  <SelectItem value="winter">
                    <div className="flex items-center gap-2">
                      <Snowflake className="h-4 w-4 text-blue-500" />
                      Winter
                    </div>
                  </SelectItem>
                  <SelectItem value="spring">
                    <div className="flex items-center gap-2">
                      <Flower className="h-4 w-4 text-green-500" />
                      Spring
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Style Guides Dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-[180px] justify-between"
                  onClick={() => {
                    setShowStyleGuides(!showStyleGuides)
                    setShowInspiration(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    Style Guides
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                {showStyleGuides && (
                  <div className="absolute top-full left-0 mt-1 w-[220px] bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {styleGuides.map((guide) => (
                      <Link
                        key={guide.href}
                        href={guide.href}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                        onClick={() => setShowStyleGuides(false)}
                      >
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        {guide.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Inspiration Dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-[180px] justify-between"
                  onClick={() => {
                    setShowInspiration(!showInspiration)
                    setShowStyleGuides(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-violet-500" />
                    Inspiration
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                {showInspiration && (
                  <div className="absolute top-full left-0 mt-1 w-[220px] bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {inspirationLinks.map((inspiration) => (
                      <Link
                        key={inspiration.href}
                        href={inspiration.href}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                        onClick={() => setShowInspiration(false)}
                      >
                        <Palette className="h-4 w-4 text-violet-500" />
                        {inspiration.label}
                      </Link>
                    ))}
                  </div>
                )}
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
                className={`overflow-hidden border border-ilary-border shadow-sm group hover:shadow-lg transition-all duration-300 ${
                  expandedProduct === product.id ? "col-span-full md:col-span-2 lg:col-span-3" : ""
                }`}
              >
                {expandedProduct === product.id ? (
                  // Expanded View
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={product.imageSrc || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                      {product.originalPrice && (
                        <Badge className="absolute top-4 left-4 bg-red-500 text-white">Sale</Badge>
                      )}
                      {product.collection !== "featured" && (
                        <Badge className="absolute top-4 right-4 bg-white/90 text-foreground flex items-center gap-1">
                          {getCollectionIcon(product.collection)}
                          {product.collection.charAt(0).toUpperCase() + product.collection.slice(1)}
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setExpandedProduct(null)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            ✕ Close
                          </Button>
                        </div>

                        <h2 className="text-2xl font-serif mb-3">{product.title}</h2>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{product.description}</p>

                        <div className="flex items-center mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground ml-2">({product.reviews} reviews)</span>
                        </div>

                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <p className="text-3xl font-semibold">{product.price}</p>
                            {product.originalPrice && (
                              <p className="text-xl text-muted-foreground line-through">{product.originalPrice}</p>
                            )}
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium mb-2 block">Size</label>
                              <div className="flex gap-2">
                                {["XS", "S", "M", "L", "XL"].map((size) => (
                                  <Button key={size} variant="outline" size="sm" className="w-12 h-10">
                                    {size}
                                  </Button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-2 block">Color</label>
                              <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-full bg-black border-2 border-gray-300 cursor-pointer"></div>
                                <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 cursor-pointer"></div>
                                <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-gray-300 cursor-pointer"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-medium">Product Details</h3>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Premium quality materials</li>
                            <li>• Sustainable and ethically sourced</li>
                            <li>• Machine washable</li>
                            <li>• Free shipping on orders over $100</li>
                            <li>• 30-day return policy</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <Button
                          className="flex-1 bg-ilary-button text-foreground hover:bg-ilary-buttonHover"
                          onClick={() => addToCart(product.id, product.title)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className={wishlist.includes(product.id) ? "text-red-500" : ""}
                          onClick={() => toggleWishlist(product.id, product.title)}
                        >
                          <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Compact View (existing card layout)
                  <>
                    <div className="relative aspect-[3/4] overflow-hidden">
                      {product.images && product.images.length > 1 ? (
                        <RotatingProductImage images={product.images} alt={product.title} className="aspect-[3/4]" />
                      ) : (
                        <Image
                          src={product.imageSrc || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}

                      {/* Collection Badge */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {product.originalPrice && <Badge className="bg-red-500 text-white">Sale</Badge>}
                        {product.collection !== "featured" && (
                          <Badge className="bg-white/90 text-foreground flex items-center gap-1">
                            {getCollectionIcon(product.collection)}
                            {product.collection.charAt(0).toUpperCase() + product.collection.slice(1)}
                          </Badge>
                        )}
                      </div>

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
                        <Button size="sm" variant="outline" onClick={() => setExpandedProduct(product.id)}>
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            ))}
          </motion.div>

          {/* Newsletter Section */}
          <div className="mt-16 bg-ilary-peachLight p-8 rounded-lg text-center">
            <h2 className="text-2xl font-serif tracking-wide mb-4">Stay Updated</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Be the first to know about new arrivals, exclusive offers, and styling tips from our fashion experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-ilary-border focus:outline-none focus:ring-2 focus:ring-ilary-button"
              />
              <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">Subscribe</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Featured Collection Products
const featuredProducts = [
  {
    id: "1",
    title: "Classic White Button-Down",
    description: "A timeless staple crafted from organic cotton with a relaxed fit",
    imageSrc: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?q=80&w=1287&auto=format&fit=crop",
    category: "Essentials",
    collection: "featured",
    price: "$89",
    rating: 5,
    reviews: 124,
    slug: "classic-white-button-down",
  },
  {
    id: "2",
    title: "High-Waisted Tailored Trousers",
    description: "Elegant trousers with a flattering silhouette in sustainable wool blend",
    imageSrc: "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1335&auto=format&fit=crop",
    category: "Bottoms",
    collection: "featured",
    price: "$120",
    originalPrice: "$150",
    rating: 4,
    reviews: 89,
    slug: "high-waisted-tailored-trousers",
  },
  {
    id: "3",
    title: "Oversized Cashmere Sweater",
    description: "Luxuriously soft sweater in a versatile neutral tone",
    imageSrc: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1305&auto=format&fit=crop",
    category: "Knitwear",
    collection: "featured",
    price: "$195",
    rating: 5,
    reviews: 156,
    slug: "oversized-cashmere-sweater",
  },
  {
    id: "4",
    title: "Structured Blazer",
    description: "Impeccably tailored blazer that elevates any outfit",
    imageSrc: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1336&auto=format&fit=crop",
    category: "Outerwear",
    collection: "featured",
    price: "$225",
    rating: 5,
    reviews: 98,
    slug: "structured-blazer",
  },
]

// Summer Collection Products
const summerProducts = [
  {
    id: "s1",
    title: "Linen Midi Dress",
    description: "Breathable linen dress perfect for warm summer days",
    imageSrc: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1288&auto=format&fit=crop",
    category: "Dresses",
    collection: "summer",
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
    collection: "summer",
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
    collection: "summer",
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
    collection: "summer",
    price: "$55",
    rating: 5,
    reviews: 73,
    slug: "straw-sun-hat",
  },
]

// Autumn Collection Products
const autumnProducts = [
  {
    id: "a1",
    title: "Wool Turtleneck Sweater",
    description: "Cozy merino wool turtleneck in rich autumn tones",
    imageSrc: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1287&auto=format&fit=crop",
    category: "Knitwear",
    collection: "autumn",
    price: "$135",
    rating: 5,
    reviews: 94,
    slug: "wool-turtleneck-sweater",
  },
  {
    id: "a2",
    title: "Corduroy Midi Skirt",
    description: "Vintage-inspired corduroy skirt in warm caramel",
    imageSrc: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1364&auto=format&fit=crop",
    category: "Bottoms",
    collection: "autumn",
    price: "$85",
    rating: 4,
    reviews: 67,
    slug: "corduroy-midi-skirt",
  },
  {
    id: "a3",
    title: "Leather Ankle Boots",
    description: "Handcrafted leather boots perfect for autumn walks",
    imageSrc: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop",
    category: "Accessories",
    collection: "autumn",
    price: "$195",
    originalPrice: "$245",
    rating: 5,
    reviews: 128,
    slug: "leather-ankle-boots",
  },
  {
    id: "a4",
    title: "Plaid Wool Scarf",
    description: "Soft wool scarf in classic autumn plaid pattern",
    imageSrc: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1287&auto=format&fit=crop",
    category: "Accessories",
    collection: "autumn",
    price: "$75",
    rating: 4,
    reviews: 85,
    slug: "plaid-wool-scarf",
  },
]

// Winter Collection Products
const winterProducts = [
  {
    id: "w1",
    title: "Wool Coat",
    description: "Elegant wool coat perfect for cold winter days",
    imageSrc: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1287&auto=format&fit=crop",
    category: "Outerwear",
    collection: "winter",
    price: "$320",
    rating: 5,
    reviews: 85,
    slug: "wool-coat",
  },
  {
    id: "w2",
    title: "Cashmere Beanie",
    description: "Luxuriously soft cashmere beanie for winter warmth",
    imageSrc: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1470&auto=format&fit=crop",
    category: "Accessories",
    collection: "winter",
    price: "$65",
    rating: 5,
    reviews: 112,
    slug: "cashmere-beanie",
  },
  {
    id: "w3",
    title: "Thermal Base Layer",
    description: "Merino wool base layer for ultimate winter comfort",
    imageSrc: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=1364&auto=format&fit=crop",
    category: "Essentials",
    collection: "winter",
    price: "$95",
    rating: 4,
    reviews: 76,
    slug: "thermal-base-layer",
  },
  {
    id: "w4",
    title: "Insulated Winter Boots",
    description: "Waterproof boots designed for harsh winter conditions",
    imageSrc: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?q=80&w=1287&auto=format&fit=crop",
    category: "Accessories",
    collection: "winter",
    price: "$225",
    originalPrice: "$275",
    rating: 5,
    reviews: 94,
    slug: "insulated-winter-boots",
  },
]

// Spring Collection Products
const springProducts = [
  {
    id: "p1",
    title: "Light Cardigan",
    description: "Soft cotton cardigan perfect for spring layering",
    imageSrc: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1305&auto=format&fit=crop",
    category: "Knitwear",
    collection: "spring",
    price: "$85",
    rating: 4,
    reviews: 103,
    slug: "light-cardigan",
  },
  {
    id: "p2",
    title: "Floral Midi Dress",
    description: "Delicate floral print dress in soft spring colors",
    imageSrc: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1315&auto=format&fit=crop",
    category: "Dresses",
    collection: "spring",
    price: "$115",
    rating: 5,
    reviews: 89,
    slug: "floral-midi-dress",
  },
  {
    id: "p3",
    title: "Denim Jacket",
    description: "Classic denim jacket for transitional spring weather",
    imageSrc: "https://images.unsplash.com/photo-1551698631218-e382a71b716b?q=80&w=1470&auto=format&fit=crop",
    category: "Outerwear",
    collection: "spring",
    price: "$95",
    originalPrice: "$125",
    rating: 4,
    reviews: 156,
    slug: "denim-jacket",
  },
  {
    id: "p4",
    title: "Canvas Sneakers",
    description: "Comfortable canvas sneakers in fresh spring colors",
    imageSrc: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1412&auto=format&fit=crop",
    category: "Accessories",
    collection: "spring",
    price: "$75",
    rating: 4,
    reviews: 124,
    slug: "canvas-sneakers",
  },
  {
    id: "p5",
    title: "Leather Mules",
    description: "Comfortable leather mules perfect for spring and summer",
    imageSrc: "https://m.media-amazon.com/images/I/71+Wyc+6UxL._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71+Wyc+6UxL._AC_SL1500_.jpg",
      "https://cdn.shopify.com/s/files/1/0563/1423/2875/files/06.03.23-Blog_1_480x480.png?v=1678097694",
      "https://m.media-amazon.com/images/I/81P+2QbzHLL._AC_SL1500_.jpg",
    ],
    category: "Accessories",
    collection: "spring",
    price: "$95",
    rating: 4,
    reviews: 87,
    slug: "leather-mules",
  },
]
