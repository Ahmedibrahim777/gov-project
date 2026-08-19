import governorates from '../../data/governorates.js'
import sewageStationsByGovernorate from '../../data/sewageStations.js'
import SampleMonitoringPage, {
  DISCHARGE_TYPES,
  POSITION_OPTIONS,
  NOTE_OPTIONS
} from './SampleMonitoringPage.jsx'

// Matches the header wording on the official sheet: "الهدف من أخذ العينة
// (الرصد / التفتيش)".
const SAMPLE_PURPOSES = ['رصد', 'تفتيش']

// Governorates that currently have a predefined station list. Other
// governorates still work — the station-name field just falls back to a
// free-text-style single option prompting the user to pick a governorate
// with a configured list, or "أخرى" isn't offered yet, so keep the list
// governorates in sync with sewageStations.js as more stations are added.
const STATION_GOVERNORATES = Object.keys(sewageStationsByGovernorate)

// Site / sample identification fields — mirrors the columns of the official
// "رصد محطات الصرف الصحي" field sheet: موقع أخذ العينة / اسم المنشأة,
// إحداثيات المنشأة (N, E), نوع الصرف, كمية المياه الداخلة والصرف,
// تاريخ وعدد العينات, الهدف من أخذ العينة, الموقف, الإجراء المتخذ.
const SITE_FIELDS = [
  { name: 'governorate', label: 'المحافظة', type: 'select', required: true, options: governorates },
  {
    name: 'stationName',
    label: 'اسم المنشأة (المخطط)',
    type: 'select',
    required: true,
    dependsOn: 'governorate',
    options: (values) =>
      STATION_GOVERNORATES.includes(values.governorate) ? sewageStationsByGovernorate[values.governorate] : []
  },
  { name: 'samplingLocation', label: 'موقع أخذ العينة', type: 'text', placeholder: 'مثال: بوابة دخول المحطة' },
  { name: 'coordN', label: 'إحداثيات المنشأة (N)', type: 'text', placeholder: 'خط العرض' },
  { name: 'coordE', label: 'إحداثيات المنشأة (E)', type: 'text', placeholder: 'خط الطول' },
  { name: 'dischargeType', label: 'نوع الصرف (صناعي/زراعي/صحي)', type: 'select', options: DISCHARGE_TYPES },
  { name: 'incomingWaterQty', label: 'كمية المياه الداخلة (م³/اليوم)', type: 'number', step: '1' },
  { name: 'dischargeQty', label: 'كمية الصرف (م³/اليوم)', type: 'number', step: '1' },
  { name: 'sampleDate', label: 'تاريخ أخذ العينة', type: 'date', required: true },
  { name: 'samplesCount', label: 'عدد العينة', type: 'number', step: '1' },
  { name: 'samplingPurpose', label: 'الهدف من أخذ العينة', type: 'select', options: SAMPLE_PURPOSES },
  { name: 'position', label: 'الموقف', type: 'select', options: POSITION_OPTIONS },
  { name: 'planNote', label: 'ملحوظة', type: 'select', options: NOTE_OPTIONS },
  { name: 'actionTaken', label: 'الإجراء المتخذ', type: 'textarea', placeholder: 'مثال: التنسيق مع إدارة التفتيش بالفرع' }
]

function SewageStationsMonitoringPage({ onBack }) {
  return (
    <SampleMonitoringPage
      onBack={onBack}
      icon="fa-solid fa-industry"
      title="رصد محطات الصرف الصحي"
      desc="تسجيل بيانات موقع أخذ العينة ونتائج التحليل المعملي لمحطات معالجة الصرف الصحي."
      letterheadSubtitle="إدارة نوعية المياه والهواء والضوضاء — رصد محطات الصرف الصحي"
      siteFields={SITE_FIELDS}
      sequenceStorageKey="envportal_sewage_seq"
    />
  )
}

export default SewageStationsMonitoringPage
