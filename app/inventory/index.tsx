
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from '../../components/Icon';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  cost: number;
  lowStockThreshold: number;
  lastUpdated: string;
}

export default function InventoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Laptop Dell Inspiron 15',
      sku: 'DELL-INS-15-001',
      category: 'Electronics',
      quantity: 25,
      price: 85000,
      cost: 70000,
      lowStockThreshold: 10,
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      name: 'Office Chair Ergonomic',
      sku: 'CHAIR-ERG-001',
      category: 'Furniture',
      quantity: 8,
      price: 15000,
      cost: 12000,
      lowStockThreshold: 5,
      lastUpdated: '2024-01-14'
    },
    {
      id: '3',
      name: 'Wireless Mouse Logitech',
      sku: 'LOGI-MOUSE-001',
      category: 'Electronics',
      quantity: 3,
      price: 2500,
      cost: 1800,
      lowStockThreshold: 10,
      lastUpdated: '2024-01-13'
    },
    {
      id: '4',
      name: 'A4 Paper Ream',
      sku: 'PAPER-A4-001',
      category: 'Office Supplies',
      quantity: 150,
      price: 800,
      cost: 600,
      lowStockThreshold: 20,
      lastUpdated: '2024-01-15'
    }
  ]);

  const categories = ['all', 'Electronics', 'Furniture', 'Office Supplies'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockProducts = products.filter(product => product.quantity <= product.lowStockThreshold);

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} DZD`;
  };

  const getStockStatus = (product: Product) => {
    if (product.quantity === 0) {
      return { label: 'Out of Stock', color: colors.error };
    } else if (product.quantity <= product.lowStockThreshold) {
      return { label: 'Low Stock', color: colors.warning };
    } else {
      return { label: 'In Stock', color: colors.success };
    }
  };

  const handleAddProduct = () => {
    console.log('Add new product');
    Alert.alert('Add Product', 'Product addition form would open here');
  };

  const handleEditProduct = (productId: string) => {
    console.log('Edit product:', productId);
    Alert.alert('Edit Product', `Edit product ${productId}`);
  };

  const handleStockAdjustment = (productId: string) => {
    console.log('Adjust stock for product:', productId);
    Alert.alert('Stock Adjustment', `Adjust stock for product ${productId}`);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <View style={commonStyles.row}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.headerTitle, { marginLeft: 16 }]}>Inventory Management</Text>
          <TouchableOpacity onPress={handleAddProduct}>
            <Icon name="add-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Search and Filter */}
        <View style={commonStyles.section}>
          <View style={{ marginBottom: 12 }}>
            <TextInput
              style={commonStyles.input}
              placeholder="Search products by name or SKU..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    commonStyles.badge,
                    {
                      backgroundColor: selectedCategory === category ? colors.primary : colors.surface,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                    }
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    commonStyles.badgeText,
                    {
                      color: selectedCategory === category ? colors.backgroundAlt : colors.text,
                      textTransform: 'capitalize'
                    }
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <View style={[commonStyles.card, { backgroundColor: colors.warning + '20', borderColor: colors.warning }]}>
            <View style={commonStyles.row}>
              <Icon name="warning-outline" size={24} color={colors.warning} />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>Low Stock Alert</Text>
                <Text style={commonStyles.textSecondary}>
                  {lowStockProducts.length} product{lowStockProducts.length > 1 ? 's' : ''} running low
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Inventory Summary */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Inventory Summary</Text>
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <View style={[commonStyles.card, { flex: 1, marginRight: 8 }]}>
              <Text style={commonStyles.textSecondary}>Total Products</Text>
              <Text style={[commonStyles.title, { fontSize: 20 }]}>{products.length}</Text>
            </View>
            <View style={[commonStyles.card, { flex: 1, marginLeft: 8 }]}>
              <Text style={commonStyles.textSecondary}>Total Value</Text>
              <Text style={[commonStyles.title, { fontSize: 20 }]}>
                {formatCurrency(products.reduce((sum, p) => sum + (p.quantity * p.cost), 0))}
              </Text>
            </View>
          </View>
        </View>

        {/* Products List */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Products ({filteredProducts.length})</Text>
          
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product);
            return (
              <TouchableOpacity
                key={product.id}
                style={commonStyles.card}
                onPress={() => handleEditProduct(product.id)}
                activeOpacity={0.7}
              >
                <View style={commonStyles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={[commonStyles.text, { fontWeight: '600' }]}>{product.name}</Text>
                    <Text style={commonStyles.textSecondary}>SKU: {product.sku}</Text>
                    <Text style={commonStyles.textSecondary}>Category: {product.category}</Text>
                    
                    <View style={[commonStyles.row, { marginTop: 8 }]}>
                      <View style={[
                        commonStyles.badge,
                        { backgroundColor: stockStatus.color + '20' }
                      ]}>
                        <Text style={[commonStyles.badgeText, { color: stockStatus.color }]}>
                          {stockStatus.label}
                        </Text>
                      </View>
                      <Text style={[commonStyles.textSecondary, { marginLeft: 12 }]}>
                        Qty: {product.quantity}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                      {formatCurrency(product.price)}
                    </Text>
                    <Text style={commonStyles.textSecondary}>
                      Cost: {formatCurrency(product.cost)}
                    </Text>
                    
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.primary + '20',
                        padding: 8,
                        borderRadius: 8,
                        marginTop: 8,
                      }}
                      onPress={() => handleStockAdjustment(product.id)}
                    >
                      <Icon name="create-outline" size={16} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          
          {filteredProducts.length === 0 && (
            <View style={[commonStyles.card, commonStyles.center, { paddingVertical: 32 }]}>
              <Icon name="cube-outline" size={48} color={colors.textSecondary} />
              <Text style={[commonStyles.textSecondary, { marginTop: 12, textAlign: 'center' }]}>
                No products found matching your criteria
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
