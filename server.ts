import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { readDB, writeDB, initDB } from './server/db';
import { Order, OrderStatus, MenuItem, Category, Table, Restaurant, Coupon, Review, User } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Local Disk-Persisted JSON Database
initDB();

// ----------------------------------------------------
// Authentication API (Polished Role Fallback)
// ----------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (user) {
    // In our simplified mock auth, any password works for the preseeded accounts
    res.json({
      success: true,
      user
    });
  } else {
    // Create new customer account on the fly if not exists
    const newUser: User = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      email: email,
      role: 'customer',
      name: email.split('@')[0],
      createdAt: new Date().toISOString()
    };
    db.users.push(newUser);
    writeDB(db);
    res.json({
      success: true,
      user: newUser
    });
  }
});

// ----------------------------------------------------
// Restaurant APIs
// ----------------------------------------------------
app.get('/api/restaurants', (req, res) => {
  const db = readDB();
  res.json(db.restaurants);
});

app.get('/api/restaurants/:idOrSlug', (req, res) => {
  const { idOrSlug } = req.params;
  const db = readDB();
  const restaurant = db.restaurants.find(
    r => r.id === idOrSlug || r.slug.toLowerCase() === idOrSlug.toLowerCase()
  );

  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }
  res.json(restaurant);
});

app.put('/api/restaurants/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const index = db.restaurants.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }

  db.restaurants[index] = {
    ...db.restaurants[index],
    ...req.body,
    id // Safety block
  };

  writeDB(db);
  res.json(db.restaurants[index]);
});

app.post('/api/restaurants', (req, res) => {
  const db = readDB();
  const newRest: Restaurant = {
    id: 'rest_' + Math.random().toString(36).substr(2, 9),
    name: req.body.name || 'New Restaurant',
    nameFa: req.body.nameFa || 'رستوران جدید',
    slug: (req.body.name || 'new').toLowerCase().replace(/[^a-z0-9]/g, ''),
    description: req.body.description || 'Quality meals and premium experience.',
    descriptionFa: req.body.descriptionFa || 'غذاهای باکیفیت و تجربه عالی.',
    logo: req.body.logo || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&h=150&q=80',
    banner: req.body.banner || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&h=400&q=80',
    primaryColor: req.body.primaryColor || '#EF4444',
    accentColor: req.body.accentColor || '#F59E0B',
    address: req.body.address || '123 Main St',
    addressFa: req.body.addressFa || 'خیابان اصلی پلاک ۱۲۳',
    phone: req.body.phone || '021-12345678',
    workingHours: req.body.workingHours || '12:00 PM - 11:00 PM',
    workingHoursFa: req.body.workingHoursFa || '۱۲ ظهر تا ۱۱ شب',
    subscriptionStatus: 'active',
    subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    loyaltyConfig: {
      pointsPerDollar: 10,
      pointsThresholdForDiscount: 500,
      discountValue: 10
    },
    qrScansCount: 0
  };

  db.restaurants.push(newRest);
  writeDB(db);
  res.status(201).json(newRest);
});

// Increment QR Scans count
app.post('/api/restaurants/:id/scan', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const rest = db.restaurants.find(r => r.id === id);
  if (rest) {
    rest.qrScansCount = (rest.qrScansCount || 0) + 1;
    writeDB(db);
    return res.json({ success: true, count: rest.qrScansCount });
  }
  res.status(404).json({ error: 'Restaurant not found' });
});

// ----------------------------------------------------
// Menu Category APIs
// ----------------------------------------------------
app.get('/api/restaurants/:restaurantId/categories', (req, res) => {
  const { restaurantId } = req.params;
  const db = readDB();
  const categories = db.categories
    .filter(c => c.restaurantId === restaurantId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  res.json(categories);
});

app.post('/api/categories', (req, res) => {
  const db = readDB();
  const { restaurantId, name, nameFa, icon } = req.body;

  const newCat: Category = {
    id: 'cat_' + Math.random().toString(36).substr(2, 9),
    restaurantId,
    name,
    nameFa,
    icon: icon || 'Flame',
    sortOrder: db.categories.filter(c => c.restaurantId === restaurantId).length + 1
  };

  db.categories.push(newCat);
  writeDB(db);
  res.status(201).json(newCat);
});

app.put('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const index = db.categories.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Category not found' });
  }

  db.categories[index] = {
    ...db.categories[index],
    ...req.body,
    id
  };

  writeDB(db);
  res.json(db.categories[index]);
});

app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  db.categories = db.categories.filter(c => c.id !== id);
  // Also clean up or unassign menu items? Better to keep them or reassign
  writeDB(db);
  res.json({ success: true });
});

