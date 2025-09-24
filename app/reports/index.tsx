
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from '../../components/Icon';

interface SalesData {
  period: string;
  sales: number;
  purchases: number;
  profit: number;
}

interface TopProduct {
  name: string;
  quantity: number;
  revenue: number;
}

export default function ReportsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCurrency, setSelectedCurrency] = useState('DZD');

  const periods = [
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'quarter', label: 'This Quarter' },
    { key: 'year', label: 'This Year' }
  ];

  const currencies = ['DZD', 'MAD', 'TND', 'EGP'];

  // Sample data
  const salesData: SalesData[] = [
    { period: 'Jan', sales: 125000, purchases: 85000, profit: 40000 },
    { period: 'Feb', sales: 145000, purchases: 95000, profit: 50000 },
    { period: 'Mar', sales: 165000, purchases: 105000, profit: 60000 },
    { period: 'Apr', sales: 155000, purchases: 100000, profit: 55000 },
    { period: 'May', sales: 185000, purchases: 115000, profit: 70000 },
    { period: 'Jun', sales: 195000, purchases: 120000, profit: 75000 }
  ];

  const topProducts: TopProduct[] = [
    { name: 'Laptop Dell Inspiron 15', quantity: 45, revenue: 3825000 },
    { name: 'Office Chair Ergonomic', quantity: 78, revenue: 1170000 },
    { name: 'Wireless Mouse Logitech', quantity: 156, revenue: 390000 },
    { name: 'A4 Paper Ream', quantity: 234, revenue: 187200 },
    { name: 'USB Flash Drive 32GB', quantity: 89, revenue: 267000 }
  ];

  const currentMonthData = {
    totalSales: 195000,
    totalPurchases: 120000,
    totalProfit: 75000,
    profitMargin: 38.5,
    totalTransactions: 156,
    averageOrderValue: 1250,
    topCustomer: 'Société SARL TechCorp',
    topCustomerSpent: 45000
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} ${selectedCurrency}`;
  };

  const getChangePercentage = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change >= 0
    };
  };

  // Simple bar chart component
  const BarChart = ({ data }: { data: SalesData[] }) => {
    const maxValue = Math.max(...data.map(d => Math.max(d.sales, d.purchases)));
    const chartHeight = 200;
    const barWidth = 40;
    const spacing = 20;

    return (
      <View style={{ height: chartHeight + 40, paddingHorizontal: 16 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: chartHeight }}>
            {data.map((item, index) => (
              <View key={index} style={{ marginRight: spacing, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  {/* Sales bar */}
                  <View
                    style={{
                      width: barWidth / 2,
                      height: (item.sales / maxValue) * chartHeight,
                      backgroundColor: colors.primary,
                      marginRight: 2,
                      borderRadius: 2,
                    }}
                  />
                  {/* Purchases bar */}
                  <View
                    style={{
                      width: barWidth / 2,
                      height: (item.purchases / maxValue) * chartHeight,
                      backgroundColor: colors.secondary,
                      borderRadius: 2,
                    }}
                  />
                </View>
                <Text style={[commonStyles.textSecondary, { marginTop: 8, fontSize: 12 }]}>
                  {item.period}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
        
        {/* Legend */}
        <View style={[commonStyles.row, { marginTop: 16, justifyContent: 'center' }]}>
          <View style={commonStyles.row}>
            <View style={{
              width: 12,
              height: 12,
              backgroundColor: colors.primary,
              borderRadius: 2,
              marginRight: 6
            }} />
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>Sales</Text>
          </View>
          <View style={[commonStyles.row, { marginLeft: 20 }]}>
            <View style={{
              width: 12,
              height: 12,
              backgroundColor: colors.secondary,
              borderRadius: 2,
              marginRight: 6
            }} />
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>Purchases</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <View style={commonStyles.row}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.headerTitle, { marginLeft: 16 }]}>Business Reports</Text>
          <View style={commonStyles.row}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.surface,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                marginRight: 8,
              }}
            >
              <Text style={[commonStyles.textSecondary, { fontSize: 12, fontWeight: '600' }]}>
                {selectedCurrency}
              </Text>
            </TouchableOpacity>
            <Icon name="download-outline" size={24} color={colors.primary} />
          </View>
        </View>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selection */}
        <View style={commonStyles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {periods.map((period) => (
                <TouchableOpacity
                  key={period.key}
                  style={[
                    commonStyles.badge,
                    {
                      backgroundColor: selectedPeriod === period.key ? colors.primary : colors.surface,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                    }
                  ]}
                  onPress={() => setSelectedPeriod(period.key)}
                >
                  <Text style={[
                    commonStyles.badgeText,
                    {
                      color: selectedPeriod === period.key ? colors.backgroundAlt : colors.text,
                    }
                  ]}>
                    {period.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Key Metrics */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Key Performance Indicators</Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
            <View style={[commonStyles.card, { width: '48%', marginRight: '4%', marginBottom: 12 }]}>
              <Text style={commonStyles.textSecondary}>Total Sales</Text>
              <Text style={[commonStyles.title, { fontSize: 18, color: colors.primary }]}>
                {formatCurrency(currentMonthData.totalSales)}
              </Text>
              <Text style={[commonStyles.textSecondary, { color: colors.success, fontSize: 12 }]}>
                +15.2% vs last month
              </Text>
            </View>
            
            <View style={[commonStyles.card, { width: '48%', marginBottom: 12 }]}>
              <Text style={commonStyles.textSecondary}>Total Profit</Text>
              <Text style={[commonStyles.title, { fontSize: 18, color: colors.success }]}>
                {formatCurrency(currentMonthData.totalProfit)}
              </Text>
              <Text style={[commonStyles.textSecondary, { color: colors.success, fontSize: 12 }]}>
                +22.8% vs last month
              </Text>
            </View>
            
            <View style={[commonStyles.card, { width: '48%', marginRight: '4%' }]}>
              <Text style={commonStyles.textSecondary}>Profit Margin</Text>
              <Text style={[commonStyles.title, { fontSize: 18 }]}>
                {currentMonthData.profitMargin}%
              </Text>
              <Text style={[commonStyles.textSecondary, { color: colors.success, fontSize: 12 }]}>
                +3.2% vs last month
              </Text>
            </View>
            
            <View style={[commonStyles.card, { width: '48%' }]}>
              <Text style={commonStyles.textSecondary}>Avg. Order Value</Text>
              <Text style={[commonStyles.title, { fontSize: 18 }]}>
                {formatCurrency(currentMonthData.averageOrderValue)}
              </Text>
              <Text style={[commonStyles.textSecondary, { color: colors.error, fontSize: 12 }]}>
                -2.1% vs last month
              </Text>
            </View>
          </View>
        </View>

        {/* Sales Chart */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Sales vs Purchases Trend</Text>
          <View style={commonStyles.card}>
            <BarChart data={salesData} />
          </View>
        </View>

        {/* Top Products */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Top Selling Products</Text>
          
          {topProducts.map((product, index) => (
            <View key={index} style={commonStyles.card}>
              <View style={commonStyles.row}>
                <View style={{
                  backgroundColor: colors.primary + '20',
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}>
                  <Text style={[commonStyles.text, { fontWeight: '700', color: colors.primary }]}>
                    {index + 1}
                  </Text>
                </View>
                
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>{product.name}</Text>
                  <Text style={commonStyles.textSecondary}>
                    Sold: {product.quantity} units
                  </Text>
                </View>
                
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', color: colors.primary }]}>
                    {formatCurrency(product.revenue)}
                  </Text>
                  <Text style={commonStyles.textSecondary}>Revenue</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Additional Insights */}
        <View style={[commonStyles.section, { marginBottom: 32 }]}>
          <Text style={commonStyles.subtitle}>Business Insights</Text>
          
          <View style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Icon name="trophy-outline" size={24} color={colors.warning} />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>Top Customer</Text>
                <Text style={commonStyles.textSecondary}>{currentMonthData.topCustomer}</Text>
                <Text style={commonStyles.textSecondary}>
                  Spent: {formatCurrency(currentMonthData.topCustomerSpent)} this month
                </Text>
              </View>
            </View>
            
            <View style={commonStyles.row}>
              <Icon name="receipt-outline" size={24} color={colors.secondary} />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>Total Transactions</Text>
                <Text style={commonStyles.textSecondary}>
                  {currentMonthData.totalTransactions} transactions this month
                </Text>
                <Text style={commonStyles.textSecondary}>
                  Average: {Math.round(currentMonthData.totalTransactions / 30)} per day
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
