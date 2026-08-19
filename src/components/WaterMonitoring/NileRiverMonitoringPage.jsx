import governorates from '../../data/governorates.js'
import nileMonitoringPoints from '../../data/nileMonitoringPoints.js'
import SampleMonitoringPage, {
  DISCHARGE_TYPES,
  SAMPLING_PURPOSES,
  POSITION_OPTIONS,
  NOTE_OPTIONS,
  POLLUTION_SOURCES
} from './SampleMonitoringPage.jsx'

// Site / sample identification fields for the Nile River monitoring form.
// Extended with: المدينة، اسم نقطة الرصد، الموقع الجغرافي، مصدر التلوث —
// to match the official field inspection sheet.
// نقطة الرصد تُختار من القائمة الرسمية المكونة من 18 نقطة رصد على النيل.
const SITE_FIELDS = [
  { name: 'governorate', label: 'المحافظة', type: 'select', required: true, options: governorates },
  { name: 'city', label: 'المدينة', type: 'text', required: true, placeholder: 'مثال: الصف' },
  { name: 'monitoringPointName', label: 'أسم نقطة الرصد', type: 'select', required: true, options: nileMonitoringPoints },
  { name: 'coordN', label: 'الموقع الجغرافي (N)', type: 'text', placeholder: 'مثال: 29,342' },
  { name: 'coordE', label: 'الموقع الجغرافي (E)', type: 'text', placeholder: 'مثال: 31,165' },
  { name: 'dischargeType', label: 'نوع الصرف', type: 'select', options: DISCHARGE_TYPES },
  { name: 'incomingWaterQty', label: 'كمية المياه الداخلة (م³/اليوم)', type: 'number', step: '1' },
  { name: 'dischargeQty', label: 'كمية الصرف (م³/اليوم)', type: 'number', step: '1' },
  { name: 'sampleDate', label: 'تاريخ اخذ العينة', type: 'date', required: true },
  { name: 'samplesCount', label: 'عدد العينات', type: 'number', step: '1' },
  { name: 'samplingPurpose', label: 'الهدف من أخذ العينة', type: 'select', options: SAMPLING_PURPOSES },
  { name: 'position', label: 'الموقف', type: 'select', options: POSITION_OPTIONS },
  { name: 'pollutionSource', label: 'مصدر التلوث', type: 'select', options: POLLUTION_SOURCES },
  { name: 'pollutionSourceDetail', label: 'تفاصيل مصدر التلوث', type: 'text', placeholder: 'مثال: صناعي على مسافة 20 متر' },
  { name: 'planNote', label: 'ملحوظة', type: 'select', options: NOTE_OPTIONS },
  { name: 'actionTaken', label: 'الإجراء المتخذ', type: 'textarea', placeholder: 'مثال: التنسيق مع إدارة التفتيش بالفرع' }
]

function NileRiverMonitoringPage({ onBack }) {
  return (
    <SampleMonitoringPage
      onBack={onBack}
      icon="fa-solid fa-water"
      title="الرصد الدوري لنهر النيل"
      desc="تسجيل بيانات موقع أخذ العينة ونتائج التحليل المعملي لمياه نهر النيل."
      letterheadSubtitle="إدارة نوعية المياه والهواء والضوضاء — الرصد الدوري لنهر النيل"
      siteFields={SITE_FIELDS}
      sequenceStorageKey="envportal_nile_seq"
    />
  )
}

export default NileRiverMonitoringPage
