import governorates from './governorates.js'

const monitoringTypes = [
  {
    id: 'nile-river',
    title: 'الرصد الدوري لنهر النيل',
    icon: 'fa-solid fa-water',
    desc: 'تسجيل ومتابعة نتائج العينات الدورية لمياه نهر النيل بمختلف المحافظات.',
    formFields: [
      { name: 'location', label: 'نقطة الرصد', type: 'text', required: true, placeholder: 'مثال: كورنيش المعادي' },
      { name: 'governorate', label: 'المحافظة', type: 'select', required: true, options: governorates },
      { name: 'sampleDate', label: 'تاريخ العينة', type: 'date', required: true },
      { name: 'temperature', label: 'درجة الحرارة (°م)', type: 'number', step: '0.1' },
      { name: 'ph', label: 'الأس الهيدروجيني (pH)', type: 'number', step: '0.1', required: true },
      { name: 'dissolvedOxygen', label: 'الأكسجين الذائب (ملجم/لتر)', type: 'number', step: '0.1' },
      { name: 'turbidity', label: 'العكارة (NTU)', type: 'number', step: '0.1' },
      { name: 'notes', label: 'ملاحظات', type: 'textarea' }
    ],
    tableColumns: [
      { key: 'location', label: 'نقطة الرصد' },
      { key: 'governorate', label: 'المحافظة' },
      { key: 'sampleDate', label: 'التاريخ' },
      { key: 'ph', label: 'pH' },
      { key: 'dissolvedOxygen', label: 'الأكسجين الذائب' }
    ]
  },
  {
    id: 'sewage-stations',
    title: 'رصد محطات الصرف الصحي',
    icon: 'fa-solid fa-industry',
    desc: 'متابعة الأداء التشغيلي والبيئي لمحطات معالجة الصرف الصحي.'
    // Uses the dedicated SewageStationsMonitoringPage (form + printable
    // report flow, same as نهر النيل) — see MonitoringHub's FULL_PAGE_TYPES.
  },
  {
    id: 'power-stations',
    title: 'رصد محطات الكهرباء',
    icon: 'fa-solid fa-bolt',
    desc: 'متابعة الالتزام البيئي لمحطات توليد الكهرباء من حيث الانبعاثات والضوضاء.'
    // Uses the dedicated PowerStationsMonitoringPage (form + printable
    // report flow, same as نهر النيل) — see MonitoringHub's FULL_PAGE_TYPES.
  },
  {
    id: 'canals-drains',
    title: 'رصد الترع والمصارف',
    icon: 'fa-solid fa-water-ladder',
    desc: 'متابعة جودة مياه الترع والمصارف ورصد أي تعديات عليها.',
    formFields: [
      { name: 'name', label: 'اسم الترعة / المصرف', type: 'text', required: true },
      { name: 'governorate', label: 'المحافظة', type: 'select', required: true, options: governorates },
      { name: 'waterBodyType', label: 'نوع المسطح المائي', type: 'select', required: true, options: ['ترعة', 'مصرف'] },
      { name: 'sampleDate', label: 'تاريخ العينة', type: 'date', required: true },
      { name: 'salinity', label: 'درجة الملوحة (جزء/الألف)', type: 'number', step: '0.1' },
      { name: 'dissolvedOxygen', label: 'الأكسجين الذائب (ملجم/لتر)', type: 'number', step: '0.1' },
      {
        name: 'encroachment',
        label: 'وجود تعديات',
        type: 'select',
        required: true,
        options: ['لا يوجد', 'تعدٍ محتمل', 'تعدٍ مؤكد']
      },
      { name: 'notes', label: 'ملاحظات', type: 'textarea' }
    ],
    tableColumns: [
      { key: 'name', label: 'الاسم' },
      { key: 'governorate', label: 'المحافظة' },
      { key: 'waterBodyType', label: 'النوع' },
      { key: 'sampleDate', label: 'التاريخ' },
      { key: 'encroachment', label: 'التعديات' }
    ]
  },
  {
    id: 'air-quality',
    title: 'رصد هواء',
    icon: 'fa-solid fa-wind',
    desc: 'متابعة مؤشرات جودة الهواء بالمحطات الثابتة والمتنقلة.'
    // Uses the dedicated AirQualityMonitoringPage (form + printable
    // report flow, same as نهر النيل) — see MonitoringHub's FULL_PAGE_TYPES.
  },
  {
    id: 'noise',
    title: 'رصد ضوضاء',
    icon: 'fa-solid fa-volume-high',
    desc: 'قياس مستويات الضوضاء بالمناطق السكنية والصناعية ومقارنتها بالحدود المسموح بها.'
    // Uses the dedicated NoiseMonitoringPage (form + printable report flow,
    // same as نهر النيل) — see MonitoringHub's FULL_PAGE_TYPES.
  }
]

// Derives a status badge {text, tone} for a single record based on
// the monitoring type it belongs to. tone is one of 'green' | 'amber' | 'red',
// matching the .badge classes already used across the portal.
export function getRecordStatus(typeId, record) {
  switch (typeId) {
    case 'nile-river': {
      const ph = parseFloat(record.ph)
      if (Number.isNaN(ph)) return { text: 'تم التسجيل', tone: 'green' }
      return ph >= 6.5 && ph <= 8.5
        ? { text: 'ضمن الحدود الطبيعية', tone: 'green' }
        : { text: 'تجاوز الحد المسموح', tone: 'red' }
    }
    case 'sewage-stations': {
      const map = { 'تعمل بكفاءة': 'green', 'تحتاج صيانة': 'amber', 'متوقفة': 'red' }
      return { text: record.operationStatus || 'غير محدد', tone: map[record.operationStatus] || 'amber' }
    }
    case 'power-stations': {
      const map = { 'ملتزم': 'green', 'مخالفة بسيطة': 'amber', 'مخالفة جسيمة': 'red' }
      return { text: record.complianceStatus || 'غير محدد', tone: map[record.complianceStatus] || 'amber' }
    }
    case 'canals-drains': {
      const map = { 'لا يوجد': 'green', 'تعدٍ محتمل': 'amber', 'تعدٍ مؤكد': 'red' }
      return { text: record.encroachment || 'غير محدد', tone: map[record.encroachment] || 'amber' }
    }
    case 'air-quality': {
      const aqi = parseFloat(record.aqi)
      if (Number.isNaN(aqi)) return { text: 'تم التسجيل', tone: 'green' }
      return aqi <= 100
        ? { text: 'جودة مقبولة', tone: 'green' }
        : { text: 'تجاوز الحد المسموح', tone: 'red' }
    }
    case 'noise': {
      const level = parseFloat(record.measuredLevel)
      const limit = parseFloat(record.allowedLimit)
      if (Number.isNaN(level) || Number.isNaN(limit)) return { text: 'تم التسجيل', tone: 'green' }
      return level <= limit
        ? { text: 'ضمن الحد المسموح', tone: 'green' }
        : { text: 'تجاوز الحد المسموح', tone: 'red' }
    }
    default:
      return { text: 'تم التسجيل', tone: 'green' }
  }
}

export default monitoringTypes
