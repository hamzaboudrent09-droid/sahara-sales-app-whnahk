
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from '../../components/Icon';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  totalPurchases: number;
  lastPurchase: string;
  outstandingBalance: number;
  customerType: 'individual' | 'business';
}

export default function CustomersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Ahmed Ben Ali',
      email: 'ahmed.benali@email.com',
      phone: '+213 555 123 456',
      address: '123 Rue de la Liberté',
      city: 'Algiers',
      country: 'Algeria',
      totalPurchases: 125000,
      lastPurchase: '2024-01-15',
      outstandingBalance: 0,
      customerType: 'individual'
    },
    {
      id: '2',
      name: 'Société SARL TechCorp',
      email: 'contact@techcorp.dz',
      phone: '+213 555 987 654',
      address: '45 Boulevard Mohamed V',
      city: 'Oran',
      country: 'Algeria',
      totalPurchases: 450000,
      lastPurchase: '2024-01-14',
      outstandingBalance: 25000,
      customerType: 'business'
    },
    {
      id: '3',
      name: 'Fatima Zahra',
      email: 'fatima.zahra@email.com',
      phone: '+212 666 111 222',
      address: '78 Avenue Hassan II',
      city: 'Casablanca',
      country: 'Morocco',
      totalPurchases: 75000,
      lastPurchase: '2024-01-10',
      outstandingBalance: 5000,
      customerType: 'individual'
    },
    {
      id: '4',
      name: 'Entreprise Moderne SARL',
      email: 'info@moderne.ma',
      phone: '+212 666 333 444',
      address: '12 Rue Abderrahman',
      city: 'Rabat',
      country: 'Morocco',
      totalPurchases: 320000,
      lastPurchase: '2024-01-12',
      outstandingBalance: 0,
      customerType: 'business'
    }
  ]);

  const filters = [
    { key: 'all', label: 'All Customers' },
    { key: 'individual', label: 'Individuals' },
    { key: 'business', label: 'Businesses' },
    { key: 'outstanding', label: 'Outstanding Balance' }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery);
    
    let matchesFilter = true;
    if (selectedFilter === 'individual') {
      matchesFilter = customer.customerType === 'individual';
    } else if (selectedFilter === 'business') {
      matchesFilter = customer.customerType === 'business';
    } else if (selectedFilter === 'outstanding') {
      matchesFilter = customer.outstandingBalance > 0;
    }
    
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} DZD`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAddCustomer = () => {
    console.log('Add new customer');
    Alert.alert('Add Customer', 'Customer addition form would open here');
  };

  const handleEditCustomer = (customerId: string) => {
    console.log('Edit customer:', customerId);
    Alert.alert('Edit Customer', `Edit customer ${customerId}`);
  };

  const handleViewTransactions = (customerId: string) => {
    console.log('View transactions for customer:', customerId);
    Alert.alert('Transactions', `View transactions for customer ${customerId}`);
  };

  const totalCustomers = customers.length;
  const totalOutstanding = customers.reduce((sum, c) => sum + c.outstandingBalance, 0);
  const businessCustomers = customers.filter(c => c.customerType === 'business').length;

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <View style={commonStyles.row}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.headerTitle, { marginLeft: 16 }]}>Customer Management</Text>
          <TouchableOpacity onPress={handleAddCustomer}>
            <Icon name="person-add-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={commonStyles.section}>
          <TextInput
            style={commonStyles.input}
            placeholder="Search customers by name, email, or phone..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Tabs */}
        <View style={commonStyles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  style={[
                    commonStyles.badge,
                    {
                      backgroundColor: selectedFilter === filter.key ? colors.primary : colors.surface,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                    }
                  ]}
                  onPress={() => setSelectedFilter(filter.key)}
                >
                  <Text style={[
                    commonStyles.badgeText,
                    {
                      color: selectedFilter === filter.key ? colors.backgroundAlt : colors.text,
                    }
                  ]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Customer Summary */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Customer Overview</Text>
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <View style={[commonStyles.card, { flex: 1, marginRight: 4 }]}>
              <Text style={commonStyles.textSecondary}>Total Customers</Text>
              <Text style={[commonStyles.title, { fontSize: 20 }]}>{totalCustomers}</Text>
            </View>
            <View style={[commonStyles.card, { flex: 1, marginHorizontal: 4 }]}>
              <Text style={commonStyles.textSecondary}>Business</Text>
              <Text style={[commonStyles.title, { fontSize: 20 }]}>{businessCustomers}</Text>
            </View>
            <View style={[commonStyles.card, { flex: 1, marginLeft: 4 }]}>
              <Text style={commonStyles.textSecondary}>Outstanding</Text>
              <Text style={[commonStyles.title, { fontSize: 16, color: colors.error }]}>
                {formatCurrency(totalOutstanding)}
              </Text>
            </View>
          </View>
        </View>

        {/* Customers List */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Customers ({filteredCustomers.length})</Text>
          
          {filteredCustomers.map((customer) => (
            <TouchableOpacity
              key={customer.id}
              style={commonStyles.card}
              onPress={() => handleEditCustomer(customer.id)}
              activeOpacity={0.7}
            >
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <View style={commonStyles.row}>
                    <Text style={[commonStyles.text, { fontWeight: '600', flex: 1 }]}>
                      {customer.name}
                    </Text>
                    <View style={[
                      commonStyles.badge,
                      {
                        backgroundColor: customer.customerType === 'business' ? colors.secondary + '20' : colors.primary + '20'
                      }
                    ]}>
                      <Text style={[
                        commonStyles.badgeText,
                        {
                          color: customer.customerType === 'business' ? colors.secondary : colors.primary,
                          textTransform: 'capitalize'
                        }
                      ]}>
                        {customer.customerType}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={commonStyles.textSecondary}>{customer.email}</Text>
                  <Text style={commonStyles.textSecondary}>{customer.phone}</Text>
                  <Text style={commonStyles.textSecondary}>
                    {customer.city}, {customer.country}
                  </Text>
                  
                  <View style={[commonStyles.row, { marginTop: 8 }]}>
                    <Text style={commonStyles.textSecondary}>
                      Total: {formatCurrency(customer.totalPurchases)}
                    </Text>
                    <Text style={commonStyles.textSecondary}>
                      Last: {formatDate(customer.lastPurchase)}
                    </Text>
                  </View>
                  
                  {customer.outstandingBalance > 0 && (
                    <View style={[
                      commonStyles.badge,
                      { backgroundColor: colors.error + '20', marginTop: 8 }
                    ]}>
                      <Text style={[commonStyles.badgeText, { color: colors.error }]}>
                        Outstanding: {formatCurrency(customer.outstandingBalance)}
                      </Text>
                    </View>
                  )}
                </View>
                
                <View style={{ alignItems: 'center', marginLeft: 12 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.primary + '20',
                      padding: 8,
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                    onPress={() => handleViewTransactions(customer.id)}
                  >
                    <Icon name="receipt-outline" size={16} color={colors.primary} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.secondary + '20',
                      padding: 8,
                      borderRadius: 8,
                    }}
                    onPress={() => handleEditCustomer(customer.id)}
                  >
                    <Icon name="create-outline" size={16} color={colors.secondary} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          
          {filteredCustomers.length === 0 && (
            <View style={[commonStyles.card, commonStyles.center, { paddingVertical: 32 }]}>
              <Icon name="people-outline" size={48} color={colors.textSecondary} />
              <Text style={[commonStyles.textSecondary, { marginTop: 12, textAlign: 'center' }]}>
                No customers found matching your criteria
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
