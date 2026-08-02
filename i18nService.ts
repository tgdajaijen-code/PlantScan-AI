import { LanguageCode } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  scanNow: string;
  history: string;
  favorites: string;
  profile: string;
  settings: string;
  search: string;
  map: string;
  reminders: string;
  waterReminder: string;
  fertilizeReminder: string;
  lightNeeds: string;
  healthDiagnosis: string;
  healthy: string;
  diseased: string;
  pestInfested: string;
  medicinalUses: string;
  careGuide: string;
  toxicity: string;
  edible: string;
  nonEdible: string;
  confidence: string;
  exportData: string;
  deleteAccount: string;
  language: string;
  login: string;
  signUp: string;
  logout: string;
  authNotice: string;
}

const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    appName: 'PlantScan AI',
    tagline: 'Botanical Vision System & Care Guide',
    scanNow: 'Scan Plant',
    history: 'Scan History',
    favorites: 'Favorites',
    profile: 'Profile',
    settings: 'Settings',
    search: 'Search Plants',
    map: 'Discovery Map',
    reminders: 'Care Reminders',
    waterReminder: 'Watering Schedule',
    fertilizeReminder: 'Fertilizer Routine',
    lightNeeds: 'Sunlight Exposure',
    healthDiagnosis: 'AI Health Diagnosis',
    healthy: 'Optimal Health',
    diseased: 'Fungal or Spot Disease',
    pestInfested: 'Pest Infestation Warning',
    medicinalUses: 'Medicinal Benefits',
    careGuide: 'Care Requirements',
    toxicity: 'Pet Toxicity Alert',
    edible: 'Safe for Consumption',
    nonEdible: 'Toxic / Non-Edible',
    confidence: 'AI Match Confidence',
    exportData: 'Export Personal Data (JSON)',
    deleteAccount: 'Delete Account & Data',
    language: 'App Language',
    login: 'Sign In',
    signUp: 'Create Account',
    logout: 'Sign Out',
    authNotice: 'Firebase Authentication Ready'
  },
  fr: {
    appName: 'PlantScan AI',
    tagline: 'Système de Vision Botanique & Guide de Soins',
    scanNow: 'Scanner la Plante',
    history: 'Historique',
    favorites: 'Favoris',
    profile: 'Profil',
    settings: 'Paramètres',
    search: 'Rechercher des Plantes',
    map: 'Carte des Découvertes',
    reminders: 'Rappels d\'Entretien',
    waterReminder: 'Calendrier d\'Arrosage',
    fertilizeReminder: 'Programme d\'Engrais',
    lightNeeds: 'Exposition au Soleil',
    healthDiagnosis: 'Diagnostic de Santé IA',
    healthy: 'Santé Optimale',
    diseased: 'Maladie Fongique ou Taches',
    pestInfested: 'Alerte d\'Invasion de Nuisibles',
    medicinalUses: 'Vertus Médicinales',
    careGuide: 'Guide de Soins',
    toxicity: 'Toxicité pour Animaux',
    edible: 'Comestible',
    nonEdible: 'Toxique / Non-Comestible',
    confidence: 'Confiance IA',
    exportData: 'Exporter les Données (JSON)',
    deleteAccount: 'Supprimer le Compte',
    language: 'Langue de l\'application',
    login: 'Se Connecter',
    signUp: 'Créer un Compte',
    logout: 'Se Déconnecter',
    authNotice: 'Prêt pour l\'authentification Firebase'
  },
  es: {
    appName: 'PlantScan AI',
    tagline: 'Sistema de Visión Botánica y Guía de Cuidados',
    scanNow: 'Escanear Planta',
    history: 'Historial',
    favorites: 'Favoritos',
    profile: 'Perfil',
    settings: 'Ajustes',
    search: 'Buscar Plantas',
    map: 'Mapa de Descubrimientos',
    reminders: 'Recordatorios',
    waterReminder: 'Calendario de Riego',
    fertilizeReminder: 'Rutina de Fertilizante',
    lightNeeds: 'Luz Solar Requerida',
    healthDiagnosis: 'Diagnóstico de Salud IA',
    healthy: 'Salud Óptima',
    diseased: 'Enfermedad Hongos o Manchas',
    pestInfested: 'Alerta de Plaga',
    medicinalUses: 'Propiedades Medicinales',
    careGuide: 'Guía de Cuidados',
    toxicity: 'Toxicidad Mascotas',
    edible: 'Comestible',
    nonEdible: 'Tóxico / No Comestible',
    confidence: 'Confianza IA',
    exportData: 'Exportar Datos (JSON)',
    deleteAccount: 'Eliminar Cuenta',
    language: 'Idioma de la App',
    login: 'Iniciar Sesión',
    signUp: 'Registrarse',
    logout: 'Cerrar Sesión',
    authNotice: 'Autenticación de Firebase Lista'
  },
  pt: {
    appName: 'PlantScan AI',
    tagline: 'Sistema de Visão Botânica e Guia de Cuidados',
    scanNow: 'Escanear Planta',
    history: 'Histórico',
    favorites: 'Favoritos',
    profile: 'Perfil',
    settings: 'Configurações',
    search: 'Buscar Plantas',
    map: 'Mapa de Descobertas',
    reminders: 'Lembretes de Cuidado',
    waterReminder: 'Agenda de Rega',
    fertilizeReminder: 'Rotina de Adubação',
    lightNeeds: 'Luz Solar',
    healthDiagnosis: 'Diagnóstico de Saúde IA',
    healthy: 'Saúde Perfeita',
    diseased: 'Doença Fúngica ou Manchas',
    pestInfested: 'Alerta de Pragas',
    medicinalUses: 'Benefícios Medicinais',
    careGuide: 'Guia de Cultivo',
    toxicity: 'Toxicidade para Pets',
    edible: 'Comestível',
    nonEdible: 'Tóxico / Não Comestível',
    confidence: 'Precisão IA',
    exportData: 'Exportar Dados (JSON)',
    deleteAccount: 'Excluir Conta',
    language: 'Idioma do App',
    login: 'Entrar',
    signUp: 'Criar Conta',
    logout: 'Sair',
    authNotice: 'Autenticação Firebase Pronta'
  },
  ar: {
    appName: 'PlantScan AI',
    tagline: 'نظام الرؤية النباتية ودليل العناية',
    scanNow: 'مسح النبات',
    history: 'سجل السجل',
    favorites: 'المفضلة',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    search: 'البحث عن النباتات',
    map: 'خريطة الاكتشافات',
    reminders: 'تذكيرات العناية',
    waterReminder: 'جدول الري',
    fertilizeReminder: 'جدول التسميد',
    lightNeeds: 'احتياجات أ his الشمس',
    healthDiagnosis: 'تشخيص الصحة بالذكاء الاصطناعي',
    healthy: 'صحة ممتازة',
    diseased: 'مرض فطري أو بقع',
    pestInfested: 'تحذير من الآفات',
    medicinalUses: 'الفوائد الطبية',
    careGuide: 'دليل العناية',
    toxicity: 'سمية الحيوانات الأليفة',
    edible: 'صالح للأكل',
    nonEdible: 'سام / غير صالح للأكل',
    confidence: 'دقة الذكاء الاصطناعي',
    exportData: 'تصدير البيانات (JSON)',
    deleteAccount: 'حذف الحساب',
    language: 'لغة التطبيق',
    login: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    authNotice: 'جاهز لمصادقة Firebase'
  }
};

export const getTranslation = (lang: LanguageCode): Translations => {
  return TRANSLATIONS[lang] || TRANSLATIONS['en'];
};
