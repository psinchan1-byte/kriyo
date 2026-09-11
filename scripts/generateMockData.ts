import fs from 'fs';
import path from 'path';

const outDir = path.join(__dirname, '../src/data/mock');

const REGIONS = ['Northern', 'Western', 'Central', 'Eastern', 'Southern', 'North-Eastern'];
const STATES_MAP: Record<string, string[]> = {
  'Northern': ['Jammu & Kashmir', 'Punjab', 'Haryana', 'Himachal Pradesh', 'Uttarakhand', 'Uttar Pradesh'],
  'Western': ['Gujarat', 'Rajasthan', 'Maharashtra', 'Goa'],
  'Central': ['Madhya Pradesh', 'Chhattisgarh'],
  'Eastern': ['Bihar', 'West Bengal', 'Odisha', 'Jharkhand'],
  'Southern': ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'],
  'North-Eastern': ['Assam', 'Meghalaya', 'Manipur', 'Tripura', 'Nagaland', 'Mizoram', 'Arunachal Pradesh', 'Sikkim']
};

const CRAFT_TEMPLATES = [
  { name: 'Madhubani Painting', cat: 'Painting', state: 'Bihar', reg: 'Eastern', gi: true },
  { name: 'Pattachitra', cat: 'Painting', state: 'Odisha', reg: 'Eastern', gi: true },
  { name: 'Dhokra', cat: 'Metalwork', state: 'Chhattisgarh', reg: 'Central', gi: true },
  { name: 'Kashmiri Pashmina', cat: 'Textiles', state: 'Jammu & Kashmir', reg: 'Northern', gi: true },
  { name: 'Channapatna Toys', cat: 'Woodwork', state: 'Karnataka', reg: 'Southern', gi: true },
  { name: 'Kanchipuram Silk', cat: 'Textiles', state: 'Tamil Nadu', reg: 'Southern', gi: true },
  { name: 'Banarasi Brocade', cat: 'Textiles', state: 'Uttar Pradesh', reg: 'Northern', gi: true },
  { name: 'Blue Pottery', cat: 'Ceramics', state: 'Rajasthan', reg: 'Western', gi: true },
  { name: 'Phulkari', cat: 'Embroidery', state: 'Punjab', reg: 'Northern', gi: true },
  { name: 'Kutch Embroidery', cat: 'Embroidery', state: 'Gujarat', reg: 'Western', gi: true },
  { name: 'Warli Painting', cat: 'Painting', state: 'Maharashtra', reg: 'Western', gi: false },
  { name: 'Tanjore Painting', cat: 'Painting', state: 'Tamil Nadu', reg: 'Southern', gi: true },
  { name: 'Kalamkari', cat: 'Textiles', state: 'Andhra Pradesh', reg: 'Southern', gi: true },
  { name: 'Sikki Grass Craft', cat: 'Natural Fibers', state: 'Bihar', reg: 'Eastern', gi: true },
  { name: 'Toda Embroidery', cat: 'Embroidery', state: 'Tamil Nadu', reg: 'Southern', gi: true },
  { name: 'Bastar Dhokra', cat: 'Metalwork', state: 'Chhattisgarh', reg: 'Central', gi: true },
  { name: 'Bidriware', cat: 'Metalwork', state: 'Karnataka', reg: 'Southern', gi: true },
  { name: 'Chikankari', cat: 'Embroidery', state: 'Uttar Pradesh', reg: 'Northern', gi: true },
  { name: 'Patola', cat: 'Textiles', state: 'Gujarat', reg: 'Western', gi: true },
  { name: 'Sambalpuri Ikat', cat: 'Textiles', state: 'Odisha', reg: 'Eastern', gi: true },
  { name: 'Rogan Art', cat: 'Painting', state: 'Gujarat', reg: 'Western', gi: false },
  { name: 'Sujani Embroidery', cat: 'Embroidery', state: 'Bihar', reg: 'Eastern', gi: true },
  { name: 'Aranmula Kannadi', cat: 'Metalwork', state: 'Kerala', reg: 'Southern', gi: true },
  { name: 'Thanjavur Art', cat: 'Painting', state: 'Tamil Nadu', reg: 'Southern', gi: true },
  { name: 'Pochampally Ikat', cat: 'Textiles', state: 'Telangana', reg: 'Southern', gi: true },
  { name: 'Mysore Silk', cat: 'Textiles', state: 'Karnataka', reg: 'Southern', gi: true },
  { name: 'Kullu Shawls', cat: 'Textiles', state: 'Himachal Pradesh', reg: 'Northern', gi: true },
  { name: 'Muga Silk', cat: 'Textiles', state: 'Assam', reg: 'North-Eastern', gi: true },
  { name: 'Longpi Pottery', cat: 'Ceramics', state: 'Manipur', reg: 'North-Eastern', gi: false },
  { name: 'Bamboo Craft', cat: 'Woodwork', state: 'Tripura', reg: 'North-Eastern', gi: false }
];

