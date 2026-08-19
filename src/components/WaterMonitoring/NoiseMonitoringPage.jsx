import governorates from '../../data/governorates.js'
import SampleMonitoringPage from './SampleMonitoringPage.jsx'

const PERIODS = ['فترة صباحية', 'فترة مسائية', 'فترة ليلية']
const ZONE_TYPES = ['منطقة سكنية هادئة', 'منطقة سكنية', 'منطقة تجارية', 'منطقة صناعية']

// Site / sample identification fields — same layout as the Nile River form.
// allowedLimit is entered here (it depends on the zone/period selected by
// the inspector) and is then used as the legal limit for the measured level
// in the results table below.
const SITE_FIELDS = [
  { name: 'location', label: 'موقع الرصد', type: 'text', required: true, placeholder: 'مثال: شارع الهرم' },
  { name: 'governorate', label: 'المحافظة', type: 'select', required: true, options: governorates },
  { name: 'city', label: 'المدينة', type: 'text' },
  { name: 'measureDate', label: 'تاريخ القياس', type: 'date', required: true },
  { name: 'period', label: 'الفترة الزمنية', type: 'select', required: true, options: PERIODS },
  { name: 'zoneType', label: 'نوع المنطقة', type: 'select', required: true, options: ZONE_TYPES },
  { name: 'allowedLimit', label: 'الحد المسموح به (dB)', type: 'number', step: '0.1', required: true },
  { name: 'actionTaken', label: 'الإجراء المتخذ', type: 'textarea', placeholder: 'مثال: التنسيق مع إدارة التفتيش بالفرع' }
]

// A single measured value compared against the allowed limit entered in the
// site fields above (maxFrom references that field's value at submit time).
const PARAMETERS = [
  {
    key: 'measuredLevel',
    label: 'المستوى المقاس',
    unit: 'dB',
    checkType: 'max',
    maxFrom: 'allowedLimit',
    limitText: (siteValues) => (siteValues?.allowedLimit ? `لا يزيد عن ${siteValues.allowedLimit} dB` : '—')
  }
]

function NoiseMonitoringPage({ onBack }) {
  return (
    <SampleMonitoringPage
      onBack={onBack}
      icon="fa-solid fa-volume-high"
      title="رصد ضوضاء"
      desc="تسجيل بيانات موقع الرصد ونتائج قياس مستوى الضوضاء ومقارنتها بالحد المسموح به."
      letterheadSubtitle="إدارة نوعية المياه والهواء والضوضاء — رصد الضوضاء"
      siteFields={SITE_FIELDS}
      parameters={PARAMETERS}
      sequenceStorageKey="envportal_noise_seq"
    />
  )
}

export default NoiseMonitoringPage
