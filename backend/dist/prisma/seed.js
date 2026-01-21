"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('🌱 Starting seed...');
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.paymentMethod.deleteMany();
    await prisma.menuItem.deleteMany();
    await prisma.restaurant.deleteMany();
    await prisma.user.deleteMany();
    console.log('🧹 Cleared existing data');
    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = await Promise.all([
        prisma.user.create({
            data: {
                name: 'Nick Fury',
                email: 'nick@avengers.com',
                password: hashedPassword,
                role: client_1.Role.ADMIN,
                country: null,
            },
        }),
        prisma.user.create({
            data: {
                name: 'Captain Marvel',
                email: 'marvel@avengers.com',
                password: hashedPassword,
                role: client_1.Role.MANAGER,
                country: client_1.Country.INDIA,
            },
        }),
        prisma.user.create({
            data: {
                name: 'Captain America',
                email: 'steve@avengers.com',
                password: hashedPassword,
                role: client_1.Role.MANAGER,
                country: client_1.Country.AMERICA,
            },
        }),
        prisma.user.create({
            data: {
                name: 'Thanos',
                email: 'thanos@avengers.com',
                password: hashedPassword,
                role: client_1.Role.MEMBER,
                country: client_1.Country.INDIA,
            },
        }),
        prisma.user.create({
            data: {
                name: 'Thor',
                email: 'thor@avengers.com',
                password: hashedPassword,
                role: client_1.Role.MEMBER,
                country: client_1.Country.INDIA,
            },
        }),
        prisma.user.create({
            data: {
                name: 'Travis',
                email: 'travis@avengers.com',
                password: hashedPassword,
                role: client_1.Role.MEMBER,
                country: client_1.Country.AMERICA,
            },
        }),
    ]);
    console.log('👥 Created users:', users.map(u => u.name).join(', '));
    const indianRestaurants = await Promise.all([
        prisma.restaurant.create({
            data: {
                name: 'Spice Garden',
                description: 'Authentic North Indian cuisine with rich flavors and aromatic spices',
                imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
                cuisine: 'North Indian',
                rating: 4.5,
                country: client_1.Country.INDIA,
                menuItems: {
                    create: [
                        {
                            name: 'Butter Chicken',
                            description: 'Creamy tomato-based curry with tender chicken pieces',
                            price: 350,
                            imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
                            category: 'Main Course',
                            isVegetarian: false,
                        },
                        {
                            name: 'Paneer Tikka Masala',
                            description: 'Grilled cottage cheese in spiced tomato gravy',
                            price: 280,
                            imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',
                            category: 'Main Course',
                            isVegetarian: true,
                        },
                        {
                            name: 'Garlic Naan',
                            description: 'Soft bread topped with garlic and butter',
                            price: 60,
                            imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',
                            category: 'Breads',
                            isVegetarian: true,
                        },
                        {
                            name: 'Dal Makhani',
                            description: 'Slow-cooked black lentils in creamy sauce',
                            price: 220,
                            imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
                            category: 'Main Course',
                            isVegetarian: true,
                        },
                    ],
                },
            },
        }),
        prisma.restaurant.create({
            data: {
                name: 'South Spice',
                description: 'Traditional South Indian delicacies and filter coffee',
                imageUrl: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800',
                cuisine: 'South Indian',
                rating: 4.3,
                country: client_1.Country.INDIA,
                menuItems: {
                    create: [
                        {
                            name: 'Masala Dosa',
                            description: 'Crispy rice crepe filled with spiced potato',
                            price: 120,
                            imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400',
                            category: 'Main Course',
                            isVegetarian: true,
                        },
                        {
                            name: 'Idli Sambar',
                            description: 'Steamed rice cakes with lentil soup',
                            price: 80,
                            imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400',
                            category: 'Breakfast',
                            isVegetarian: true,
                        },
                        {
                            name: 'Chettinad Chicken',
                            description: 'Spicy chicken curry from Tamil Nadu',
                            price: 320,
                            imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400',
                            category: 'Main Course',
                            isVegetarian: false,
                        },
                    ],
                },
            },
        }),
        prisma.restaurant.create({
            data: {
                name: 'Mumbai Street Food',
                description: 'Famous street food from the streets of Mumbai',
                imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
                cuisine: 'Street Food',
                rating: 4.2,
                country: client_1.Country.INDIA,
                menuItems: {
                    create: [
                        {
                            name: 'Vada Pav',
                            description: 'Spicy potato fritter in a bun',
                            price: 40,
                            imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',
                            category: 'Snacks',
                            isVegetarian: true,
                        },
                        {
                            name: 'Pav Bhaji',
                            description: 'Mashed vegetable curry with buttered bread',
                            price: 100,
                            imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400',
                            category: 'Main Course',
                            isVegetarian: true,
                        },
                        {
                            name: 'Bhel Puri',
                            description: 'Puffed rice with chutneys and vegetables',
                            price: 60,
                            imageUrl: 'https://images.unsplash.com/photo-1613564834361-9436948817d1?w=400',
                            category: 'Snacks',
                            isVegetarian: true,
                        },
                    ],
                },
            },
        }),
        prisma.restaurant.create({
            data: {
                name: 'Biryani House',
                description: 'Authentic Hyderabadi Dum Biryani specialists',
                imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
                cuisine: 'Hyderabadi',
                rating: 4.7,
                country: client_1.Country.INDIA,
                menuItems: {
                    create: [
                        {
                            name: 'Chicken Dum Biryani',
                            description: 'Slow-cooked aromatic rice with tender chicken',
                            price: 280,
                            imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
                            category: 'Main Course',
                            isVegetarian: false,
                        },
                        {
                            name: 'Mutton Biryani',
                            description: 'Traditional Hyderabadi mutton biryani',
                            price: 350,
                            imageUrl: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400',
                            category: 'Main Course',
                            isVegetarian: false,
                        },
                        {
                            name: 'Veg Biryani',
                            description: 'Aromatic rice with mixed vegetables',
                            price: 200,
                            imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400',
                            category: 'Main Course',
                            isVegetarian: true,
                        },
                        {
                            name: 'Mirchi Ka Salan',
                            description: 'Spicy peanut-based green chili curry',
                            price: 150,
                            imageUrl: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400',
                            category: 'Sides',
                            isVegetarian: true,
                        },
                    ],
                },
            },
        }),
    ]);
    const americanRestaurants = await Promise.all([
        prisma.restaurant.create({
            data: {
                name: 'The Burger Joint',
                description: 'Gourmet burgers made with premium Angus beef',
                imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
                cuisine: 'American',
                rating: 4.4,
                country: client_1.Country.AMERICA,
                menuItems: {
                    create: [
                        {
                            name: 'Classic Cheeseburger',
                            description: 'Angus beef patty with cheddar, lettuce, tomato',
                            price: 12.99,
                            imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
                            category: 'Burgers',
                            isVegetarian: false,
                        },
                        {
                            name: 'Bacon BBQ Burger',
                            description: 'Topped with crispy bacon and BBQ sauce',
                            price: 14.99,
                            imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400',
                            category: 'Burgers',
                            isVegetarian: false,
                        },
                        {
                            name: 'Loaded Fries',
                            description: 'Crispy fries with cheese, bacon, and ranch',
                            price: 7.99,
                            imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
                            category: 'Sides',
                            isVegetarian: false,
                        },
                        {
                            name: 'Veggie Burger',
                            description: 'Plant-based patty with fresh toppings',
                            price: 11.99,
                            imageUrl: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400',
                            category: 'Burgers',
                            isVegetarian: true,
                        },
                    ],
                },
            },
        }),
        prisma.restaurant.create({
            data: {
                name: 'NYC Pizza Co',
                description: 'Authentic New York style thin crust pizza',
                imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
                cuisine: 'Italian-American',
                rating: 4.6,
                country: client_1.Country.AMERICA,
                menuItems: {
                    create: [
                        {
                            name: 'Pepperoni Pizza',
                            description: 'Classic pepperoni with mozzarella',
                            price: 18.99,
                            imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
                            category: 'Pizza',
                            isVegetarian: false,
                        },
                        {
                            name: 'Margherita Pizza',
                            description: 'Fresh tomato, mozzarella, and basil',
                            price: 16.99,
                            imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
                            category: 'Pizza',
                            isVegetarian: true,
                        },
                        {
                            name: 'Buffalo Wings',
                            description: 'Crispy wings in spicy buffalo sauce',
                            price: 12.99,
                            imageUrl: 'https://images.unsplash.com/photo-1608039829572-9b3e33aa3399?w=400',
                            category: 'Appetizers',
                            isVegetarian: false,
                        },
                    ],
                },
            },
        }),
        prisma.restaurant.create({
            data: {
                name: 'Tex-Mex Cantina',
                description: 'Bold Tex-Mex flavors with fresh ingredients',
                imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
                cuisine: 'Tex-Mex',
                rating: 4.3,
                country: client_1.Country.AMERICA,
                menuItems: {
                    create: [
                        {
                            name: 'Beef Tacos',
                            description: 'Three soft tacos with seasoned beef',
                            price: 10.99,
                            imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
                            category: 'Tacos',
                            isVegetarian: false,
                        },
                        {
                            name: 'Chicken Burrito',
                            description: 'Large burrito with grilled chicken and rice',
                            price: 13.99,
                            imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400',
                            category: 'Burritos',
                            isVegetarian: false,
                        },
                        {
                            name: 'Guacamole & Chips',
                            description: 'Fresh guacamole with crispy tortilla chips',
                            price: 8.99,
                            imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400',
                            category: 'Appetizers',
                            isVegetarian: true,
                        },
                        {
                            name: 'Veggie Quesadilla',
                            description: 'Grilled tortilla with cheese and peppers',
                            price: 9.99,
                            imageUrl: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400',
                            category: 'Main Course',
                            isVegetarian: true,
                        },
                    ],
                },
            },
        }),
        prisma.restaurant.create({
            data: {
                name: 'BBQ Smokehouse',
                description: 'Slow-smoked meats with Southern hospitality',
                imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800',
                cuisine: 'BBQ',
                rating: 4.5,
                country: client_1.Country.AMERICA,
                menuItems: {
                    create: [
                        {
                            name: 'Pulled Pork Sandwich',
                            description: '12-hour smoked pork with coleslaw',
                            price: 14.99,
                            imageUrl: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400',
                            category: 'Sandwiches',
                            isVegetarian: false,
                        },
                        {
                            name: 'Beef Brisket Plate',
                            description: 'Tender smoked brisket with two sides',
                            price: 22.99,
                            imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
                            category: 'Main Course',
                            isVegetarian: false,
                        },
                        {
                            name: 'Mac and Cheese',
                            description: 'Creamy four-cheese macaroni',
                            price: 6.99,
                            imageUrl: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=400',
                            category: 'Sides',
                            isVegetarian: true,
                        },
                        {
                            name: 'Cornbread',
                            description: 'Sweet and buttery cornbread',
                            price: 4.99,
                            imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400',
                            category: 'Sides',
                            isVegetarian: true,
                        },
                    ],
                },
            },
        }),
    ]);
    console.log('🍽️  Created restaurants:', [...indianRestaurants, ...americanRestaurants].map(r => r.name).join(', '));
    const nickFury = users.find(u => u.name === 'Nick Fury');
    await prisma.paymentMethod.createMany({
        data: [
            {
                userId: nickFury.id,
                type: 'credit_card',
                cardBrand: 'visa',
                lastFour: '4242',
                expiryMonth: 12,
                expiryYear: 2027,
                isDefault: true,
            },
            {
                userId: nickFury.id,
                type: 'debit_card',
                cardBrand: 'mastercard',
                lastFour: '5555',
                expiryMonth: 6,
                expiryYear: 2026,
                isDefault: false,
            },
        ],
    });
    console.log('💳 Created payment methods for Nick Fury');
    const captainMarvel = users.find(u => u.name === 'Captain Marvel');
    const spiceGarden = indianRestaurants[0];
    const menuItems = await prisma.menuItem.findMany({
        where: { restaurantId: spiceGarden.id },
        take: 2,
    });
    const sampleOrder = await prisma.order.create({
        data: {
            userId: captainMarvel.id,
            status: client_1.OrderStatus.PLACED,
            country: client_1.Country.INDIA,
            totalAmount: menuItems.reduce((sum, item) => sum + item.price, 0),
            items: {
                create: menuItems.map(item => ({
                    menuItemId: item.id,
                    quantity: 1,
                    price: item.price,
                })),
            },
        },
    });
    console.log('📦 Created sample order for Captain Marvel');
    console.log('✅ Seed completed successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map