const NAMES = [
  'Shanti Devi Jha', 'Laxman Baghel', 'Syed Ghulam Rasool', 'Lakshmi Devi', 'Ramesh Kumar', 'Meera Bai',
  'Abdul Kalam', 'Radha Krishna', 'Sita Ram', 'Parvati Bai', 'Suresh Chandra', 'Gita Devi',
  'Anand Sharma', 'Kamala Das', 'Bhagirathi', 'Govind Rao', 'Tulsi Ram', 'Kavita Reddy',
  'Mohammad Yusuf', 'Priya Patel', 'Narayana Swamy', 'Anita Desai', 'Kishore Das', 'Malti Devi', 'Ravi Varma'
];

// Seed random
let seedVal = 1;
function random() {
    const x = Math.sin(seedVal++) * 10000;
    return x - Math.floor(x);
}
function randInt(min: number, max: number) {
    return Math.floor(random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]): T {
    return arr[randInt(0, arr.length - 1)];
}

const crafts: any[] = [];
CRAFT_TEMPLATES.forEach((c, i) => {
  const isHealthy = random() > 0.3;
  const isVulnerable = random() > 0.8;
  const healthStatus = isVulnerable ? 'Vulnerable' : (isHealthy ? 'Stable' : 'Endangered');
  
  crafts.push({
    id: `cr-${i + 1}`,
    name: c.name,
    category: c.cat,
    state: c.state,
    region: c.reg,
    healthStatus,
    description: `Traditional ${c.name} originating from ${c.state}. Known for intricate designs and rich heritage.`,
    metrics: {
      views: randInt(1000, 5000),
      saves: randInt(100, 1000),
      demandGrowthPercent: randInt(5, 45)
    },
    heritage: {
      giTagged: c.gi,
      giRegistrationNumber: c.gi ? `GI-${randInt(100, 999)}` : undefined,
      traditionalMaterials: ['Natural Dyes', 'Cotton', 'Silk', 'Wood', 'Metal'].sort(() => 0.5 - random()).slice(0, 3)
    },
    activeArtisansCount: randInt(10, 500)
  });
});

const artisans: any[] = [];
NAMES.forEach((name, i) => {
  const craft = pick(crafts);
  artisans.push({
    id: `art-${i + 1}`,
    name,
    primaryCraftId: craft.id,
    primaryCraftName: craft.name,
    location: {
      village: 'Artisan Village',
      district: 'Craft District',
      state: craft.state,
      pinCode: '100000'
    },
    yearsOfExperience: randInt(5, 40),
    nationalAwardee: random() > 0.8,
    awardTitle: random() > 0.8 ? 'National Award 2021' : undefined,
    verified: random() > 0.1,
    phone: '+91 9876543210',
    email: `${name.split(' ')[0].toLowerCase()}@demo.kriyo.in`,
    bio: `Master artisan specializing in ${craft.name} with ${randInt(5, 40)} years of experience.`,
    metrics: {
      totalProducts: randInt(10, 100),
      completedOrders: randInt(50, 500),
      rating: parseFloat((random() * (5 - 4) + 4).toFixed(1)),
      profileViews: randInt(500, 2000)
    },
    joinedDate: new Date(Date.now() - randInt(10, 1000) * 86400000).toISOString()
  });
});

