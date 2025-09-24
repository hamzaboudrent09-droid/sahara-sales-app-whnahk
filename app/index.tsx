
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from '../components/Icon';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  route: string;
}

interface DashboardStat {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export default function HomeScreen() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fr'>('en');
  
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const translations = {
    en: {
      welcome: 'Welcome Back',
      dashboard: 'Dashboard Overview',
      quickActions: 'Quick Actions',
      createInvoice: 'Create Invoice',
      addProduct: 'Add Product',
      viewInventory: 'View Inventory',
      manageCustomers: 'Manage Customers',
      reports: 'Reports',
      settings: 'Settings',
      todaySales: 'Today\'s Sales',
      totalProducts: 'Total Products',
      lowStock: 'Low Stock Items',
      pendingOrders: 'Pending Orders',
      newSale: 'New Sale',
      newPurchase: 'New Purchase',
      inventory: 'Inventory',
      customers: 'Customers',
    },
    fr: {
      welcome: 'Bon Retour',
      dashboard: 'Aperçu du Tableau de Bord',
      quickActions: 'Actions Rapides',
      createInvoice: 'Créer Facture',
      addProduct: 'Ajouter Produit',
      viewInventory: 'Voir Inventaire',
      manageCustomers: 'Gérer Clients',
      reports: 'Rapports',
      settings: 'Paramètres',
      todaySales: 'Ventes d\'Aujourd\'hui',
      totalProducts: 'Total Produits',
      lowStock: 'Stock Faible',
      pendingOrders: 'Commandes en Attente',
      newSale: 'Nouvelle Vente',
      newPurchase: 'Nouvel Achat',
      inventory: 'Inventaire',
      customers: 'Clients',
    }
  };

  const t = translations[currentLanguage];

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: t.newSale,
      subtitle: 'Create sales invoice',
      icon: 'receipt-outline',
      color: colors.primary,
      route: '/sales/new'
    },
    {
      id: '2',
      title: t.inventory,
      subtitle: 'Manage products',
      icon: 'cube-outline',
      color: colors.secondary,
      route: '/inventory'
    },
    {
      id: '3',
      title: t.customers,
      subtitle: 'Customer management',
      icon: 'people-outline',
      color: colors.accent,
      route: '/customers'
    },
    {
      id: '4',
      title: t.reports,
      subtitle: 'Business analytics',
      icon: 'bar-chart-outline',
      color: colors.success,
      route: '/reports'
    },
    {
      id: '5',
      title: t.settings,
      subtitle: 'App configuration',
      icon: 'settings-outline',
      color: colors.warning,
      route: '/settings'
    }
  ];

  const dashboardStats: DashboardStat[] = [
    {
      label: t.todaySales,
      value: '2,450 DZD',
      change: '+12%',
      isPositive: true
    },
    {
      label: t.totalProducts,
      value: '1,247',
      change: '+5',
      isPositive: true
    },
    {
      label: t.lowStock,
      value: '23',
      change: '+3',
      isPositive: false
    },
    {
      label: t.pendingOrders,
      value: '8',
      change: '-2',
      isPositive: true
    }
  ];

  const handleQuickAction = (route: string) => {
    console.log('Navigating to:', route);
    router.push(route as any);
  };

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={[commonStyles.container, commonStyles.center]}>
          <Text style={commonStyles.text}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.row, { marginBottom: 24, marginTop: 16 }]}>
          <View>
            <Text style={commonStyles.title}>{t.welcome}</Text>
            <Text style={commonStyles.textSecondary}>
              {new Date().toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>
          <TouchableOpacity
            onPress={toggleLanguage}
            style={{
              backgroundColor: colors.surface,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={[commonStyles.textSecondary, { fontWeight: '600' }]}>
              {currentLanguage.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dashboard Stats */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>{t.dashboard}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
            {dashboardStats.map((stat, index) => (
              <View key={index} style={[commonStyles.card, { width: '48%', marginRight: index % 2 === 0 ? '4%' : 0 }]}>
                <Text style={commonStyles.textSecondary}>{stat.label}</Text>
                <Text style={[commonStyles.title, { fontSize: 20, marginBottom: 4 }]}>{stat.value}</Text>
                <Text style={[
                  commonStyles.textSecondary,
                  { color: stat.isPositive ? colors.success : colors.error, fontWeight: '600' }
                ]}>
                  {stat.change}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>{t.quickActions}</Text>
          <View style={{ marginTop: 12 }}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[commonStyles.card, commonStyles.row]}
                onPress={() => handleQuickAction(action.route)}
                activeOpacity={0.7}
              >
                <View style={commonStyles.row}>
                  <View style={{
                    backgroundColor: action.color + '20',
                    padding: 12,
                    borderRadius: 12,
                    marginRight: 16,
                  }}>
                    <Icon name={action.icon as any} size={24} color={action.color} />
                  </View>
                  <View>
                    <Text style={[commonStyles.text, { fontWeight: '600' }]}>{action.title}</Text>
                    <Text style={commonStyles.textSecondary}>{action.subtitle}</Text>
                  </View>
                </View>
                <Icon name="chevron-forward-outline" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity Placeholder */}
        <View style={[commonStyles.section, { marginBottom: 32 }]}>
          <Text style={commonStyles.subtitle}>Recent Activity</Text>
          <View style={[commonStyles.card, commonStyles.center, { paddingVertical: 32 }]}>
            <Icon name="time-outline" size={48} color={colors.textSecondary} />
            <Text style={[commonStyles.textSecondary, { marginTop: 12, textAlign: 'center' }]}>
              Recent transactions and activities will appear here
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
