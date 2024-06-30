<pre>
style_loom/
│
├── public/
│   ├── next.svg             # SVG image of the Next.js logo
│   └── vercel.svg           # SVG image of the Vercel logo
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── getuserdata/
│   │   │   │   └── route.ts   # API route to get user data
│   │   │   ├── product/
│   │   │   │   ├── addproduct/
│   │   │   │   │   └── route.ts   # API route to add a product
│   │   │   │   ├── changeproductquantity/
│   │   │   │   │   └── route.ts   # API route to change product quantity
│   │   │   │   ├── deleteproduct/
│   │   │   │   │   └── route.ts   # API route to delete a product
│   │   │   │   ├── details/
│   │   │   │   │   └── route.ts   # API route for product details
│   │   │   │   ├── editproduct/
│   │   │   │   │   └── route.ts   # API route to edit a product
│   │   │   │   ├── getproductbycategory/
│   │   │   │   │   └── route.ts   # API route to get products by category
│   │   │   ├── user/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts   # API route for user login
│   │   │   │   ├── logout/
│   │   │   │   │   └── route.ts   # API route for user logout
│   │   │   │   ├── signup/
│   │   │   │   │   └── route.ts   # API route for user signup
│   │   │   │   ├── updateseller/
│   │   │   │   │   └── route.ts   # API route to update seller details
│   │   │   │   └── updateuser/
│   │   │   │       └── route.ts   # API route to update user details
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx   # Login page
│   │   │   └── signup/
│   │   │       └── page.tsx   # Signup page
│   │   ├── seller/
│   │   │   ├── addproduct/
│   │   │   │   └── page.tsx   # Seller page to add a product
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx   # Seller dashboard page
│   │   │   ├── editproduct/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── add.svg    # SVG image for adding
│   │   │   │   │   ├── minus.svg  # SVG image for subtracting
│   │   │   │   │   └── page.tsx   # Seller page to edit a product by ID
│   │   │   └── layout.tsx      # Seller section layout
│   │   ├── user/
│   │   │   ├── cart/
│   │   │   │   └── page.tsx    # User cart page
│   │   │   ├── homepage/
│   │   │   │   └── page.tsx    # User homepage
│   │   │   ├── layout.tsx      # User section layout
│   │   │   └── productdetails/
│   │   │       ├── [id]/
│   │   │       │   └── page.tsx    # User product details page by ID
│   │   ├── favicon.ico         # Project favicon
│   │   ├── globals.css         # Global CSS styles
│   │   ├── layout.tsx          # Layout component for main structure
│   │   ├── page.tsx            # Main page
│   │   └── Pagehandler.tsx     # Page handler component
│   │
│   ├── components/
│   │   ├── CartProductsCard.tsx          # Component for displaying products in cart
│   │   ├── CircularProgressIndicator.tsx # Component for circular progress indicator
│   │   ├── DynamicProductCards/
│   │   │   ├── edit.svg                  # SVG image for editing
│   │   │   └── ProductCard.tsx           # Component for dynamic product cards
│   │   ├── EmptyState/
│   │   │   ├── empty.svg                 # SVG image for empty state
│   │   │   └── EmptyState.tsx            # Component for empty state display
│   │   ├── LinkButtons.tsx               # Component for link buttons
│   │   ├── LoadingButton.tsx             # Component for loading button
│   │   ├── NavBar/
│   │   │   ├── add.svg                   # SVG image for adding in NavBar
│   │   │   ├── cart.svg                  # SVG image for cart in NavBar
│   │   │   ├── menu.svg                  # SVG image for menu in NavBar
│   │   │   └── NavBar.tsx                # NavBar component
│   │   ├── StaticProductCards/
│   │   │   ├── cart.svg                  # SVG image for cart in static product cards
│   │   │   └── StaticProductCard.tsx     # Component for static product cards
│   │   └── StyledInput.tsx               # Styled input component
│   │
│   ├── dbconfig/
│   │   └── dbconfig.ts       # Database configuration file
│   │
│   ├── models/
│   │   ├── product-model.ts  # Product model
│   │   ├── seller-model.ts   # Seller model
│   │   └── user-model.ts     # User model
│   │
│   ├── utils/
│   │   ├── addProductToCart.ts           # Utility to add product to cart
│   │   ├── checkout.ts                   # Utility for checkout process
│   │   ├── fetchProductByCategory.ts     # Utility to fetch products by category
│   │   ├── fetchProductData.ts           # Utility to fetch product data
│   │   └── fetchUserData.ts              # Utility to fetch user data
│   │
│   └── middleware.ts        # Middleware for route handling and protection
│
└── package.json            # Project metadata and dependencies
</pre>