import governorates from '../../data/governorates.js'
import SampleMonitoringPage, {
  DISCHARGE_TYPES,
  SAMPLING_PURPOSES,
  POSITION_OPTIONS,
  NOTE_OPTIONS
} from './SampleMonitoringPage.jsx'

// Site / sample identification fields — same layout used for the Nile River
// monitoring form, kept identical here as requested.
const SITE_FIELDS = [
  { name: 'facilityName', label: 'موقع أخذ العينة / اسم المنشأة', type: 'text', required: true, placeholder: 'مثال: ترعة المنصورية' },
  { name: 'governorate', label: 'المحافظة', type: 'select', required: true, options: governorates },
  { name: 'coordN', label: 'إحداثيات المنشأة (N)', type: 'text', placeholder: 'خط العرض' },
  { name: 'coordE', label: 'إحداثيات المنشأة (E)', type: 'text', placeholder: 'خط الطول' },
  { name: 'dischargeType', label: 'نوع الصرف', type: 'select', options: DISCHARGE_TYPES },
  { name: 'incomingWaterQty', label: 'كمية المياه الداخلة (م³/اليوم)', type: 'number', step: '1' },
  { name: 'dischargeQty', label: 'كمية الصرف (م³/اليوم)', type: 'number', step: '1' },
  { name: 'sampleDate', label: 'تاريخ أخذ العينة', type: 'date', required: true },
  { name: 'samplesCount', label: 'عدد العينات', type: 'number', step: '1' },
  { name: 'samplingPurpose', label: 'الهدف من أخذ العينة', type: 'select', options: SAMPLING_PURPOSES },
  { name: 'position', label: 'الموقف', type: 'select', options: POSITION_OPTIONS },
  { name: 'planNote', label: 'ملحوظة', type: 'select', options: NOTE_OPTIONS },
  { name: 'actionTaken', label: 'الإجراء المتخذ', type: 'textarea', placeholder: 'مثال: التنسيق مع إدارة التفتيش بالفرع' }
]

function CanalsDrainsMonitoringPage({ onBack }) {
  return (
    <SampleMonitoringPage
      onBack={onBack}
      icon="fa-solid fa-water-ladder"
      title="رصد الترع والمصارف"
      desc="تسجيل بيانات موقع أخذ العينة ونتائج التحليل المعملي لمياه الترع والمصارف."
      letterheadSubtitle="إدارة نوعية المياه والهواء والضوضاء — رصد الترع والمصارف"
      siteFields={SITE_FIELDS}
    />
  )
}

export default CanalsDrainsMonitoringPage