// ----------------------------------------------------
// Menu Items APIs
// ----------------------------------------------------
app.get('/api/restaurants/:restaurantId/items', (req, res) => {
  const { restaurantId } = req.params;
  const db = readDB();
  const items = db.menuItems.filter(item => item.restaurantId === restaurantId);
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const db = readDB();
  const newItem: MenuItem = {
    id: 'item_' + Math.random().toString(36).substr(2, 9),
    restaurantId: req.body.restaurantId,
    categoryId: req.body.categoryId,
    name: req.body.name,
    nameFa: req.body.nameFa,
    description: req.body.description || '',
    descriptionFa: req.body.descriptionFa || '',
    price: parseFloat(req.body.price),
    discountPrice: req.body.discountPrice ? parseFloat(req.body.discountPrice) : undefined,
    image: req.body.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&h=250&q=80',
    isAvailable: req.body.isAvailable !== undefined ? req.body.isAvailable : true,
    prepTimeMinutes: parseInt(req.body.prepTimeMinutes) || 15,
    calories: req.body.calories ? parseInt(req.body.calories) : undefined,
    isVegetarian: !!req.body.isVegetarian,
    isSpicy: !!req.body.isSpicy,
    ratingsCount: 0,
    averageRating: 5.0
  };

  db.menuItems.push(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const index = db.menuItems.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  db.menuItems[index] = {
    ...db.menuItems[index],
    ...req.body,
    price: req.body.price ? parseFloat(req.body.price) : db.menuItems[index].price,
    discountPrice: req.body.discountPrice !== undefined ? (req.body.discountPrice ? parseFloat(req.body.discountPrice) : undefined) : db.menuItems[index].discountPrice,
    id
  };

  writeDB(db);
  res.json(db.menuItems[index]);
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  db.menuItems = db.menuItems.filter(item => item.id !== id);
  writeDB(db);
  res.json({ success: true });
});

// ----------------------------------------------------
// Table & QR Management APIs
// ----------------------------------------------------
app.get('/api/restaurants/:restaurantId/tables', (req, res) => {
  const { restaurantId } = req.params;
  const db = readDB();
  const tables = db.tables.filter(t => t.restaurantId === restaurantId);
  res.json(tables);
});

app.post('/api/tables', (req, res) => {
  const db = readDB();
  const { restaurantId, tableNumber } = req.body;

  const rest = db.restaurants.find(r => r.id === restaurantId);
  const slug = rest ? rest.slug : 'restaurant';

  const newTable: Table = {
    id: 'tab_' + Math.random().toString(36).substr(2, 9),
    restaurantId,
    tableNumber,
    status: 'empty',
    qrUrl: `/r/${slug}?table=${tableNumber}`
  };

  db.tables.push(newTable);
  writeDB(db);
  res.status(201).json(newTable);
});

app.delete('/api/tables/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  db.tables = db.tables.filter(t => t.id !== id);
  writeDB(db);
  res.json({ success: true });
});

