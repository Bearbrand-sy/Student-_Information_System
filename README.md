<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ShopEase | Modern E-Commerce Experience</title>
  
  <!-- TailwindCSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <style id="app-style">
    body {
      font-family: 'Inter', sans-serif;
    }
    
    .slide-in {
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
    }
    
    .slide-in.active {
      transform: translateX(0);
    }
    
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    
    .quantity-input {
      width: 40px;
      text-align: center;
    }
    
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    
    .product-card {
      transition: all 0.3s ease;
    }
    
    .cart-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      min-width: 20px;
      height: 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .loading-spinner {
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    
    .page-transition {
      transition: opacity 0.3s ease-in-out;
    }
    
    .hidden-page {
      display: none;
      opacity: 0;
    }
    
    .active-page {
      display: block;
      opacity: 1;
    }
  </style>
</head>

<body class="bg-gray-50 min-h-screen">
  <!-- Header -->
  <header class="bg-white shadow-sm sticky top-0 z-10">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <a href="javascript:void(0)" class="text-2xl font-bold text-indigo-600" id="logo">ShopEase</a>
      
      <div class="flex items-center space-x-6">
        <button id="profile-btn" class="text-gray-600 hover:text-indigo-600 transition">
          <i class="fas fa-user text-xl"></i>
        </button>
        
        <div class="relative">
          <button id="cart-btn" class="text-gray-600 hover:text-indigo-600 transition">
            <i class="fas fa-shopping-cart text-xl"></i>
            <span id="cart-count" class="cart-badge bg-indigo-600 text-white text-xs font-bold">0</span>
          </button>
        </div>
        
        <!-- Add Admin Login Link -->
        <button id="admin-login-btn" class="text-gray-600 hover:text-indigo-600 transition">
          <i class="fas fa-lock text-xl"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- Main Content Area -->
  <main class="container mx-auto px-4 py-8">
    <!-- Home Page - Product Listing -->
    <div id="products-page" class="page-transition active-page">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Our Products</h1>
        <div class="flex items-center space-x-2">
          <label for="sort-by" class="text-sm text-gray-600">Sort by:</label>
          <select id="sort-by" class="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="popularity">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
      
      <div id="products-grid" class="product-grid">
        <!-- Products will be loaded here -->
        <div class="flex justify-center items-center w-full py-12">
          <div class="loading-spinner text-indigo-600 text-4xl">
            <i class="fas fa-circle-notch"></i>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Checkout Page -->
    <div id="checkout-page" class="page-transition hidden-page">
      <button id="back-to-cart" class="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center">
        <i class="fas fa-arrow-left mr-2"></i> Back to Cart
      </button>
      
      <h1 class="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-xl font-semibold mb-4">Delivery Options</h2>
            <div class="space-y-3">
              <label class="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <input type="radio" name="delivery" value="standard" checked class="text-indigo-600 focus:ring-indigo-500">
                <div class="ml-3">
                  <span class="block font-medium">Standard Delivery</span>
                  <span class="text-sm text-gray-500">3-5 business days</span>
                </div>
                <span class="ml-auto font-medium">Free</span>
              </label>
              
              <label class="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <input type="radio" name="delivery" value="express" class="text-indigo-600 focus:ring-indigo-500">
                <div class="ml-3">
                  <span class="block font-medium">Express Delivery</span>
                  <span class="text-sm text-gray-500">1-2 business days</span>
                </div>
                <span class="ml-auto font-medium">$9.99</span>
              </label>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4">Shipping Address</h2>
            <form id="address-form" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="first-name" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" id="first-name" name="first-name" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                </div>
                <div>
                  <label for="last-name" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" id="last-name" name="last-name" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                </div>
              </div>
              
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input type="text" id="address" name="address" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" id="city" name="city" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                </div>
                <div>
                  <label for="state" class="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input type="text" id="state" name="state" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                </div>
                <div>
                  <label for="zip" class="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input type="text" id="zip" name="zip" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                </div>
              </div>
              
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" id="phone" name="phone" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
              </div>
            </form>
          </div>
        </div>
        
        <div>
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-xl font-semibold mb-4">Payment Method</h2>
            <form id="payment-form" class="space-y-4">
              <div>
                <label for="card-name" class="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                <input type="text" id="card-name" name="card-name" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
              </div>
              
              <div>
                <label for="card-number" class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input type="text" id="card-number" name="card-number" placeholder="1234 5678 9012 3456" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="expiry" class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input type="text" id="expiry" name="expiry" placeholder="MM/YY" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                </div>
                <div>
                  <label for="cvv" class="block text-sm font-medium text-gray-700 mb-1">Security Code</label>
                  <input type="text" id="cvv" name="cvv" placeholder="123" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                </div>
              </div>
              
              <div class="border-t pt-4 mt-4">
                <div class="text-sm text-gray-500 mb-2">This is a prototype. No real payments will be processed.</div>
              </div>
            </form>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
            <div class="space-y-3 mb-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span id="checkout-subtotal" class="font-medium">$0.00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span id="checkout-shipping" class="font-medium">Free</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tax</span>
                <span id="checkout-tax" class="font-medium">$0.00</span>
              </div>
              <div class="border-t pt-3 flex justify-between">
                <span class="font-semibold">Total</span>
                <span id="checkout-total" class="font-bold text-xl">$0.00</span>
              </div>
            </div>
            
            <button id="place-order-btn" class="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Order Confirmation Page -->
    <div id="confirmation-page" class="page-transition hidden-page">
      <div class="max-w-2xl mx-auto">
        <div class="mb-8 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <i class="fas fa-check text-2xl text-green-500"></i>
          </div>
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p class="text-gray-600">Thank you for your purchase. We've received your order.</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h2 class="text-xl font-semibold">Order #<span id="order-id">12345</span></h2>
              <p class="text-gray-600">Placed on <span id="order-date">January 1, 2025</span></p>
            </div>
            <button id="print-receipt" class="text-indigo-600 hover:text-indigo-800">
              <i class="fas fa-print mr-1"></i> Print Receipt
            </button>
          </div>
          
          <div class="border-t pt-4">
            <h3 class="font-semibold mb-3">Delivery Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 class="text-sm text-gray-600 mb-1">Shipping Address</h4>
                <p id="confirm-address" class="text-sm">
                  John Doe<br>
                  123 Main St<br>
                  Anytown, ST 12345
                </p>
              </div>
              <div>
                <h4 class="text-sm text-gray-600 mb-1">Delivery Method</h4>
                <p id="confirm-shipping" class="text-sm">Standard Delivery (3-5 business days)</p>
                <p class="text-sm">Estimated delivery: <span id="delivery-date" class="font-medium">January 5, 2025</span></p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 class="font-semibold mb-4">Order Summary</h3>
          <div id="confirmation-items" class="space-y-4 mb-4">
            <!-- Order items will be loaded here -->
          </div>
          
          <div class="border-t pt-4 space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal</span>
              <span id="confirm-subtotal" class="font-medium">$0.00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Shipping</span>
              <span id="confirm-shipping-cost" class="font-medium">Free</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Tax</span>
              <span id="confirm-tax" class="font-medium">$0.00</span>
            </div>
            <div class="flex justify-between font-bold">
              <span>Total</span>
              <span id="confirm-total" class="text-xl">$0.00</span>
            </div>
          </div>
        </div>
        
        <div class="text-center mb-8">
          <button id="continue-shopping" class="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
    
    <!-- Profile Page -->
    <div id="profile-page" class="page-transition hidden-page">
      <button id="back-to-shop" class="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center">
        <i class="fas fa-arrow-left mr-2"></i> Back to Shop
      </button>
      
      <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold text-gray-800 mb-8">My Account</h1>
        
        <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div class="flex">
            <div class="w-1/4 bg-gray-50 p-4 border-r">
              <ul class="space-y-2">
                <li>
                  <button id="profile-tab-btn" class="w-full text-left py-2 px-3 rounded-md bg-indigo-50 text-indigo-600 font-medium">
                    <i class="fas fa-user mr-2"></i> Profile
                  </button>
                </li>
                <li>
                  <button id="orders-tab-btn" class="w-full text-left py-2 px-3 rounded-md text-gray-600 hover:bg-gray-100 transition">
                    <i class="fas fa-box mr-2"></i> Orders
                  </button>
                </li>
                <li>
                  <button id="settings-tab-btn" class="w-full text-left py-2 px-3 rounded-md text-gray-600 hover:bg-gray-100 transition">
                    <i class="fas fa-cog mr-2"></i> Settings
                  </button>
                </li>
              </ul>
            </div>
            
            <div class="w-3/4 p-6">
              <!-- Profile Tab -->
              <div id="profile-tab" class="tab-content active">
                <h2 class="text-xl font-semibold mb-4">Personal Information</h2>
                <form id="profile-form" class="space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="profile-first-name" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input type="text" id="profile-first-name" name="profile-first-name" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    </div>
                    <div>
                      <label for="profile-last-name" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input type="text" id="profile-last-name" name="profile-last-name" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    </div>
                  </div>
                  
                  <div>
                    <label for="profile-email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" id="profile-email" name="profile-email" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  </div>
                  
                  <div>
                    <label for="profile-phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" id="profile-phone" name="profile-phone" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  </div>
                  
                  <h3 class="text-lg font-medium pt-4">Default Address</h3>
                  
                  <div>
                    <label for="profile-address" class="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input type="text" id="profile-address" name="profile-address" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label for="profile-city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input type="text" id="profile-city" name="profile-city" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    </div>
                    <div>
                      <label for="profile-state" class="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input type="text" id="profile-state" name="profile-state" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    </div>
                    <div>
                      <label for="profile-zip" class="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                      <input type="text" id="profile-zip" name="profile-zip" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    </div>
                  </div>
                  
                  <div class="pt-4">
                    <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
              
              <!-- Orders Tab -->
              <div id="orders-tab" class="tab-content hidden">
                <h2 class="text-xl font-semibold mb-4">Order History</h2>
                <div id="orders-list" class="space-y-4">
                  <!-- Orders will be loaded here -->
                  <div class="text-gray-500 text-center py-8">
                    You haven't placed any orders yet.
                  </div>
                </div>
              </div>
              
              <!-- Settings Tab -->
              <div id="settings-tab" class="tab-content hidden">
                <h2 class="text-xl font-semibold mb-4">Account Settings</h2>
                
                <div class="space-y-6">
                  <div class="border-b pb-4">
                    <h3 class="font-medium mb-2">Email Notifications</h3>
                    <div class="space-y-2">
                      <label class="flex items-center">
                        <input type="checkbox" class="text-indigo-600 rounded focus:ring-indigo-500">
                        <span class="ml-2 text-sm">Order updates</span>
                      </label>
                      <label class="flex items-center">
                        <input type="checkbox" class="text-indigo-600 rounded focus:ring-indigo-500">
                        <span class="ml-2 text-sm">Promotions and sales</span>
                      </label>
                      <label class="flex items-center">
                        <input type="checkbox" class="text-indigo-600 rounded focus:ring-indigo-500">
                        <span class="ml-2 text-sm">New product arrivals</span>
                      </label>
                    </div>
                  </div>
                  
                  <div class="border-b pb-4">
                    <h3 class="font-medium mb-2">Privacy</h3>
                    <div class="space-y-2">
                      <label class="flex items-center">
                        <input type="checkbox" class="text-indigo-600 rounded focus:ring-indigo-500">
                        <span class="ml-2 text-sm">Save my shopping preferences</span>
                      </label>
                      <label class="flex items-center">
                        <input type="checkbox" class="text-indigo-600 rounded focus:ring-indigo-500">
                        <span class="ml-2 text-sm">Allow personalized recommendations</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="font-medium text-red-600 mb-2">Clear Data</h3>
                    <p class="text-sm text-gray-600 mb-3">This will remove all your data from this device, including cart, profile, and order history.</p>
                    <button id="clear-data-btn" class="bg-red-100 text-red-700 px-4 py-2 rounded-md font-medium hover:bg-red-200 transition">
                      Clear All Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Admin Login Page -->
    <div id="admin-login-page" class="page-transition hidden-page">
      <div class="max-w-md mx-auto my-12">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <div class="text-center mb-6">
              <h2 class="text-2xl font-bold text-gray-800">Admin Login</h2>
              <p class="text-gray-600 mt-1">Enter your credentials to access the dashboard</p>
            </div>
            
            <form id="admin-login-form" class="space-y-4">
              <div>
                <label for="admin-username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input type="text" id="admin-username" name="admin-username" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
              </div>
              
              <div>
                <label for="admin-password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" id="admin-password" name="admin-password" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
              </div>
              
              <div id="admin-login-error" class="text-red-600 text-sm hidden">
                Invalid username or password. Please try again.
              </div>
              
              <div>
                <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition">
                  Login
                </button>
              </div>
              
              <div class="text-center text-sm text-gray-500 mt-4">
                <p>For demo purposes, use:</p>
                <p>Username: <strong>admin</strong> | Password: <strong>admin123</strong></p>
              </div>
            </form>
          </div>
        </div>
        
        <div class="text-center mt-6">
          <button id="back-to-store" class="text-indigo-600 hover:text-indigo-800">
            <i class="fas fa-arrow-left mr-1"></i> Back to Store
          </button>
        </div>
      </div>
    </div>
    
    <!-- Admin Dashboard Page -->
    <div id="admin-dashboard-page" class="page-transition hidden-page">
      <div class="flex h-screen bg-gray-100">
        <!-- Sidebar -->
        <div class="w-64 bg-indigo-800 text-white flex flex-col">
          <div class="p-4 border-b border-indigo-700">
            <h2 class="text-xl font-bold">ShopEase Admin</h2>
          </div>
          
          <nav class="flex-grow">
            <ul class="space-y-1 p-2">
              <li>
                <button id="admin-dashboard-btn" class="admin-nav-btn w-full flex items-center px-4 py-3 rounded-md bg-indigo-900 font-medium">
                  <i class="fas fa-tachometer-alt w-5 mr-2"></i> Dashboard
                </button>
              </li>
              <li>
                <button id="admin-orders-btn" class="admin-nav-btn w-full flex items-center px-4 py-3 rounded-md hover:bg-indigo-700 transition">
                  <i class="fas fa-shopping-bag w-5 mr-2"></i> Orders
                </button>
              </li>
              <li>
                <button id="admin-users-btn" class="admin-nav-btn w-full flex items-center px-4 py-3 rounded-md hover:bg-indigo-700 transition">
                  <i class="fas fa-users w-5 mr-2"></i> Users
                </button>
              </li>
              <li>
                <button id="admin-inventory-btn" class="admin-nav-btn w-full flex items-center px-4 py-3 rounded-md hover:bg-indigo-700 transition">
                  <i class="fas fa-boxes w-5 mr-2"></i> Inventory
                </button>
              </li>
              <li>
                <button id="admin-payments-btn" class="admin-nav-btn w-full flex items-center px-4 py-3 rounded-md hover:bg-indigo-700 transition">
                  <i class="fas fa-credit-card w-5 mr-2"></i> Payments
                </button>
              </li>
            </ul>
          </nav>
          
          <div class="p-4 border-t border-indigo-700 mt-auto">
            <button id="admin-logout-btn" class="w-full flex items-center px-4 py-2 rounded-md hover:bg-indigo-700 transition">
              <i class="fas fa-sign-out-alt w-5 mr-2"></i> Logout
            </button>
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
          <!-- Top Bar -->
          <header class="bg-white shadow-sm z-10">
            <div class="flex items-center justify-between p-4">
              <div class="flex items-center space-x-4">
                <h1 id="admin-section-title" class="text-xl font-semibold text-gray-800">Dashboard Overview</h1>
              </div>
              <div class="flex items-center space-x-4">
                <span class="text-gray-600">Admin User</span>
                <button id="admin-profile-btn" class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <i class="fas fa-user"></i>
                </button>
              </div>
            </div>
          </header>
          
          <!-- Content Area -->
          <main class="flex-1 overflow-y-auto p-4">
            <!-- Dashboard Overview Section -->
            <div id="admin-dashboard-section" class="admin-section">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                  <div class="flex items-center">
                    <div class="rounded-full bg-blue-100 p-3 mr-4">
                      <i class="fas fa-shopping-bag text-blue-600"></i>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-700">Orders</h3>
                      <p id="dashboard-order-count" class="text-2xl font-bold">0</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                  <div class="flex items-center">
                    <div class="rounded-full bg-green-100 p-3 mr-4">
                      <i class="fas fa-users text-green-600"></i>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-700">Users</h3>
                      <p id="dashboard-user-count" class="text-2xl font-bold">0</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                  <div class="flex items-center">
                    <div class="rounded-full bg-purple-100 p-3 mr-4">
                      <i class="fas fa-boxes text-purple-600"></i>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-700">Products</h3>
                      <p id="dashboard-product-count" class="text-2xl font-bold">0</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                  <div class="flex items-center">
                    <div class="rounded-full bg-yellow-100 p-3 mr-4">
                      <i class="fas fa-dollar-sign text-yellow-600"></i>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-700">Revenue</h3>
                      <p id="dashboard-revenue" class="text-2xl font-bold">$0.00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div class="bg-white rounded-lg shadow p-6">
                  <h3 class="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h3>
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody id="dashboard-recent-orders" class="divide-y divide-gray-200">
                        <tr>
                          <td class="px-4 py-3 text-sm text-gray-500" colspan="5">No orders found</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                  <h3 class="text-lg font-semibold text-gray-700 mb-4">Low Stock Products</h3>
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody id="dashboard-low-stock" class="divide-y divide-gray-200">
                        <tr>
                          <td class="px-4 py-3 text-sm text-gray-500" colspan="3">No low stock products</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Orders Section -->
            <div id="admin-orders-section" class="admin-section hidden">
              <div class="bg-white rounded-lg shadow mb-6">
                <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-700">All Orders</h3>
                  <div class="flex space-x-2">
                    <select id="order-status-filter" class="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="all">All Statuses</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <input type="text" id="order-search" placeholder="Search orders..." class="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="admin-orders-table" class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-3 text-sm text-gray-500" colspan="7">No orders found</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <!-- Users Section -->
            <div id="admin-users-section" class="admin-section hidden">
              <div class="bg-white rounded-lg shadow mb-6">
                <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-700">Users</h3>
                  <div>
                    <input type="text" id="user-search" placeholder="Search users..." class="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="admin-users-table" class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-3 text-sm text-gray-500" colspan="6">No users found</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <!-- Inventory Section -->
            <div id="admin-inventory-section" class="admin-section hidden">
              <div class="bg-white rounded-lg shadow mb-6">
                <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-700">Product Inventory</h3>
                  <div class="flex space-x-2">
                    <select id="inventory-filter" class="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="all">All Products</option>
                      <option value="low">Low Stock</option>
                      <option value="out">Out of Stock</option>
                    </select>
                    <input type="text" id="inventory-search" placeholder="Search products..." class="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="admin-inventory-table" class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-3 text-sm text-gray-500" colspan="6">No products found</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div class="text-right">
                <button id="add-product-btn" class="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition">
                  <i class="fas fa-plus mr-1"></i> Add New Product
                </button>
              </div>
            </div>
            
            <!-- Payments Section -->
            <div id="admin-payments-section" class="admin-section hidden">
              <div class="bg-white rounded-lg shadow mb-6">
                <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-700">Payment Transactions</h3>
                  <div class="flex space-x-2">
                    <select id="payment-status-filter" class="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="all">All Statuses</option>
                      <option value="successful">Successful</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                    <input type="text" id="payment-search" placeholder="Search transactions..." class="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody id="admin-payments-table" class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-3 text-sm text-gray-500" colspan="7">No transactions found</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </main>

  <!-- Cart Sidebar -->
  <div id="cart-sidebar" class="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl z-50 slide-in">
    <div class="flex flex-col h-full">
      <div class="p-4 border-b flex justify-between items-center">
        <h2 class="text-xl font-bold">Shopping Cart</h2>
        <button id="close-cart" class="text-gray-500 hover:text-gray-700">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <div id="cart-items" class="flex-grow overflow-y-auto p-4">
        <!-- Cart items will be loaded here -->
        <div class="text-center py-8 text-gray-500">
          Your cart is empty.
        </div>
      </div>
      
      <div class="border-t p-4">
        <div class="flex justify-between mb-4">
          <span class="font-semibold">Subtotal</span>
          <span id="cart-subtotal" class="font-bold">$0.00</span>
        </div>
        <button id="checkout-btn" class="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled>
          Proceed to Checkout
        </button>
        <p class="text-sm text-gray-500 text-center mt-2">Free shipping on all orders over $50</p>
      </div>
    </div>
  </div>
  
  <!-- Overlay -->
  <div id="overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden"></div>
  
  <!-- Toast Notifications -->
  <div id="toast-container" class="fixed bottom-4 right-4 z-50 flex flex-col space-y-2"></div>

  <script id="app-script">
    // Initialize Store Data
    let cart = [];
    let products = [];
    let orders = [];
    let userProfile = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    };
    
    // Admin variables
    let isAdminLoggedIn = false;
    let users = [];
    let transactions = [];
    
    // DOM Elements
    const productsGrid = document.getElementById('products-grid');
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartCountBadge = document.getElementById('cart-count');
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    const backToCartBtn = document.getElementById('back-to-cart');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const continueShoppingBtn = document.getElementById('continue-shopping');
    const backToShopBtn = document.getElementById('back-to-shop');
    const profileBtn = document.getElementById('profile-btn');
    const profileTabBtn = document.getElementById('profile-tab-btn');
    const ordersTabBtn = document.getElementById('orders-tab-btn');
    const settingsTabBtn = document.getElementById('settings-tab-btn');
    const profileTab = document.getElementById('profile-tab');
    const ordersTab = document.getElementById('orders-tab');
    const settingsTab = document.getElementById('settings-tab');
    const clearDataBtn = document.getElementById('clear-data-btn');
    const logoBtn = document.getElementById('logo');
    
    // Admin DOM Elements
    const adminLoginBtn = document.getElementById('admin-login-btn');
    const adminLoginPage = document.getElementById('admin-login-page');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminLoginError = document.getElementById('admin-login-error');
    const backToStoreBtn = document.getElementById('back-to-store');
    const adminDashboardPage = document.getElementById('admin-dashboard-page');
    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    const adminNavBtns = document.querySelectorAll('.admin-nav-btn');
    const adminSections = document.querySelectorAll('.admin-section');
    const adminSectionTitle = document.getElementById('admin-section-title');
    
    // Admin dashboard sections
    const dashboardBtn = document.getElementById('admin-dashboard-btn');
    const ordersBtn = document.getElementById('admin-orders-btn');
    const usersBtn = document.getElementById('admin-users-btn');
    const inventoryBtn = document.getElementById('admin-inventory-btn');
    const paymentsBtn = document.getElementById('admin-payments-btn');
    
    // Pages
    const productsPage = document.getElementById('products-page');
    const checkoutPage = document.getElementById('checkout-page');
    const confirmationPage = document.getElementById('confirmation-page');
    const profilePage = document.getElementById('profile-page');
    
    // Fetch Products
    async function fetchProducts() {
      try {
        // In a real app, this would be a fetch call to an API
        // For prototype, we'll use sample data
        const sampleProducts = [
          {
            id: 1,
            name: "Wireless Headphones",
            price: 89.99,
            image: "https://cdn.pixabay.com/photo/2018/09/17/14/27/headphones-3683983_960_720.jpg",
            description: "Premium wireless headphones with noise cancellation"
          },
          {
            id: 2,
            name: "Smart Watch",
            price: 129.99,
            image: "https://cdn.pixabay.com/photo/2015/06/25/17/22/smart-watch-821559_960_720.jpg",
            description: "Track your fitness and stay connected"
          },
          {
            id: 3,
            name: "Bluetooth Speaker",
            price: 59.99,
            image: "https://cdn.pixabay.com/photo/2017/01/06/17/49/bluetooth-speaker-1958773_960_720.jpg",
            description: "Portable speaker with impressive sound quality"
          },
          {
            id: 4,
            name: "Laptop Backpack",
            price: 49.99,
            image: "https://cdn.pixabay.com/photo/2017/08/06/12/52/backpack-2592442_960_720.jpg",
            description: "Durable backpack with dedicated laptop compartment"
          },
          {
            id: 5,
            name: "Smartphone",
            price: 699.99,
            image: "https://cdn.pixabay.com/photo/2017/04/03/15/52/mobile-phone-2198770_960_720.jpg",
            description: "Latest smartphone with advanced camera features"
          },
          {
            id: 6,
            name: "Coffee Mug",
            price: 14.99,
            image: "https://cdn.pixabay.com/photo/2015/11/07/11/17/coffee-1031526_960_720.jpg",
            description: "Ceramic mug that keeps your drinks hot longer"
          },
          {
            id: 7,
            name: "Plant Pot",
            price: 24.99,
            image: "https://cdn.pixabay.com/photo/2019/06/25/13/59/city-4297764_960_720.jpg",
            description: "Stylish ceramic pot for indoor plants"
          },
          {
            id: 8,
            name: "Sunglasses",
            price: 79.99,
            image: "https://cdn.pixabay.com/photo/2016/11/29/13/39/glasses-1869767_960_720.jpg",
            description: "UV protection sunglasses with polarized lenses"
          }
        ];
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        products = sampleProducts;
        renderProducts();
      } catch (error) {
        console.error('Error fetching products:', error);
        showToast('Failed to load products. Please try again.', 'error');
      }
    }
    
    // Render Products
    function renderProducts() {
      productsGrid.innerHTML = '';
      
      products.forEach(product => {
        const productEl = document.createElement('div');
        productEl.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden';
        productEl.innerHTML = `
          <div class="h-48 overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-lg mb-1">${product.name}</h3>
            <p class="text-gray-600 text-sm mb-3">${product.description}</p>
            <div class="flex justify-between items-center">
              <span class="font-bold text-lg">$${product.price.toFixed(2)}</span>
              <button class="add-to-cart-btn bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700 transition" data-id="${product.id}">
                Add to Cart
              </button>
            </div>
          </div>
        `;
        productsGrid.appendChild(productEl);
        
        // Add event listener to Add to Cart button
        const addToCartBtn = productEl.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => {
          addToCart(product);
        });
      });
    }
    
    // Add to Cart
    function addToCart(product) {
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1
        });
      }
      
      updateCart();
      showToast(`${product.name} added to cart`, 'success');
      saveCartToLocalStorage();
    }
    
    // Update Cart UI
    function updateCart() {
      // Update cart count badge
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCountBadge.textContent = totalItems;
      
      // Update checkout button state
      checkoutBtn.disabled = totalItems === 0;
      
      // Update cart items
      if (cart.length === 0) {
        cartItems.innerHTML = `
          <div class="text-center py-8 text-gray-500">
            Your cart is empty.
          </div>
        `;
      } else {
        cartItems.innerHTML = '';
        
        cart.forEach(item => {
          const cartItemEl = document.createElement('div');
          cartItemEl.className = 'flex items-start border-b pb-4 mb-4 last:border-0 last:mb-0 last:pb-0';
          cartItemEl.innerHTML = `
            <div class="w-16 h-16 rounded overflow-hidden mr-4">
              <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
            </div>
            <div class="flex-grow">
              <h4 class="font-medium">${item.name}</h4>
              <div class="flex items-center mt-1">
                <div class="flex items-center mr-4">
                  <button class="quantity-btn decrease text-gray-500 hover:text-indigo-600" data-id="${item.id}">
                    <i class="fas fa-minus"></i>
                  </button>
                  <span class="quantity-input mx-2">${item.quantity}</span>
                  <button class="quantity-btn increase text-gray-500 hover:text-indigo-600" data-id="${item.id}">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <span class="text-gray-700">$${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
            <button class="remove-item text-gray-400 hover:text-red-600 ml-2" data-id="${item.id}">
              <i class="fas fa-trash"></i>
            </button>
          `;
          cartItems.appendChild(cartItemEl);
          
          // Add event listeners for cart item actions
          const decreaseBtn = cartItemEl.querySelector('.decrease');
          const increaseBtn = cartItemEl.querySelector('.increase');
          const removeBtn = cartItemEl.querySelector('.remove-item');
          
          decreaseBtn.addEventListener('click', () => {
            updateCartItemQuantity(item.id, -1);
          });
          
          increaseBtn.addEventListener('click', () => {
            updateCartItemQuantity(item.id, 1);
          });
          
          removeBtn.addEventListener('click', () => {
            removeCartItem(item.id);
          });
        });
      }
      
      // Update subtotal
      const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
      
      // Update checkout page subtotal if visible
      if (document.getElementById('checkout-subtotal')) {
        document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        
        // Calculate tax (assumed 8%)
        const tax = subtotal * 0.08;
        document.getElementById('checkout-tax').textContent = `$${tax.toFixed(2)}`;
        
        // Calculate total
        const shippingCost = document.querySelector('input[name="delivery"]:checked').value === 'express' ? 9.99 : 0;
        document.getElementById('checkout-shipping').textContent = shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'Free';
        
        const total = subtotal + tax + shippingCost;
        document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
      }
    }
    
    // Update Cart Item Quantity
    function updateCartItemQuantity(productId, change) {
      const itemIndex = cart.findIndex(item => item.id === productId);
      
      if (itemIndex === -1) return;
      
      cart[itemIndex].quantity += change;
      
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
      
      updateCart();
      saveCartToLocalStorage();
    }
    
    // Remove Cart Item
    function removeCartItem(productId) {
      cart = cart.filter(item => item.id !== productId);
      updateCart();
      saveCartToLocalStorage();
      showToast('Item removed from cart', 'info');
    }
    
    // Toggle Cart Sidebar
    function toggleCart() {
      cartSidebar.classList.toggle('active');
      overlay.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden');
    }
    
    // Show Toast Notification
    function showToast(message, type = 'info') {
      const toastContainer = document.getElementById('toast-container');
      const toast = document.createElement('div');
      
      let bgColor, icon;
      switch (type) {
        case 'success':
          bgColor = 'bg-green-500';
          icon = '<i class="fas fa-check-circle mr-2"></i>';
          break;
        case 'error':
          bgColor = 'bg-red-500';
          icon = '<i class="fas fa-exclamation-circle mr-2"></i>';
          break;
        case 'warning':
          bgColor = 'bg-yellow-500';
          icon = '<i class="fas fa-exclamation-triangle mr-2"></i>';
          break;
        default:
          bgColor = 'bg-blue-500';
          icon = '<i class="fas fa-info-circle mr-2"></i>';
      }
      
      toast.className = `${bgColor} text-white px-4 py-3 rounded-md shadow-lg flex items-center max-w-xs`;
      toast.innerHTML = `
        ${icon}
        <span>${message}</span>
      `;
      
      toastContainer.appendChild(toast);
      
      // Auto remove toast after 3 seconds
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          toastContainer.removeChild(toast);
        }, 500);
      }, 3000);
    }
    
    // Navigate to Page
    function navigateTo(pageId) {
      // Hide all pages
      document.querySelectorAll('.page-transition').forEach(page => {
        page.classList.remove('active-page');
        page.classList.add('hidden-page');
      });
      
      // Show requested page
      const targetPage = document.getElementById(pageId);
      targetPage.classList.remove('hidden-page');
      targetPage.classList.add('active-page');
      
      // Scroll to top
      window.scrollTo(0, 0);
      
      // Close cart if open
      if (cartSidebar.classList.contains('active')) {
        toggleCart();
      }
    }
    
    // Handle Checkout
    function goToCheckout() {
      navigateTo('checkout-page');
      
      // Update order summary
      updateCart();
    }
    
    // Handle Order Placement
    function placeOrder() {
      // Validate form
      const addressForm = document.getElementById('address-form');
      const paymentForm = document.getElementById('payment-form');
      
      if (!addressForm.checkValidity() || !paymentForm.checkValidity()) {
        showToast('Please fill in all required fields', 'error');
        return;
      }
      
      // Create new order
      const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      const orderDate = new Date();
      
      const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      const tax = subtotal * 0.08;
      const shippingMethod = document.querySelector('input[name="delivery"]:checked').value;
      const shippingCost = shippingMethod === 'express' ? 9.99 : 0;
      const total = subtotal + tax + shippingCost;
      
      // Get shipping details
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      const address = document.getElementById('address').value;
      const city = document.getElementById('city').value;
      const state = document.getElementById('state').value;
      const zip = document.getElementById('zip').value;
      
      const newOrder = {
        id: orderId,
        date: orderDate,
        items: [...cart],
        subtotal,
        tax,
        shipping: {
          cost: shippingCost,
          method: shippingMethod
        },
        total,
        status: 'Processing',
        address: {
          firstName,
          lastName,
          street: address,
          city,
          state,
          zip
        }
      };
      
      // Add order to orders array
      orders.push(newOrder);
      saveOrdersToLocalStorage();
      
      // Create transaction record
      const transactionId = 'TRX-' + Math.floor(100000 + Math.random() * 900000);
      const transaction = {
        id: transactionId,
        orderId: orderId,
        date: orderDate,
        customer: `${firstName} ${lastName}`,
        method: 'Credit Card', // From payment form
        amount: total,
        status: 'successful'
      };
      
      // Add transaction to transactions array
      transactions.push(transaction);
      
      // Clear cart
      cart = [];
      updateCart();
      saveCartToLocalStorage();
      
      // Show confirmation page
      showOrderConfirmation(newOrder);
    }
    
    // Show Order Confirmation
    function showOrderConfirmation(order) {
      // Set order details
      document.getElementById('order-id').textContent = order.id;
      document.getElementById('order-date').textContent = formatDate(order.date);
      
      // Set delivery date (estimated 3-5 days for standard, 1-2 for express)
      const deliveryDate = new Date(order.date);
      if (order.shipping.method === 'express') {
        deliveryDate.setDate(deliveryDate.getDate() + 2);
      } else {
        deliveryDate.setDate(deliveryDate.getDate() + 5);
      }
      document.getElementById('delivery-date').textContent = formatDate(deliveryDate);
      
      // Set shipping address
      const { firstName, lastName, street, city, state, zip } = order.address;
      document.getElementById('confirm-address').innerHTML = `
        ${firstName} ${lastName}<br>
        ${street}<br>
        ${city}, ${state} ${zip}
      `;
      
      // Set shipping method
      const shippingMethodText = order.shipping.method === 'express' 
        ? 'Express Delivery (1-2 business days)' 
        : 'Standard Delivery (3-5 business days)';
      document.getElementById('confirm-shipping').textContent = shippingMethodText;
      
      // Set order items
      const confirmationItems = document.getElementById('confirmation-items');
      confirmationItems.innerHTML = '';
      
      order.items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'flex items-start';
        itemEl.innerHTML = `
          <div class="w-12 h-12 rounded overflow-hidden mr-3">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
          </div>
          <div class="flex-grow">
            <div class="flex justify-between">
              <h4 class="font-medium">${item.name}</h4>
              <span class="text-gray-700">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div class="text-sm text-gray-500">Qty: ${item.quantity}</div>
          </div>
        `;
        confirmationItems.appendChild(itemEl);
      });
      
      // Set totals
      document.getElementById('confirm-subtotal').textContent = `$${order.subtotal.toFixed(2)}`;
      document.getElementById('confirm-shipping-cost').textContent = order.shipping.cost > 0 ? `$${order.shipping.cost.toFixed(2)}` : 'Free';
      document.getElementById('confirm-tax').textContent = `$${order.tax.toFixed(2)}`;
      document.getElementById('confirm-total').textContent = `$${order.total.toFixed(2)}`;
      
      // Navigate to confirmation page
      navigateTo('confirmation-page');
    }
    
    // Handle Profile Tab Navigation
    function showProfileTab(tabId) {
      // Hide all tabs
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('active');
      });
      
      // Show selected tab
      const targetTab = document.getElementById(tabId);
      targetTab.classList.remove('hidden');
      targetTab.classList.add('active');
      
      // Update active tab button
      document.querySelectorAll('#profile-page button').forEach(btn => {
        btn.classList.remove('bg-indigo-50', 'text-indigo-600');
        btn.classList.add('text-gray-600', 'hover:bg-gray-100');
      });
      
      const activeBtn = document.getElementById(`${tabId}-btn`);
      activeBtn.classList.remove('text-gray-600', 'hover:bg-gray-100');
      activeBtn.classList.add('bg-indigo-50', 'text-indigo-600');
    }
    
    // Render Orders List
    function renderOrders() {
      const ordersList = document.getElementById('orders-list');
      
      if (orders.length === 0) {
        ordersList.innerHTML = `
          <div class="text-gray-500 text-center py-8">
            You haven't placed any orders yet.
          </div>
        `;
        return;
      }
      
      ordersList.innerHTML = '';
      
      orders.forEach(order => {
        const orderEl = document.createElement('div');
        orderEl.className = 'border rounded-md overflow-hidden';
        
        const formattedDate = formatDate(new Date(order.date));
        const itemCount = order.items.reduce((total, item) => total + item.quantity, 0);
        
        orderEl.innerHTML = `
          <div class="p-4 cursor-pointer order-header" data-order-id="${order.id}">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold">Order #${order.id}</h3>
                <p class="text-sm text-gray-600">Placed on ${formattedDate}</p>
              </div>
              <div class="text-right">
                <span class="inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}">${order.status}</span>
                <p class="text-lg font-bold mt-1">$${order.total.toFixed(2)}</p>
              </div>
            </div>
            <div class="mt-2 flex justify-between items-center">
              <span class="text-sm text-gray-600">${itemCount} item${itemCount !== 1 ? 's' : ''}</span>
              <button class="text-indigo-600 text-sm flex items-center">
                <span>Details</span>
                <i class="fas fa-chevron-down ml-1 order-chevron"></i>
              </button>
            </div>
          </div>
          <div class="border-t p-4 bg-gray-50 order-details hidden">
            <h4 class="font-medium mb-3">Order Items</h4>
            <div class="space-y-3 mb-4">
              ${order.items.map(item => `
                <div class="flex items-start">
                  <div class="w-10 h-10 rounded overflow-hidden mr-3">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                  </div>
                  <div class="flex-grow">
                    <div class="flex justify-between">
                      <h5 class="font-medium">${item.name}</h5>
                      <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div class="text-xs text-gray-500">Qty: ${item.quantity}</div>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="border-t pt-3 space-y-1 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span>$${order.subtotal.toFixed(2)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span>${order.shipping.cost > 0 ? `$${order.shipping.cost.toFixed(2)}` : 'Free'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tax</span>
                <span>$${order.tax.toFixed(2)}</span>
              </div>
              <div class="flex justify-between font-semibold pt-1">
                <span>Total</span>
                <span>$${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        `;
        ordersList.appendChild(orderEl);
        
        // Add event listener to toggle order details
        const orderHeader = orderEl.querySelector('.order-header');
        orderHeader.addEventListener('click', () => {
          const details = orderEl.querySelector('.order-details');
          const chevron = orderEl.querySelector('.order-chevron');
          
          details.classList.toggle('hidden');
          chevron.classList.toggle('fa-chevron-down');
          chevron.classList.toggle('fa-chevron-up');
        });
      });
    }
    
    // Helper function for status color
    function getStatusColor(status) {
      switch (status) {
        case 'Processing':
          return 'bg-blue-100 text-blue-800';
        case 'Shipped':
          return 'bg-purple-100 text-purple-800';
        case 'Delivered':
          return 'bg-green-100 text-green-800';
        case 'Cancelled':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }
    
    // Format Date
    function formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    }
    
    // Load Profile Data
    function loadProfileData() {
      const profileForm = document.getElementById('profile-form');
      
      if (profileForm) {
        document.getElementById('profile-first-name').value = userProfile.firstName;
        document.getElementById('profile-last-name').value = userProfile.lastName;
        document.getElementById('profile-email').value = userProfile.email;
        document.getElementById('profile-phone').value = userProfile.phone;
        document.getElementById('profile-address').value = userProfile.address;
        document.getElementById('profile-city').value = userProfile.city;
        document.getElementById('profile-state').value = userProfile.state;
        document.getElementById('profile-zip').value = userProfile.zip;
      }
    }
    
    // Save Profile Data
    function saveProfileData(e) {
      e.preventDefault();
      
      userProfile = {
        firstName: document.getElementById('profile-first-name').value,
        lastName: document.getElementById('profile-last-name').value,
        email: document.getElementById('profile-email').value,
        phone: document.getElementById('profile-phone').value,
        address: document.getElementById('profile-address').value,
        city: document.getElementById('profile-city').value,
        state: document.getElementById('profile-state').value,
        zip: document.getElementById('profile-zip').value
      };
      
      saveProfileToLocalStorage();
      showToast('Profile updated successfully', 'success');
    }
    
    // Clear All Data
    function clearAllData() {
      if (confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
        localStorage.removeItem('shopease_cart');
        localStorage.removeItem('shopease_orders');
        localStorage.removeItem('shopease_profile');
        
        cart = [];
        orders = [];
        userProfile = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          zip: ''
        };
        
        updateCart();
        loadProfileData();
        renderOrders();
        
        showToast('All data has been cleared', 'info');
      }
    }
    
    // LocalStorage Functions
    function loadCartFromLocalStorage() {
      const savedCart = localStorage.getItem('shopease_cart');
      if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
      }
    }
    
    function saveCartToLocalStorage() {
      localStorage.setItem('shopease_cart', JSON.stringify(cart));
    }
    
    function loadOrdersFromLocalStorage() {
      const savedOrders = localStorage.getItem('shopease_orders');
      if (savedOrders) {
        orders = JSON.parse(savedOrders);
      }
    }
    
    function saveOrdersToLocalStorage() {
      localStorage.setItem('shopease_orders', JSON.stringify(orders));
    }
    
    function loadProfileFromLocalStorage() {
      const savedProfile = localStorage.getItem('shopease_profile');
      if (savedProfile) {
        userProfile = JSON.parse(savedProfile);
      }
    }
    
    function saveProfileToLocalStorage() {
      localStorage.setItem('shopease_profile', JSON.stringify(userProfile));
    }
    
    // Initialize Admin Data
    function initAdminData() {
      // Add sample users (in a real app, this would come from a database)
      users = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '555-123-4567',
          address: '123 Main St',
          city: 'Anytown',
          state: 'ST',
          zip: '12345',
          totalOrders: 3,
          totalSpent: 249.97
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phone: '555-987-6543',
          address: '456 Oak Ave',
          city: 'Somewhere',
          state: 'ST',
          zip: '67890',
          totalOrders: 1,
          totalSpent: 79.99
        }
      ];
      
      // Add sample transactions
      transactions = [
        {
          id: 'TRX-123456',
          orderId: 'ORD-123456',
          date: new Date('2023-01-15'),
          customer: 'John Doe',
          method: 'Credit Card',
          amount: 129.99,
          status: 'successful'
        },
        {
          id: 'TRX-123457',
          orderId: 'ORD-123457',
          date: new Date('2023-01-20'),
          customer: 'Jane Smith',
          method: 'PayPal',
          amount: 79.99,
          status: 'successful'
        },
        {
          id: 'TRX-123458',
          orderId: 'ORD-123458',
          date: new Date('2023-01-25'),
          customer: 'John Doe',
          method: 'Credit Card',
          amount: 59.99,
          status: 'pending'
        }
      ];
      
      // Add stock levels to products
      products.forEach(product => {
        product.stock = Math.floor(Math.random() * 20); // Random stock between 0-19
      });
    }
    
    // Admin Login
    function handleAdminLogin(e) {
      e.preventDefault();
      
      const username = document.getElementById('admin-username').value;
      const password = document.getElementById('admin-password').value;
      
      // Simple authentication for demo purposes
      if (username === 'admin' && password === 'admin123') {
        isAdminLoggedIn = true;
        navigateTo('admin-dashboard-page');
        adminLoginError.classList.add('hidden');
        updateAdminDashboard();
      } else {
        adminLoginError.classList.remove('hidden');
      }
    }
    
    // Admin Logout
    function handleAdminLogout() {
      isAdminLoggedIn = false;
      navigateTo('products-page');
    }
    
    // Switch Admin Sections
    function switchAdminSection(sectionId, title) {
      // Hide all sections
      adminSections.forEach(section => {
        section.classList.add('hidden');
      });
      
      // Show requested section
      document.getElementById(sectionId).classList.remove('hidden');
      
      // Update section title
      adminSectionTitle.textContent = title;
      
      // Update active nav button
      adminNavBtns.forEach(btn => {
        btn.classList.remove('bg-indigo-900');
        btn.classList.add('hover:bg-indigo-700');
      });
      
      const activeBtn = document.getElementById(`${sectionId}-btn`);
      activeBtn.classList.add('bg-indigo-900');
      activeBtn.classList.remove('hover:bg-indigo-700');
    }
    
    // Update Admin Dashboard
    function updateAdminDashboard() {
      // Update summary counts
      document.getElementById('dashboard-order-count').textContent = orders.length;
      document.getElementById('dashboard-user-count').textContent = users.length;
      document.getElementById('dashboard-product-count').textContent = products.length;
      
      // Calculate total revenue
      const totalRevenue = orders.reduce((total, order) => total + order.total, 0);
      document.getElementById('dashboard-revenue').textContent = `$${totalRevenue.toFixed(2)}`;
      
      // Update recent orders table
      const recentOrdersTable = document.getElementById('dashboard-recent-orders');
      if (orders.length > 0) {
        recentOrdersTable.innerHTML = '';
        
        // Show only the 5 most recent orders
        const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
        
        recentOrders.forEach(order => {
          const row = document.createElement('tr');
          row.className = 'hover:bg-gray-50';
          row.innerHTML = `
            <td class="px-4 py-3 text-sm text-gray-900">${order.id}</td>
            <td class="px-4 py-3 text-sm text-gray-500">${formatDate(order.date)}</td>
            <td class="px-4 py-3 text-sm text-gray-900">${order.address.firstName} ${order.address.lastName}</td>
            <td class="px-4 py-3 text-sm text-gray-900">$${order.total.toFixed(2)}</td>
            <td class="px-4 py-3 text-sm">
              <span class="inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}">
                ${order.status}
              </span>
            </td>
          `;
          recentOrdersTable.appendChild(row);
        });
      } else {
        recentOrdersTable.innerHTML = `
          <tr>
            <td class="px-4 py-3 text-sm text-gray-500" colspan="5">No orders found</td>
          </tr>
        `;
      }
      
      // Update low stock products table
      const lowStockTable = document.getElementById('dashboard-low-stock');
      const lowStockProducts = products.filter(product => product.stock < 5);
      
      if (lowStockProducts.length > 0) {
        lowStockTable.innerHTML = '';
        
        lowStockProducts.forEach(product => {
          const row = document.createElement('tr');
          row.className = 'hover:bg-gray-50';
          
          let statusClass = 'bg-yellow-100 text-yellow-800';
          let statusText = 'Low Stock';
          
          if (product.stock === 0) {
            statusClass = 'bg-red-100 text-red-800';
            statusText = 'Out of Stock';
          }
          
          row.innerHTML = `
            <td class="px-4 py-3 text-sm text-gray-900 flex items-center">
              <div class="w-8 h-8 rounded overflow-hidden mr-2">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
              </div>
              ${product.name}
            </td>
            <td class="px-4 py-3 text-sm text-gray-900">${product.stock}</td>
            <td class="px-4 py-3 text-sm">
              <span class="inline-block px-2 py-1 rounded-full text-xs ${statusClass}">
                ${statusText}
              </span>
            </td>
          `;
          lowStockTable.appendChild(row);
        });
      } else {
        lowStockTable.innerHTML = `
          <tr>
            <td class="px-4 py-3 text-sm text-gray-500" colspan="3">No low stock products</td>
          </tr>
        `;
      }
    }
    
    // Render Admin Orders Table
    function renderAdminOrders() {
      const ordersTable = document.getElementById('admin-orders-table');
      const statusFilter = document.getElementById('order-status-filter').value;
      const searchTerm = document.getElementById('order-search').value.toLowerCase();
      
      let filteredOrders = [...orders];
      
      // Apply status filter
      if (statusFilter !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
      }
      
      // Apply search filter
      if (searchTerm) {
        filteredOrders = filteredOrders.filter(order => 
          order.id.toLowerCase().includes(searchTerm) || 
          `${order.address.firstName} ${order.address.lastName}`.toLowerCase().includes(searchTerm)
        );
      }
      
      if (filteredOrders.length > 0) {
        ordersTable.innerHTML = '';
        
        filteredOrders.forEach(order => {
          const row = document.createElement('tr');
          row.className = 'hover:bg-gray-50';
          
          // Count total items
          const totalItems = order.items.reduce((total, item) => total + item.quantity, 0);
          
          row.innerHTML = `
            <td class="px-4 py-3 text-sm text-gray-900">${order.id}</td>
            <td class="px-4 py-3 text-sm text-gray-500">${formatDate(order.date)}</td>
            <td class="px-4 py-3 text-sm text-gray-900">${order.address.firstName} ${order.address.lastName}</td>
            <td class="px-4 py-3 text-sm text-gray-500">${totalItems} item${totalItems !== 1 ? 's' : ''}</td>
            <td class="px-4 py-3 text-sm text-gray-900">$${order.total.toFixed(2)}</td>
            <td class="px-4 py-3 text-sm">
              <select class="order-status-select border rounded-md px-2 py-1 text-xs ${getStatusColor(order.status).replace('bg-', 'bg-opacity-25 bg-')}" data-order-id="${order.id}">
                <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
              </select>
            </td>
            <td class="px-4 py-3 text-sm">
              <button class="view-order-btn text-indigo-600 hover:text-indigo-800 mr-2" data-order-id="${order.id}">
                <i class="fas fa-eye"></i>
              </button>
              <button class="text-red-600 hover:text-red-800">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          `;
          ordersTable.appendChild(row);
          
          // Add event listeners
          const statusSelect = row.querySelector('.order-status-select');
          statusSelect.addEventListener('change', (e) => {
            updateOrderStatus(order.id, e.target.value);
          });
          
          const viewBtn = row.querySelector('.view-order-btn');
          viewBtn.addEventListener('click', () => {
            // View order details (show in modal or expand row)
            showToast(`Viewing details for order ${order.id}`, 'info');
          });
        });
        
      } else {
        ordersTable.innerHTML = `
          <tr>
            <td class="px-4 py-3 text-sm text-gray-500" colspan="7">No orders found</td>
          </tr>
        `;
      }
    }
    
    // Update Order Status
    function updateOrderStatus(orderId, newStatus) {
      const orderIndex = orders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        saveOrdersToLocalStorage();
        showToast(`Order ${orderId} status updated to ${newStatus}`, 'success');
        renderAdminOrders();
        updateAdminDashboard();
      }
    }
    
    // Render Admin Users Table
    function renderAdminUsers() {
      const usersTable = document.getElementById('admin-users-table');
      const searchTerm = document.getElementById('user-search').value.toLowerCase();
      
      let filteredUsers = [...users];
      
      // Apply search filter
      if (searchTerm) {
        filteredUsers = filteredUsers.filter(user => 
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm) || 
          user.email.toLowerCase().includes(searchTerm)
        );
      }
      
      if (filteredUsers.length > 0) {
        usersTable.innerHTML = '';
        
        filteredUsers.forEach(user => {
          const row = document.createElement('tr');
          row.className = 'hover:bg-gray-50';
          
          row.innerHTML = `
            <td class="px-4 py-3 text-sm text-gray-900">${user.firstName} ${user.lastName}</td>
            <td class="px-4 py-3 text-sm text-gray-500">${user.email}</td>
            <td class="px-4 py-3 text-sm text-gray-500">${user.city}, ${user.state}</td>
            <td class="px-4 py-3 text-sm text-gray-900">${user.totalOrders}</td>
            <td class="px-4 py-3 text-sm text-gray-900">$${user.totalSpent.toFixed(2)}</td>
            <td class="px-4 py-3 text-sm">
              <button class="view-user-btn text-indigo-600 hover:text-indigo-800 mr-2" data-user-id="${user.id}">
                <i class="fas fa-eye"></i>
              </button>
              <button class="text-red-600 hover:text-red-800">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          `;
          usersTable.appendChild(row);
          
          // Add event listeners
          const viewBtn = row.querySelector('.view-user-btn');
          viewBtn.addEventListener('click', () => {
            // View user details (show in modal or expand row)
            showToast(`Viewing details for user ${user.firstName} ${user.lastName}`, 'info');
          });
        });
        
      } else {
        usersTable.innerHTML = `
          <tr>
            <td class="px-4 py-3 text-sm text-gray-500" colspan="6">No users found</td>
          </tr>
        `;
      }
    }
    
    // Render Admin Inventory Table
    function renderAdminInventory() {
      const inventoryTable = document.getElementById('admin-inventory-table');
      const inventoryFilter = document.getElementById('inventory-filter').value;
      const searchTerm = document.getElementById('inventory-search').value.toLowerCase();
      
      let filteredProducts = [...products];
      
      // Apply inventory filter
      if (inventoryFilter === 'low') {
        filteredProducts = filteredProducts.filter(product => product.stock > 0 && product.stock < 5);
      } else if (inventoryFilter === 'out') {
        filteredProducts = filteredProducts.filter(product => product.stock === 0);
      }
      
      // Apply search filter
      if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(searchTerm) || 
          product.description.toLowerCase().includes(searchTerm)
        );
      }
      
      if (filteredProducts.length > 0) {
        inventoryTable.innerHTML = '';
        
        filteredProducts.forEach(product => {
          const row = document.createElement('tr');
          row.className = 'hover:bg-gray-50';
          
          let statusClass = 'bg-green-100 text-green-800';
          let statusText = 'In Stock';
          
          if (product.stock === 0) {
            statusClass = 'bg-red-100 text-red-800';
            statusText = 'Out of Stock';
          } else if (product.stock < 5) {
            statusClass = 'bg-yellow-100 text-yellow-800';
            statusText = 'Low Stock';
          }
          
          row.innerHTML = `
            <td class="px-4 py-3 text-sm text-gray-900 flex items-center">
              <div class="w-10 h-10 rounded overflow-hidden mr-2">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
              </div>
              ${product.name}
            </td>
            <td class="px-4 py-3 text-sm text-gray-500">#${product.id}</td>
            <td class="px-4 py-3 text-sm text-gray-900">$${product.price.toFixed(2)}</td>
            <td class="px-4 py-3 text-sm">
              <input type="number" class="stock-input border rounded-md w-16 px-2 py-1" 
                value="${product.stock}" min="0" data-product-id="${product.id}">
            </td>
            <td class="px-4 py-3 text-sm">
              <span class="inline-block px-2 py-1 rounded-full text-xs ${statusClass}">
                ${statusText}
              </span>
            </td>
            <td class="px-4 py-3 text-sm">
              <button class="edit-product-btn text-indigo-600 hover:text-indigo-800 mr-2" data-product-id="${product.id}">
                <i class="fas fa-edit"></i>
              </button>
              <button class="text-red-600 hover:text-red-800">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          `;
          inventoryTable.appendChild(row);
          
          // Add event listeners
          const stockInput = row.querySelector('.stock-input');
          stockInput.addEventListener('change', (e) => {
            updateProductStock(product.id, parseInt(e.target.value));
          });
          
          const editBtn = row.querySelector('.edit-product-btn');
          editBtn.addEventListener('click', () => {
            // Edit product details (show in modal)
            showToast(`Editing product: ${product.name}`, 'info');
          });
        });
        
        // Add event listeners for stock input changes
        document.querySelectorAll('.stock-input').forEach(input => {
          input.addEventListener('change', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            const newStock = parseInt(e.target.value);
            updateProductStock(productId, newStock);
          });
        });
        
      } else {
        inventoryTable.innerHTML = `
          <tr>
            <td class="px-4 py-3 text-sm text-gray-500" colspan="6">No products found</td>
          </tr>
        `;
      }
    }
    
    // Update Product Stock
    function updateProductStock(productId, newStock) {
      const productIndex = products.findIndex(product => product.id === productId);
      if (productIndex !== -1) {
        products[productIndex].stock = newStock;
        showToast(`Stock updated for product #${productId}`, 'success');
        renderAdminInventory();
        updateAdminDashboard();
      }
    }
    
    // Render Admin Payments Table
    function renderAdminPayments() {
      const paymentsTable = document.getElementById('admin-payments-table');
      const statusFilter = document.getElementById('payment-status-filter').value;
      const searchTerm = document.getElementById('payment-search').value.toLowerCase();
      
      let filteredTransactions = [...transactions];
      
      // Apply status filter
      if (statusFilter !== 'all') {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.status === statusFilter);
      }
      
      // Apply search filter
      if (searchTerm) {
        filteredTransactions = filteredTransactions.filter(transaction => 
          transaction.id.toLowerCase().includes(searchTerm) || 
          transaction.orderId.toLowerCase().includes(searchTerm) ||
          transaction.customer.toLowerCase().includes(searchTerm)
        );
      }
      
      if (filteredTransactions.length > 0) {
        paymentsTable.innerHTML = '';
        
        filteredTransactions.forEach(transaction => {
          const row = document.createElement('tr');
          row.className = 'hover:bg-gray-50';
          
          let statusClass;
          switch (transaction.status) {
            case 'successful':
              statusClass = 'bg-green-100 text-green-800';
              break;
            case 'pending':
              statusClass = 'bg-yellow-100 text-yellow-800';
              break;
            case 'failed':
              statusClass = 'bg-red-100 text-red-800';
              break;
            default:
              statusClass = 'bg-gray-100 text-gray-800';
          }
          
          row.innerHTML = `
            <td class="px-4 py-3 text-sm text-gray-900">${transaction.id}</td>
            <td class="px-4 py-3 text-sm text-gray-900">${transaction.orderId}</td>
            <td class="px-4 py-3 text-sm text-gray-500">${formatDate(transaction.date)}</td>
            <td class="px-4 py-3 text-sm text-gray-900">${transaction.customer}</td>
            <td class="px-4 py-3 text-sm text-gray-500">${transaction.method}</td>
            <td class="px-4 py-3 text-sm text-gray-900">$${transaction.amount.toFixed(2)}</td>
            <td class="px-4 py-3 text-sm">
              <span class="inline-block px-2 py-1 rounded-full text-xs ${statusClass}">
                ${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </span>
            </td>
          `;
          paymentsTable.appendChild(row);
        });
        
      } else {
        paymentsTable.innerHTML = `
          <tr>
            <td class="px-4 py-3 text-sm text-gray-500" colspan="7">No transactions found</td>
          </tr>
        `;
      }
    }
    
    // Initialize the Application
    function initApp() {
      // Load data from localStorage
      loadCartFromLocalStorage();
      loadOrdersFromLocalStorage();
      loadProfileFromLocalStorage();
      
      // Fetch products
      fetchProducts();
      
      // Initialize admin data
      initAdminData();
      
      // Add event listeners
      cartBtn.addEventListener('click', toggleCart);
      closeCartBtn.addEventListener('click', toggleCart);
      overlay.addEventListener('click', toggleCart);
      
      checkoutBtn.addEventListener('click', goToCheckout);
      backToCartBtn.addEventListener('click', () => {
        navigateTo('products-page');
        toggleCart();
      });
      
      placeOrderBtn.addEventListener('click', placeOrder);
      continueShoppingBtn.addEventListener('click', () => {
        navigateTo('products-page');
      });
      
      profileBtn.addEventListener('click', () => {
        navigateTo('profile-page');
        loadProfileData();
        renderOrders();
      });
      
      backToShopBtn.addEventListener('click', () => {
        navigateTo('products-page');
      });
      
      // Profile tab navigation
      profileTabBtn.addEventListener('click', () => showProfileTab('profile-tab'));
      ordersTabBtn.addEventListener('click', () => {
        showProfileTab('orders-tab');
        renderOrders();
      });
      settingsTabBtn.addEventListener('click', () => showProfileTab('settings-tab'));
      
      // Profile form submission
      const profileForm = document.getElementById('profile-form');
      if (profileForm) {
        profileForm.addEventListener('submit', saveProfileData);
      }
      
      // Clear data button
      clearDataBtn.addEventListener('click', clearAllData);
      
      // Logo click
      logoBtn.addEventListener('click', () => {
        navigateTo('products-page');
      });
      
      // Delivery option change
      const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
      deliveryOptions.forEach(option => {
        option.addEventListener('change', updateCart);
      });
      
      // Admin event listeners
      adminLoginBtn.addEventListener('click', () => {
        navigateTo('admin-login-page');
      });
      
      backToStoreBtn.addEventListener('click', () => {
        navigateTo('products-page');
      });
      
      adminLoginForm.addEventListener('submit', handleAdminLogin);
      adminLogoutBtn.addEventListener('click', handleAdminLogout);
      
      // Admin dashboard navigation
      dashboardBtn.addEventListener('click', () => {
        switchAdminSection('admin-dashboard-section', 'Dashboard Overview');
        updateAdminDashboard();
      });
      
      ordersBtn.addEventListener('click', () => {
        switchAdminSection('admin-orders-section', 'Orders Management');
        renderAdminOrders();
      });
      
      usersBtn.addEventListener('click', () => {
        switchAdminSection('admin-users-section', 'User Management');
        renderAdminUsers();
      });
      
      inventoryBtn.addEventListener('click', () => {
        switchAdminSection('admin-inventory-section', 'Inventory Management');
        renderAdminInventory();
      });
      
      paymentsBtn.addEventListener('click', () => {
        switchAdminSection('admin-payments-section', 'Payment Transactions');
        renderAdminPayments();
      });
      
      // Filter and search event listeners for admin tables
      document.getElementById('order-status-filter').addEventListener('change', renderAdminOrders);
      document.getElementById('order-search').addEventListener('input', renderAdminOrders);
      document.getElementById('user-search').addEventListener('input', renderAdminUsers);
      document.getElementById('inventory-filter').addEventListener('change', renderAdminInventory);
      document.getElementById('inventory-search').addEventListener('input', renderAdminInventory);
      document.getElementById('payment-status-filter').addEventListener('change', renderAdminPayments);
      document.getElementById('payment-search').addEventListener('input', renderAdminPayments);
      
      // Add Product button
      document.getElementById('add-product-btn').addEventListener('click', () => {
        showToast('Add product functionality would open a modal form here', 'info');
      });
    }
    
    // Initialize the app when the DOM is loaded
    document.addEventListener('DOMContentLoaded', initApp);
  </script>
</body>
</html>
