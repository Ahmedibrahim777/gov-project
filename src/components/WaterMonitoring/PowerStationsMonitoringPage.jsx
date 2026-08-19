import governorates from '../../data/governorates.js'
import SampleMonitoringPage from './SampleMonitoringPage.jsx'

const FUEL_TYPES = ['غاز طبيعي', 'مازوت', 'فحم', 'طاقة متجددة']

// Site / sample identification fields — same layout as the Nile River form.
const SITE_FIELDS = [
  { name: 'stationName', label: 'اسم المحطة', type: 'text', required: true, placeholder: 'مثال: محطة كهرباء شبرا' },
  { name: 'governorate', label: 'المحافظة', type: 'select', required: true, options: governorates },
  { name: 'city', label: 'المدينة', type: 'text', placeholder: 'مثال: شبرا الخيمة' },
  { name: 'monitorDate', label: 'تاريخ الرصد', type: 'date', required: true },
  { name: 'fuelType', label: 'نوع الوقود', type: 'select', options: FUEL_TYPES },
  { name: 'samplesCount', label: 'عدد العينات', type: 'number', step: '1' },
  { name: 'actionTaken', label: 'الإجراء المتخذ', type: 'textarea', placeholder: 'مثال: التنسيق مع إدارة التفتيش بالفرع' }
]

// Emissions / noise limits inspected at power generation stations.
const PARAMETERS = [
  { key: 'so2', label: 'ثاني أكسيد الكبريت SO2', unit: 'ppm', checkType: 'max', max: 100, limitText: '100' },
  { key: 'nox', label: 'أكاسيد النيتروجين NOx', unit: 'ppm', checkType: 'max', max: 150, limitText: '150' },
  { key: 'particulates', label: 'الجسيمات العالقة', unit: 'ملجم/م³', checkType: 'max', max: 50, limitText: '50' },
  { key: 'co', label: 'أول أكسيد الكربون CO', unit: 'ppm', checkType: 'max', max: 100, limitText: '100' },
  { key: 'noiseLevel', label: 'مستوى الضوضاء بالمحطة', unit: 'dB', checkType: 'max', max: 65, limitText: '65' }
]

function PowerStationsMonitoringPage({ onBack }) {
  return (
    <SampleMonitoringPage
      onBack={onBack}
      icon="fa-solid fa-bolt"
      title="رصد محطات الكهرباء"
      desc="تسجيل بيانات موقع الرصد ونتائج قياس الانبعاثات والضوضاء بمحطات توليد الكهرباء."
      letterheadSubtitle="إدارة نوعية المياه والهواء والضوضاء — رصد محطات الكهرباء"
      siteFields={SITE_FIELDS}
      parameters={PARAMETERS}
      sequenceStorageKey="envportal_power_seq"
    />
  )
}

export default PowerStationsMonitoringPage