// ----------------------------------------------------
// Order Processing APIs
// ----------------------------------------------------
app.get('/api/restaurants/:restaurantId/orders', (req, res) => {
  const { restaurantId } = req.params;
  const db = readDB();
  const orders = db.orders.filter(o => o.restaurantId === restaurantId);
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const db = readDB();
  const {
    restaurantId,
    tableNumber,
    customerName,
    customerPhone,
    deliveryAddress,
    items,
    type,
    orderNotes,
    couponCode,
    pointsUsed
  } = req.body;

  // Calculate prices
  let subtotal = 0;
  items.forEach((item: any) => {
    subtotal += item.price * item.quantity;
  });

  // Verify and apply Coupon if provided
  let discount = 0;
  if (couponCode) {
    const coupon = db.coupons.find(
      c => c.restaurantId === restaurantId && c.code.toUpperCase() === couponCode.toUpperCase() && c.isActive
    );
    if (coupon && subtotal >= coupon.minOrderValue) {
      discount = (subtotal * coupon.discountPercent) / 100;
    }
  }

  // Handle Loyalty Points discount
  const rest = db.restaurants.find(r => r.id === restaurantId);
  if (pointsUsed && rest) {
    const pointsConfig = rest.loyaltyConfig;
    const setsOfPoints = Math.floor(pointsUsed / pointsConfig.pointsThresholdForDiscount);
    discount += setsOfPoints * pointsConfig.discountValue;
  }

  const total = Math.max(0, subtotal - discount);
  const pointsEarned = rest ? Math.floor(total * (rest.loyaltyConfig.pointsPerDollar || 10)) : 0;

  // Find Table ID if Dine In
  let tableId: string | undefined;
  if (type === 'dine_in' && tableNumber) {
    const table = db.tables.find(t => t.restaurantId === restaurantId && t.tableNumber === tableNumber);
    if (table) {
      tableId = table.id;
      table.status = 'occupied';
    }
  }

  const newOrder: Order = {
    id: 'ord_' + Math.random().toString(36).substr(2, 9),
    restaurantId,
    tableId,
    tableNumber,
    customerName,
    customerPhone,
    deliveryAddress,
    items,
    type,
    status: 'pending',
    orderNotes,
    subtotal,
    discount,
    total,
    pointsEarned,
    pointsUsed,
    couponApplied: couponCode,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.orders.push(newOrder);
  writeDB(db);

  res.status(201).json(newOrder);
});

app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const order = db.orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

app.put('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body as { status: OrderStatus };
  const db = readDB();

  const orderIndex = db.orders.findIndex(o => o.id === id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  db.orders[orderIndex].status = status;
  db.orders[orderIndex].updatedAt = new Date().toISOString();

  // If completed or cancelled, free up table
  if ((status === 'completed' || status === 'cancelled') && db.orders[orderIndex].tableId) {
    const table = db.tables.find(t => t.id === db.orders[orderIndex].tableId);
    if (table) {
      table.status = status === 'completed' ? 'needs_cleaning' : 'empty';
    }
  }

  writeDB(db);
  res.json(db.orders[orderIndex]);
});

// ----------------------------------------------------
// Review & Loyalty Points APIs
// ----------------------------------------------------
app.get('/api/restaurants/:restaurantId/reviews', (req, res) => {
  const { restaurantId } = req.params;
  const db = readDB();
  const reviews = db.reviews.filter(r => r.restaurantId === restaurantId);
  res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
  const db = readDB();
  const { restaurantId, menuItemId, customerName, rating, comment } = req.body;

  const newReview: Review = {
    id: 'rev_' + Math.random().toString(36).substr(2, 9),
    restaurantId,
    menuItemId,
    customerName: customerName || 'Anonymous',
    rating: parseInt(rating) || 5,
    comment: comment || '',
    createdAt: new Date().toISOString()
  };

  db.reviews.push(newReview);

  // Update item averages if rating an item
  if (menuItemId) {
    const item = db.menuItems.find(i => i.id === menuItemId);
    if (item) {
      const itemReviews = db.reviews.filter(r => r.menuItemId === menuItemId);
      const totalRating = itemReviews.reduce((sum, r) => sum + r.rating, 0);
      item.ratingsCount = itemReviews.length;
      item.averageRating = Math.round((totalRating / itemReviews.length) * 10) / 10;
    }
  }

  writeDB(db);
  res.status(201).json(newReview);
});

// Check Coupon
app.post('/api/coupons/validate', (req, res) => {
  const { restaurantId, code, subtotal } = req.body;
  const db = readDB();
  const coupon = db.coupons.find(
    c => c.restaurantId === restaurantId && c.code.toUpperCase() === code.toUpperCase() && c.isActive
  );

  if (!coupon) {
    return res.json({ valid: false, message: 'Invalid or inactive coupon' });
  }

  if (subtotal < coupon.minOrderValue) {
    return res.json({
      valid: false,
      message: `Minimum order value for this coupon is $${coupon.minOrderValue.toFixed(2)}`
    });
  }

  if (new Date(coupon.expiresAt) < new Date()) {
    return res.json({ valid: false, message: 'Coupon expired' });
  }

  res.json({
    valid: true,
    coupon
  });
});

// Get all coupons for restaurant
app.get('/api/restaurants/:restaurantId/coupons', (req, res) => {
  const { restaurantId } = req.params;
  const db = readDB();
  res.json(db.coupons.filter(c => c.restaurantId === restaurantId));
});

// Create coupon
app.post('/api/coupons', (req, res) => {
  const db = readDB();
  const { restaurantId, code, discountPercent, minOrderValue, expiresAt } = req.body;

  const newCoupon: Coupon = {
    id: 'cp_' + Math.random().toString(36).substr(2, 9),
    restaurantId,
    code: code.toUpperCase(),
    discountPercent: parseInt(discountPercent) || 10,
    minOrderValue: parseFloat(minOrderValue) || 0,
    expiresAt: expiresAt || '2026-12-31',
    isActive: true
  };

  db.coupons.push(newCoupon);
  writeDB(db);
  res.status(201).json(newCoupon);
});

// ----------------------------------------------------
// Super Admin Analytics Dashboard APIs
// ----------------------------------------------------
app.get('/api/superadmin/stats', (req, res) => {
  const db = readDB();
  const totalRestaurants = db.restaurants.length;
  const activeSubs = db.restaurants.filter(r => r.subscriptionStatus === 'active').length;
  const totalOrdersCount = db.orders.length;
  const totalRevenue = db.orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0);

  // Daily order/revenue trend chart data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const chartData = last7Days.map(date => {
    const dayOrders = db.orders.filter(o => o.createdAt.startsWith(date));
    const revenue = dayOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0);
    return {
      date,
      orders: dayOrders.length,
      revenue: Math.round(revenue * 100) / 100
    };
  });

  res.json({
    totalRestaurants,
    activeSubs,
    totalOrdersCount,
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    chartData
  });
});

// ----------------------------------------------------
// Server Boot and Vite Integration Middleware
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[QuickMenu SaaS] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
