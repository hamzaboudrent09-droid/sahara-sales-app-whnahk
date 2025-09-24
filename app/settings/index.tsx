
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Switch } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from '../../components/Icon';

interface BusinessSettings {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  taxId: string;
  currency: string;
  language: string;
  tvaRate: number;
  lowStockThreshold: number;
  enableNotifications: boolean;
  enableAutoBackup: boolean;
}

export default function SettingsScreen() {
  const [settings, setSettings] = useState<BusinessSettings>({
    companyName: 'My Business SARL',
    address: '123 Business Street, Algiers, Algeria',
    phone: '+213 555 123 456',
    email: 'contact@mybusiness.dz',
    taxId: 'NIF123456789',
    currency: 'DZD',
    language: 'en',
    tvaRate: 19,
    lowStockThreshold: 10,
    enableNotifications: true,
    enableAutoBackup: true,
  });

  const currencies = [
    { code: 'DZD', name: 'Algerian Dinar', symbol: 'دج' },
    { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.' },
    { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت' },
    { code: 'EGP', name: 'Egyptian Pound', symbol: 'ج.م' },
    { code: 'LYD', name: 'Libyan Dinar', symbol: 'ل.د' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const updateSetting = (key: keyof BusinessSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    Alert.alert('Settings Saved', 'Your business settings have been updated successfully.');
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Choose export format:',
      [
        { text: 'Excel (.xlsx)', onPress: () => console.log('Export to Excel') },
        { text: 'PDF Report', onPress: () => console.log('Export to PDF') },
        { text: 'CSV Data', onPress: () => console.log('Export to CSV') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleBackupData = () => {
    Alert.alert(
      'Backup Data',
      'This will create a backup of all your business data.',
      [
        { text: 'Create Backup', onPress: () => console.log('Creating backup...') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleRestoreData = () => {
    Alert.alert(
      'Restore Data',
      'This will restore data from a previous backup. Current data will be replaced.',
      [
        { text: 'Choose Backup File', onPress: () => console.log('Choosing backup file...') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightComponent 
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={[commonStyles.card, commonStyles.row]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={{
        backgroundColor: colors.primary + '20',
        padding: 8,
        borderRadius: 8,
        marginRight: 12,
      }}>
        <Icon name={icon as any} size={20} color={colors.primary} />
      </View>
      
      <View style={{ flex: 1 }}>
        <Text style={[commonStyles.text, { fontWeight: '600' }]}>{title}</Text>
        {subtitle && <Text style={commonStyles.textSecondary}>{subtitle}</Text>}
      </View>
      
      {rightComponent || (onPress && <Icon name="chevron-forward-outline" size={20} color={colors.textSecondary} />)}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <View style={commonStyles.row}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.headerTitle, { marginLeft: 16 }]}>Settings</Text>
          <TouchableOpacity onPress={handleSaveSettings}>
            <Icon name="checkmark-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Business Information */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Business Information</Text>
          
          <View style={commonStyles.card}>
            <View style={{ marginBottom: 16 }}>
              <Text style={commonStyles.inputLabel}>Company Name</Text>
              <TextInput
                style={commonStyles.input}
                value={settings.companyName}
                onChangeText={(value) => updateSetting('companyName', value)}
                placeholder="Enter company name"
              />
            </View>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={commonStyles.inputLabel}>Address</Text>
              <TextInput
                style={[commonStyles.input, { height: 60 }]}
                value={settings.address}
                onChangeText={(value) => updateSetting('address', value)}
                placeholder="Enter business address"
                multiline
              />
            </View>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={commonStyles.inputLabel}>Phone Number</Text>
              <TextInput
                style={commonStyles.input}
                value={settings.phone}
                onChangeText={(value) => updateSetting('phone', value)}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={commonStyles.inputLabel}>Email</Text>
              <TextInput
                style={commonStyles.input}
                value={settings.email}
                onChangeText={(value) => updateSetting('email', value)}
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View>
              <Text style={commonStyles.inputLabel}>Tax ID / NIF</Text>
              <TextInput
                style={commonStyles.input}
                value={settings.taxId}
                onChangeText={(value) => updateSetting('taxId', value)}
                placeholder="Enter tax identification number"
              />
            </View>
          </View>
        </View>

        {/* Regional Settings */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Regional Settings</Text>
          
          <SettingItem
            icon="globe-outline"
            title="Currency"
            subtitle={currencies.find(c => c.code === settings.currency)?.name}
            onPress={() => {
              Alert.alert(
                'Select Currency',
                'Choose your business currency',
                currencies.map(currency => ({
                  text: `${currency.symbol} ${currency.name} (${currency.code})`,
                  onPress: () => updateSetting('currency', currency.code)
                }))
              );
            }}
          />
          
          <SettingItem
            icon="language-outline"
            title="Language"
            subtitle={languages.find(l => l.code === settings.language)?.name}
            onPress={() => {
              Alert.alert(
                'Select Language',
                'Choose your preferred language',
                languages.map(lang => ({
                  text: `${lang.flag} ${lang.name}`,
                  onPress: () => updateSetting('language', lang.code)
                }))
              );
            }}
          />
          
          <View style={commonStyles.card}>
            <Text style={commonStyles.inputLabel}>TVA Rate (%)</Text>
            <TextInput
              style={commonStyles.input}
              value={settings.tvaRate.toString()}
              onChangeText={(value) => updateSetting('tvaRate', parseFloat(value) || 0)}
              placeholder="Enter TVA rate"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Inventory Settings */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Inventory Settings</Text>
          
          <View style={commonStyles.card}>
            <Text style={commonStyles.inputLabel}>Low Stock Threshold</Text>
            <TextInput
              style={commonStyles.input}
              value={settings.lowStockThreshold.toString()}
              onChangeText={(value) => updateSetting('lowStockThreshold', parseInt(value) || 0)}
              placeholder="Enter minimum stock level"
              keyboardType="numeric"
            />
            <Text style={[commonStyles.textSecondary, { fontSize: 12, marginTop: 4 }]}>
              You'll be notified when products reach this quantity
            </Text>
          </View>
        </View>

        {/* Notifications */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Notifications</Text>
          
          <SettingItem
            icon="notifications-outline"
            title="Enable Notifications"
            subtitle="Get alerts for low stock and important updates"
            rightComponent={
              <Switch
                value={settings.enableNotifications}
                onValueChange={(value) => updateSetting('enableNotifications', value)}
                trackColor={{ false: colors.border, true: colors.primary + '40' }}
                thumbColor={settings.enableNotifications ? colors.primary : colors.textSecondary}
              />
            }
          />
          
          <SettingItem
            icon="cloud-upload-outline"
            title="Auto Backup"
            subtitle="Automatically backup data daily"
            rightComponent={
              <Switch
                value={settings.enableAutoBackup}
                onValueChange={(value) => updateSetting('enableAutoBackup', value)}
                trackColor={{ false: colors.border, true: colors.primary + '40' }}
                thumbColor={settings.enableAutoBackup ? colors.primary : colors.textSecondary}
              />
            }
          />
        </View>

        {/* Data Management */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Data Management</Text>
          
          <SettingItem
            icon="download-outline"
            title="Export Data"
            subtitle="Export your business data to Excel, PDF, or CSV"
            onPress={handleExportData}
          />
          
          <SettingItem
            icon="cloud-upload-outline"
            title="Backup Data"
            subtitle="Create a backup of all your data"
            onPress={handleBackupData}
          />
          
          <SettingItem
            icon="cloud-download-outline"
            title="Restore Data"
            subtitle="Restore data from a previous backup"
            onPress={handleRestoreData}
          />
        </View>

        {/* About */}
        <View style={[commonStyles.section, { marginBottom: 32 }]}>
          <Text style={commonStyles.subtitle}>About</Text>
          
          <SettingItem
            icon="information-circle-outline"
            title="App Version"
            subtitle="1.0.0 - North African Business Edition"
          />
          
          <SettingItem
            icon="help-circle-outline"
            title="Help & Support"
            subtitle="Get help with using the app"
            onPress={() => Alert.alert('Help', 'Help documentation would open here')}
          />
          
          <SettingItem
            icon="document-text-outline"
            title="Terms & Privacy"
            subtitle="Read our terms of service and privacy policy"
            onPress={() => Alert.alert('Legal', 'Legal documents would open here')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