const products: any[] = [];
for (let i = 0; i < 50; i++) {
  const artisan = pick(artisans);
  const craft = crafts.find(c => c.id === artisan.primaryCraftId);
  products.push({
    id: `prod-${i + 1}`,
    title: `Premium ${craft.name} Masterpiece ${i + 1}`,
    artisanId: artisan.id,
    artisanName: artisan.name,
    craftId: craft.id,
    craftName: craft.name,
    category: craft.category,
    price: randInt(1000, 50000),
    stock: randInt(0, 50),
    provenance: {
      originState: craft.state,
      handcraftingDurationDays: randInt(5, 60),
      rawMaterials: craft.heritage.traditionalMaterials
    },
    engagement: {
      views: randInt(100, 5000),
      likes: randInt(10, 500),
      saves: randInt(5, 200)
    }
  });
}

// Sales for 12 months
const months = ['Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026'];
const monthlySeries = months.map((m, i) => {
  const baseRevenue = 10000000;
  const growth = Math.pow(1.05, i); // 5% growth per month
  const revenue = Math.floor(baseRevenue * growth * (1 + (random() * 0.2 - 0.1)));
  return {
    month: m,
    revenue: revenue,
    artisanPayout: Math.floor(revenue * 0.8),
    orderCount: Math.floor(revenue / 5000)
  };
});

fs.writeFileSync(path.join(outDir, 'crafts.ts'), 'export const mockCrafts = ' + JSON.stringify(crafts, null, 2) + ';\n');
fs.writeFileSync(path.join(outDir, 'artisans.ts'), 'export const mockArtisans = ' + JSON.stringify(artisans, null, 2) + ';\n');
fs.writeFileSync(path.join(outDir, 'products.ts'), 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';\n');
fs.writeFileSync(path.join(outDir, 'sales.ts'), 
`export const mockSalesAnalytics = {
  grossRevenue: 184200000,
  totalOrders: 3580,
  averageOrderValue: 5293,
  artisanDirectPayout: 147360000,
  monthlyRevenueSeries: ${JSON.stringify(monthlySeries, null, 2)}
};

export const mockOrders = ${JSON.stringify(products.slice(0, 10).map((p, i) => ({
  id: 'ord-' + (i + 1),
  orderNumber: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
  customerName: 'Buyer ' + i,
  customerRegion: p.provenance.originState,
  orderDate: new Date().toISOString(),
  status: 'Completed',
  items: [{
    productId: p.id,
    productTitle: p.title,
    artisanId: p.artisanId,
    artisanName: p.artisanName,
    quantity: 1,
    unitPrice: p.price
  }],
  totalAmount: p.price
})), null, 2)};
`);

const intelligence = {
  aiSignals: [
    { signal: "Demand for Madhubani wall art increased 34% over the last 30 days.", confidence: 92, trend: "Upward", drivers: ["Festive Season", "Corporate Gifting"], craft: "Madhubani Painting", region: "Eastern", recommendation: "Increase product visibility" },
    { signal: "Channapatna wooden toys show 27% growth in Tier-1 buyer interest.", confidence: 88, trend: "Upward", drivers: ["Eco-friendly shift"], craft: "Channapatna Toys", region: "Southern", recommendation: "Recommend to institutional buyers" },
    { signal: "Kutch embroidery demand is expected to rise during the festive season.", confidence: 95, trend: "Upward", drivers: ["Navratri"], craft: "Kutch Embroidery", region: "Western", recommendation: "Promote during festival season" },
    { signal: "Pashmina products show strong premium-market intent.", confidence: 90, trend: "Upward", drivers: ["Winter onset", "Export demand"], craft: "Kashmiri Pashmina", region: "Northern", recommendation: "Connect artisan with buyer" },
  ],
  geography: REGIONS.map(r => ({
    region: r,
    states: STATES_MAP[r],
    artisanCount: randInt(1000, 5000),
    activeCrafts: randInt(5, 20),
    monthlySales: randInt(5000000, 20000000),
    demandVelocity: randInt(50, 100),
    topCrafts: crafts.filter(c => c.region === r).slice(0, 2).map(c => c.name)
  }))
};

fs.writeFileSync(path.join(outDir, 'intelligence.ts'), 'export const mockIntelligence = ' + JSON.stringify(intelligence, null, 2) + ';\n');

console.log('Mock data generated.');
