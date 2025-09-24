
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from '../../components/Icon';

interface InvoiceItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function NewSaleScreen() {
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now()}`);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [tvaRate, setTvaRate] = useState(19); // Default TVA rate for Algeria
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Sample customers for selection
  const customers: Customer[] = [
    {
      id: '1',
      name: 'Ahmed Ben Ali',
      email: 'ahmed.benali@email.com',
      phone: '+213 555 123 456',
      address: '123 Rue de la Liberté, Algiers'
    },
    {
      id: '2',
      name: 'Société SARL TechCorp',
      email: 'contact@techcorp.dz',
      phone: '+213 555 987 654',
      address: '45 Boulevard Mohamed V, Oran'
    }
  ];

  // Sample products for adding to invoice
  const products = [
    { id: '1', name: 'Laptop Dell Inspiron 15', sku: 'DELL-INS-15-001', price: 85000 },
    { id: '2', name: 'Office Chair Ergonomic', sku: 'CHAIR-ERG-001', price: 15000 },
    { id: '3', name: 'Wireless Mouse Logitech', sku: 'LOGI-MOUSE-001', price: 2500 }
  ];

  const paymentMethods = [
    { key: 'cash', label: 'Cash / Espèces' },
    { key: 'card', label: 'Credit Card / Carte' },
    { key: 'bank_transfer', label: 'Bank Transfer / Virement' },
    { key: 'check', label: 'Check / Chèque' }
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tvaAmount = (subtotal * tvaRate) / 100;
  const totalAmount = subtotal + tvaAmount;

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} DZD`;
  };

  const handleSelectCustomer = () => {
    Alert.alert(
      'Select Customer',
      'Choose a customer for this invoice',
      [
        ...customers.map(customer => ({
          text: customer.name,
          onPress: () => setSelectedCustomer(customer)
        })),
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleAddProduct = () => {
    Alert.alert(
      'Add Product',
      'Select a product to add to the invoice',
      [
        ...products.map(product => ({
          text: `${product.name} - ${formatCurrency(product.price)}`,
          onPress: () => addProductToInvoice(product)
        })),
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const addProductToInvoice = (product: any) => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      productName: product.name,
      sku: product.sku,
      quantity: 1,
      unitPrice: product.price,
      total: product.price
    };
    setItems([...items, newItem]);
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, quantity, total: quantity * item.unitPrice }
        : item
    ));
  };

  const removeItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleSaveInvoice = () => {
    if (!selectedCustomer) {
      Alert.alert('Error', 'Please select a customer');
      return;
    }
    
    if (items.length === 0) {
      Alert.alert('Error', 'Please add at least one product');
      return;
    }

    console.log('Saving invoice:', {
      invoiceNumber,
      customer: selectedCustomer,
      items,
      subtotal,
      tvaAmount,
      totalAmount,
      paymentMethod,
      notes
    });

    Alert.alert(
      'Invoice Created',
      `Invoice ${invoiceNumber} has been created successfully!\nTotal: ${formatCurrency(totalAmount)}`,
      [
        { text: 'Create Another', onPress: () => resetForm() },
        { text: 'Back to Home', onPress: () => router.push('/') }
      ]
    );
  };

  const resetForm = () => {
    setInvoiceNumber(`INV-${Date.now()}`);
    setSelectedCustomer(null);
    setItems([]);
    setNotes('');
    setPaymentMethod('cash');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <View style={commonStyles.row}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.headerTitle, { marginLeft: 16 }]}>New Sales Invoice</Text>
          <TouchableOpacity onPress={handleSaveInvoice}>
            <Icon name="checkmark-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Invoice Details */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Invoice Details</Text>
          <View style={commonStyles.card}>
            <View style={commonStyles.row}>
              <Text style={commonStyles.inputLabel}>Invoice Number:</Text>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>{invoiceNumber}</Text>
            </View>
            <View style={[commonStyles.row, { marginTop: 12 }]}>
              <Text style={commonStyles.inputLabel}>Date:</Text>
              <Text style={commonStyles.text}>{new Date().toLocaleDateString()}</Text>
            </View>
          </View>
        </View>

        {/* Customer Selection */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Customer Information</Text>
          <TouchableOpacity
            style={[commonStyles.card, commonStyles.row]}
            onPress={handleSelectCustomer}
          >
            {selectedCustomer ? (
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>{selectedCustomer.name}</Text>
                <Text style={commonStyles.textSecondary}>{selectedCustomer.email}</Text>
                <Text style={commonStyles.textSecondary}>{selectedCustomer.phone}</Text>
                <Text style={commonStyles.textSecondary}>{selectedCustomer.address}</Text>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.textSecondary}>Select Customer</Text>
                <Text style={commonStyles.textSecondary}>Tap to choose a customer</Text>
              </View>
            )}
            <Icon name="chevron-forward-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Products */}
        <View style={commonStyles.section}>
          <View style={commonStyles.row}>
            <Text style={commonStyles.subtitle}>Products</Text>
            <TouchableOpacity
              style={[commonStyles.badge, { backgroundColor: colors.primary }]}
              onPress={handleAddProduct}
            >
              <Text style={[commonStyles.badgeText, { color: colors.backgroundAlt }]}>
                Add Product
              </Text>
            </TouchableOpacity>
          </View>

          {items.map((item) => (
            <View key={item.id} style={commonStyles.card}>
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>{item.productName}</Text>
                  <Text style={commonStyles.textSecondary}>SKU: {item.sku}</Text>
                  <Text style={commonStyles.textSecondary}>
                    Unit Price: {formatCurrency(item.unitPrice)}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <Icon name="trash-outline" size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
              
              <View style={[commonStyles.row, { marginTop: 12 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.surface,
                      padding: 8,
                      borderRadius: 6,
                    }}
                    onPress={() => updateItemQuantity(item.id, item.quantity - 1)}
                  >
                    <Icon name="remove-outline" size={16} color={colors.text} />
                  </TouchableOpacity>
                  
                  <Text style={[commonStyles.text, { marginHorizontal: 16, fontWeight: '600' }]}>
                    {item.quantity}
                  </Text>
                  
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.surface,
                      padding: 8,
                      borderRadius: 6,
                    }}
                    onPress={() => updateItemQuantity(item.id, item.quantity + 1)}
                  >
                    <Icon name="add-outline" size={16} color={colors.text} />
                  </TouchableOpacity>
                </View>
                
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {formatCurrency(item.total)}
                </Text>
              </View>
            </View>
          ))}

          {items.length === 0 && (
            <View style={[commonStyles.card, commonStyles.center, { paddingVertical: 32 }]}>
              <Icon name="cube-outline" size={48} color={colors.textSecondary} />
              <Text style={[commonStyles.textSecondary, { marginTop: 12, textAlign: 'center' }]}>
                No products added yet
              </Text>
            </View>
          )}
        </View>

        {/* Payment Method */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Payment Method</Text>
          <View style={commonStyles.card}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.key}
                style={[commonStyles.row, { paddingVertical: 8 }]}
                onPress={() => setPaymentMethod(method.key)}
              >
                <Icon
                  name={paymentMethod === method.key ? "radio-button-on-outline" : "radio-button-off-outline"}
                  size={20}
                  color={paymentMethod === method.key ? colors.primary : colors.textSecondary}
                />
                <Text style={[commonStyles.text, { marginLeft: 12 }]}>{method.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notes */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.inputLabel}>Notes (Optional)</Text>
          <TextInput
            style={[commonStyles.input, { height: 80, textAlignVertical: 'top' }]}
            placeholder="Add any additional notes or terms..."
            value={notes}
            onChangeText={setNotes}
            multiline
          />
        </View>

        {/* Invoice Summary */}
        {items.length > 0 && (
          <View style={[commonStyles.section, { marginBottom: 32 }]}>
            <Text style={commonStyles.subtitle}>Invoice Summary</Text>
            <View style={commonStyles.card}>
              <View style={commonStyles.row}>
                <Text style={commonStyles.text}>Subtotal:</Text>
                <Text style={commonStyles.text}>{formatCurrency(subtotal)}</Text>
              </View>
              <View style={[commonStyles.row, { marginTop: 8 }]}>
                <Text style={commonStyles.text}>TVA ({tvaRate}%):</Text>
                <Text style={commonStyles.text}>{formatCurrency(tvaAmount)}</Text>
              </View>
              <View style={[commonStyles.row, { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border }]}>
                <Text style={[commonStyles.text, { fontWeight: '700', fontSize: 18 }]}>Total:</Text>
                <Text style={[commonStyles.text, { fontWeight: '700', fontSize: 18, color: colors.primary }]}>
                  {formatCurrency(totalAmount)}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
