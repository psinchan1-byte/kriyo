import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { mockCrafts } from '../src/data/mock/crafts';
import { mockArtisans } from '../src/data/mock/artisans';
import { mockProducts } from '../src/data/mock/products';
import { mockSalesAnalytics, mockOrders } from '../src/data/mock/sales';

dotenv.config({ path: '.env.local' });

// It is recommended to use SUPABASE_SERVICE_ROLE_KEY here since this is a server script
// and RLS policies may block inserts from the anon key.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

function getUUID(id: string) {
  const parts = id.split('-');
  const prefix = parts[0];
  const index = parseInt(parts[1], 10);
  const map: Record<string, string> = {
    'cr': '00000000-0000-0000-0000-',
    'art': '00000000-0000-0000-0001-',
    'prod': '00000000-0000-0000-0002-',
    'buyer': '00000000-0000-0000-0003-',
    'ord': '00000000-0000-0000-0004-',
  };
  return (map[prefix] || '00000000-0000-0000-9999-') + index.toString().padStart(12, '0');
}

// Map mock region names to their region UUIDs from DB
const REGION_MAP: Record<string, string> = {};

async function seed() {
  console.log('Starting seed process...');

  // 1. Get regions from DB
  let { data: regions, error: regionErr } = await supabase.from('regions').select('id, name');
  if (regionErr || !regions || regions.length === 0) {
    console.log('Regions not found. Seeding regions...');
    const regionNames = ['Northern', 'Western', 'Central', 'Eastern', 'Southern', 'North-Eastern'];
    for (let i = 0; i < regionNames.length; i++) {
        await supabase.from('regions').upsert({ id: getUUID('reg-' + i), name: regionNames[i], description: regionNames[i] });
    }
    const result = await supabase.from('regions').select('id, name');
    regions = result.data;
  }
  regions?.forEach((r: any) => {
    REGION_MAP[r.name] = r.id;
  });

  // 2. Seed Crafts
  console.log('Seeding crafts...');
  for (const craft of mockCrafts) {
    let regionId = null;
    // Basic mapping for regions based on mock data region strings
    if (craft.region.includes('Mithila')) regionId = REGION_MAP['Eastern'];
    if (craft.region.includes('Bastar')) regionId = REGION_MAP['Central'];
    if (craft.region.includes('Srinagar')) regionId = REGION_MAP['Northern'];
    if (craft.region.includes('Nilgiris')) regionId = REGION_MAP['Southern'];

    const { error } = await supabase.from('crafts').upsert({
      id: getUUID(craft.id),
      name: craft.name,
      category: craft.category,
      description: craft.description,
      state: craft.state,
      region_id: regionId,
      gi_tagged: craft.heritage.giTagged,
      gi_number: craft.heritage.giRegistrationNumber,
      heritage_status: craft.healthStatus, // Mapping healthStatus to heritage_status here for simplicity
      health_status: craft.healthStatus,
    });
    if (error) console.error('Craft error:', error);
  }

  // 3. Seed Artisans
  console.log('Seeding artisans...');
  for (const artisan of mockArtisans) {
    const { error } = await supabase.from('artisans').upsert({
      id: getUUID(artisan.id),
      full_name: artisan.name,
      phone: artisan.phone,
      email: artisan.email,
      state: artisan.location.state,
      district: artisan.location.district,
      city: artisan.location.village,
      pincode: artisan.location.pinCode,
      primary_craft_id: getUUID(artisan.primaryCraftId),
      years_of_experience: artisan.yearsOfExperience,
      verification_status: artisan.verified ? 'Verified' : 'Pending',
      bio: artisan.bio,
    });
    if (error) console.error('Artisan error:', error);
  }

  // 4. Seed Products
  console.log('Seeding products...');
  for (const product of mockProducts) {
    const { error } = await supabase.from('products').upsert({
      id: getUUID(product.id),
      artisan_id: getUUID(product.artisanId),
      craft_id: getUUID(product.craftId),
      title: product.title,
      category: product.category,
      price: product.price,
      stock_quantity: product.stock,
      materials: product.provenance.rawMaterials,
      crafting_days: product.provenance.handcraftingDurationDays,
      views: product.engagement.views,
      likes: product.engagement.likes,
      bookmarks: product.engagement.saves,
    });
    if (error) console.error('Product error:', error);
  }

  // 5. Seed Buyers
  console.log('Seeding buyers...');
  const buyers = [
    { id: getUUID('buyer-1'), name: 'Aarav Sharma', city: 'Bengaluru', state: 'Karnataka' },
    { id: getUUID('buyer-2'), name: 'Meera Nair', city: 'Mumbai', state: 'Maharashtra' }
  ];
  for (const buyer of buyers) {
    const { error } = await supabase.from('buyers').upsert({
      id: buyer.id,
      name: buyer.name,
      city: buyer.city,
      state: buyer.state,
    });
    if (error) console.error('Buyer error:', error);
  }

  // 6. Seed Orders
  console.log('Seeding orders...');
  for (const order of mockOrders) {
    let buyerId = getUUID('buyer-1');
    if (order.customerName === 'Meera Nair') buyerId = getUUID('buyer-2');

    const item = order.items[0]; // mock only has 1 item per order
    const { error } = await supabase.from('orders').upsert({
      id: getUUID(order.id),
      buyer_id: buyerId,
      artisan_id: getUUID(item.artisanId),
      product_id: getUUID(item.productId),
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_amount: order.totalAmount,
      order_status: order.status,
    });
    if (error) console.error('Order error:', error);
  }

  console.log('Seeding dashboard snapshot for sales...');
  const { error: dashError } = await supabase.from('dashboard_snapshots').upsert({
    id: '00000000-0000-0000-0005-000000000001',
    snapshot_date: new Date().toISOString().split('T')[0],
    total_artisans: mockArtisans.length,
    active_crafts: mockCrafts.length,
    total_products: mockProducts.length,
    total_orders: mockSalesAnalytics.totalOrders,
    total_revenue: mockSalesAnalytics.grossRevenue,
  });
  if (dashError) console.error('Dashboard snapshot error:', dashError);

  console.log('Seed completed!');
}

seed().catch(console.error);
