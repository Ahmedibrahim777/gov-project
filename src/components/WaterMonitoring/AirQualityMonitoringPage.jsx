import governorates from '../../data/governorates.js'
import SampleMonitoringPage from './SampleMonitoringPage.jsx'

const STATION_TYPES = ['محطة ثابتة', 'محطة متنقلة']

// Site / sample identification fields — same layout as the Nile River form.
const SITE_FIELDS = [
  { name: 'station', label: 'محطة الرصد', type: 'text', required: true, placeholder: 'مثال: محطة رصد القاهرة الكبرى' },
  { name: 'governorate', label: 'المحافظة', type: 'select', required: true, options: governorates },
  { name: 'city', label: 'المدينة', type: 'text' },
  { name: 'stationType', label: 'نوع المحطة', type: 'select', options: STATION_TYPES },
  { name: 'measureDate', label: 'تاريخ القياس', type: 'date', required: true },
  { name: 'actionTaken', label: 'الإجراء المتخذ', type: 'textarea', placeholder: 'مثال: التنسيق مع إدارة التفتيش بالفرع' }
]

// Ambient air quality indicators and their legal limits.
const PARAMETERS = [
  { key: 'pm25', label: 'تركيز PM2.5', unit: 'ميكروجرام/م³', checkType: 'max', max: 35, limitText: '35' },
  { key: 'pm10', label: 'تركيز PM10', unit: 'ميكروجرام/م³', checkType: 'max', max: 70, limitText: '70' },
  { key: 'so2', label: 'ثاني أكسيد الكبريت SO2', unit: 'ميكروجرام/م³', checkType: 'max', max: 150, limitText: '150' },
  { key: 'no2', label: 'ثاني أكسيد النيتروجين NO2', unit: 'ميكروجرام/م³', checkType: 'max', max: 150, limitText: '150' },
  { key: 'co', label: 'أول أكسيد الكربون CO', unit: 'ملجم/م³', checkType: 'max', max: 10, limitText: '10' },
  { key: 'aqi', label: 'مؤشر جودة الهواء AQI', unit: '—', checkType: 'max', max: 100, limitText: '100' }
]

function AirQualityMonitoringPage({ onBack }) {
  return (
    <SampleMonitoringPage
      onBack={onBack}
      icon="fa-solid fa-wind"
      title="رصد هواء"
      desc="تسجيل بيانات موقع الرصد ونتائج قياس مؤشرات جودة الهواء بالمحطات الثابتة والمتنقلة."
      letterheadSubtitle="إدارة نوعية المياه والهواء والضوضاء — رصد جودة الهواء"
      siteFields={SITE_FIELDS}
      parameters={PARAMETERS}
      sequenceStorageKey="envportal_air_seq"
    />
  )
}

export default AirQualityMonitoringPage
