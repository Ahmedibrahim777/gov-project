const departments = [
  {
    id: 1,
    name: 'إدارة نوعية المياه والهواء والضوضاء',
    short: 'نوعية المياه والهواء',
    icon: 'fa-solid fa-wind',
    desc: 'رصد ومتابعة مؤشرات جودة المياه والهواء ومستويات الضوضاء بالمحافظات، وإصدار التقارير الدورية للحد من مصادر التلوث.',
    hasMonitoringHub: true,
    stats: [
      { label: 'محطات الرصد النشطة', value: '128', icon: 'fa-solid fa-tower-broadcast', trend: 'up', trendVal: '4%' },
      { label: 'عينات هذا الشهر', value: '842', icon: 'fa-solid fa-vial', trend: 'up', trendVal: '12%' },
      { label: 'بلاغات تلوث هواء', value: '37', icon: 'fa-solid fa-smog', trend: 'down', trendVal: '6%' },
      { label: 'نسبة الالتزام بالمعايير', value: '91%', icon: 'fa-solid fa-gauge-high', trend: 'up', trendVal: '2%' }
    ],
    tableTitle: 'أحدث نتائج الرصد',
    tableCols: ['المحطة', 'المحافظة', 'المؤشر', 'الحالة'],
    tableRows: [
      ['محطة القاهرة الكبرى', 'القاهرة', 'جودة الهواء', { text: 'ضمن الحدود', tone: 'green' }],
      ['محطة كورنيش الإسكندرية', 'الإسكندرية', 'جودة المياه', { text: 'تحت المراجعة', tone: 'amber' }],
      ['محطة العاشر من رمضان', 'الشرقية', 'مستوى الضوضاء', { text: 'تجاوز الحد', tone: 'red' }],
      ['محطة أسوان الصناعية', 'أسوان', 'جودة الهواء', { text: 'ضمن الحدود', tone: 'green' }]
    ],
    quick: [
      { t: 'تسجيل عينة جديدة', d: 'إدخال بيانات عينة مياه أو هواء ميدانية.', icon: 'fa-solid fa-flask-vial' },
      { t: 'إصدار تقرير شهري', d: 'توليد تقرير مؤشرات الجودة الشامل.', icon: 'fa-solid fa-file-lines' },
      { t: 'متابعة بلاغ', d: 'عرض وتحديث حالة بلاغات المواطنين.', icon: 'fa-solid fa-triangle-exclamation' }
    ]
  },
  {
    id: 2,
    name: 'إدارة المخلفات الصلبة والخطرة',
    short: 'المخلفات الصلبة والخطرة',
    icon: 'fa-solid fa-dumpster',
    desc: 'الإشراف على منظومة جمع وتدوير المخلفات الصلبة، وترخيص ومتابعة منشآت التعامل مع المخلفات الخطرة.',
    stats: [
      { label: 'منشآت مرخصة', value: '316', icon: 'fa-solid fa-industry', trend: 'up', trendVal: '3%' },
      { label: 'أطنان مخلفات مُعالجة', value: '5,240', icon: 'fa-solid fa-recycle', trend: 'up', trendVal: '9%' },
      { label: 'مخالفات مسجلة', value: '14', icon: 'fa-solid fa-file-circle-exclamation', trend: 'down', trendVal: '11%' },
      { label: 'طلبات ترخيص معلقة', value: '22', icon: 'fa-solid fa-hourglass-half', trend: 'up', trendVal: '5%' }
    ],
    tableTitle: 'طلبات ترخيص قيد المراجعة',
    tableCols: ['اسم المنشأة', 'نوع النشاط', 'تاريخ التقديم', 'الحالة'],
    tableRows: [
      ['مصنع النور للبلاستيك', 'إعادة تدوير', '2026-06-28', { text: 'قيد المراجعة', tone: 'amber' }],
      ['شركة المدى للمخلفات الطبية', 'مخلفات خطرة', '2026-06-30', { text: 'مستندات ناقصة', tone: 'red' }],
      ['منشأة الدلتا الصناعية', 'تجميع مخلفات صلبة', '2026-07-02', { text: 'معتمد مبدئياً', tone: 'green' }]
    ],
    quick: [
      { t: 'طلب ترخيص جديد', d: 'تسجيل طلب ترخيص منشأة تعامل مع المخلفات.', icon: 'fa-solid fa-file-circle-plus' },
      { t: 'جدولة تفتيش', d: 'تحديد موعد زيارة تفتيشية لمنشأة.', icon: 'fa-solid fa-magnifying-glass-location' },
      { t: 'سجل المخالفات', d: 'عرض المخالفات المسجلة والإجراءات المتخذة.', icon: 'fa-solid fa-gavel' }
    ]
  },
  {
    id: 3,
    name: 'إدارة المناطق الساحلية والبحيرات',
    short: 'المناطق الساحلية والبحيرات',
    icon: 'fa-solid fa-water',
    desc: 'حماية النظم البيئية الساحلية والبحيرات، ومتابعة مشروعات التنمية بالمناطق الساحلية بما يحافظ على التوازن البيئي.',
    stats: [
      { label: 'مواقع محمية', value: '46', icon: 'fa-solid fa-shield-halved', trend: 'up', trendVal: '1%' },
      { label: 'مساحة مراقبة (كم²)', value: '1,870', icon: 'fa-solid fa-map', trend: 'up', trendVal: '2%' },
      { label: 'تعديات مرصودة', value: '9', icon: 'fa-solid fa-person-digging', trend: 'down', trendVal: '14%' },
      { label: 'مشروعات قيد التقييم', value: '18', icon: 'fa-solid fa-diagram-project', trend: 'up', trendVal: '6%' }
    ],
    tableTitle: 'مواقع تحت المتابعة',
    tableCols: ['الموقع', 'المحافظة', 'نوع الرصد', 'الحالة'],
    tableRows: [
      ['بحيرة البردويل', 'شمال سيناء', 'تنوع بيولوجي', { text: 'مستقر', tone: 'green' }],
      ['ساحل مطروح الشمالي', 'مطروح', 'تعديات بناء', { text: 'يتطلب تدخل', tone: 'red' }],
      ['بحيرة المنزلة', 'دمياط', 'جودة المياه', { text: 'تحت المراجعة', tone: 'amber' }]
    ],
    quick: [
      { t: 'رصد تعدٍ ساحلي', d: 'تسجيل حالة تعدٍ على منطقة ساحلية محمية.', icon: 'fa-solid fa-location-crosshairs' },
      { t: 'تقرير حالة بحيرة', d: 'إصدار تقرير دوري عن حالة إحدى البحيرات.', icon: 'fa-solid fa-file-waveform' },
      { t: 'خريطة المناطق المحمية', d: 'عرض الخريطة التفاعلية للمواقع.', icon: 'fa-solid fa-map-location-dot' }
    ]
  },
  {
    id: 4,
    name: 'إدارة تقييم الأثر البيئي',
    short: 'تقييم الأثر البيئي',
    icon: 'fa-solid fa-clipboard-check',
    desc: 'دراسة ومراجعة تقارير تقييم الأثر البيئي للمشروعات الجديدة، وإصدار الموافقات البيئية اللازمة قبل التنفيذ.',
    stats: [
      { label: 'دراسات قيد المراجعة', value: '63', icon: 'fa-solid fa-book-open', trend: 'up', trendVal: '7%' },
      { label: 'موافقات صدرت هذا الشهر', value: '29', icon: 'fa-solid fa-stamp', trend: 'up', trendVal: '10%' },
      { label: 'طلبات مرفوضة', value: '5', icon: 'fa-solid fa-ban', trend: 'down', trendVal: '3%' },
      { label: 'متوسط مدة المراجعة (يوم)', value: '21', icon: 'fa-regular fa-clock', trend: 'down', trendVal: '8%' }
    ],
    tableTitle: 'دراسات تقييم الأثر الحديثة',
    tableCols: ['اسم المشروع', 'القطاع', 'تاريخ التقديم', 'الحالة'],
    tableRows: [
      ['محطة طاقة شمسية - أسوان', 'طاقة متجددة', '2026-06-20', { text: 'موافقة نهائية', tone: 'green' }],
      ['مجمع سياحي - البحر الأحمر', 'سياحة', '2026-06-25', { text: 'مراجعة فنية', tone: 'amber' }],
      ['مصنع أسمنت - المنيا', 'صناعة', '2026-07-01', { text: 'مستندات إضافية مطلوبة', tone: 'red' }]
    ],
    quick: [
      { t: 'تقديم دراسة جديدة', d: 'استقبال دراسة تقييم أثر بيئي لمشروع.', icon: 'fa-solid fa-file-circle-plus' },
      { t: 'جدولة لجنة فنية', d: 'تحديد موعد اجتماع لجنة المراجعة الفنية.', icon: 'fa-solid fa-people-group' },
      { t: 'إصدار موافقة بيئية', d: 'توليد خطاب الموافقة البيئية الرسمي.', icon: 'fa-solid fa-stamp' }
    ]
  },
  {
    id: 5,
    name: 'إدارة الشئون القانونية',
    short: 'الشئون القانونية',
    icon: 'fa-solid fa-scale-balanced',
    desc: 'إعداد ومراجعة الصياغات القانونية، ومتابعة القضايا والمخالفات البيئية بالتنسيق مع الجهات القضائية المختصة.',
    stats: [
      { label: 'قضايا قائمة', value: '41', icon: 'fa-solid fa-gavel', trend: 'up', trendVal: '4%' },
      { label: 'مخالفات محررة', value: '58', icon: 'fa-solid fa-file-signature', trend: 'up', trendVal: '9%' },
      { label: 'قضايا مغلقة هذا الربع', value: '17', icon: 'fa-solid fa-square-check', trend: 'up', trendVal: '6%' },
      { label: 'استشارات قانونية', value: '33', icon: 'fa-solid fa-comments', trend: 'down', trendVal: '2%' }
    ],
    tableTitle: 'القضايا الجارية',
    tableCols: ['رقم القضية', 'الموضوع', 'الجهة المعنية', 'الحالة'],
    tableRows: [
      ['ENV-2026-114', 'تعدٍ على أرض زراعية', 'شركة خاصة', { text: 'قيد النظر', tone: 'amber' }],
      ['ENV-2026-108', 'مخالفة تصريف صناعي', 'مصنع كيماويات', { text: 'إحالة للنيابة', tone: 'red' }],
      ['ENV-2026-095', 'تظلم ترخيص', 'منشأة تجارية', { text: 'تم البت', tone: 'green' }]
    ],
    quick: [
      { t: 'تحرير مخالفة', d: 'تسجيل محضر مخالفة بيئية جديد.', icon: 'fa-solid fa-file-pen' },
      { t: 'طلب استشارة قانونية', d: 'إرسال استفسار قانوني لإدارة الشئون القانونية.', icon: 'fa-solid fa-comments' },
      { t: 'متابعة قضية', d: 'عرض آخر مستجدات إحدى القضايا.', icon: 'fa-solid fa-folder-open' }
    ]
  },
  {
    id: 6,
    name: 'إدارة الإعلام والتوعية البيئية والتدريب',
    short: 'الإعلام والتوعية والتدريب',
    icon: 'fa-solid fa-bullhorn',
    desc: 'تنظيم الحملات التوعوية والبرامج التدريبية، وإدارة المحتوى الإعلامي لنشر الثقافة البيئية بين المواطنين والمؤسسات.',
    stats: [
      { label: 'حملات توعية نشطة', value: '12', icon: 'fa-solid fa-bullhorn', trend: 'up', trendVal: '15%' },
      { label: 'دورات تدريبية', value: '27', icon: 'fa-solid fa-chalkboard-user', trend: 'up', trendVal: '8%' },
      { label: 'متدربون مسجلون', value: '1,340', icon: 'fa-solid fa-user-graduate', trend: 'up', trendVal: '11%' },
      { label: 'مواد إعلامية منشورة', value: '64', icon: 'fa-solid fa-photo-film', trend: 'up', trendVal: '5%' }
    ],
    tableTitle: 'الفعاليات القادمة',
    tableCols: ['اسم الفعالية', 'الفئة المستهدفة', 'التاريخ', 'الحالة'],
    tableRows: [
      ['حملة نظافة الشواطئ', 'طلاب جامعات', '2026-07-22', { text: 'مؤكدة', tone: 'green' }],
      ['ورشة الاقتصاد الأخضر', 'موظفو القطاع الخاص', '2026-07-25', { text: 'قيد التجهيز', tone: 'amber' }],
      ['دورة تدريب مفتشين بيئيين', 'موظفو الجهاز', '2026-08-02', { text: 'مؤكدة', tone: 'green' }]
    ],
    quick: [
      { t: 'إنشاء حملة توعية', d: 'تخطيط حملة توعية بيئية جديدة.', icon: 'fa-solid fa-square-plus' },
      { t: 'جدولة دورة تدريبية', d: 'إضافة دورة تدريبية جديدة للتقويم.', icon: 'fa-solid fa-calendar-plus' },
      { t: 'نشر محتوى إعلامي', d: 'رفع مادة إعلامية أو تقرير توعوي.', icon: 'fa-solid fa-upload' }
    ]
  },
  {
    id: 7,
    name: 'إدارة خدمات المواطنين',
    short: 'خدمات المواطنين',
    icon: 'fa-solid fa-users',
    desc: 'استقبال ومتابعة طلبات وشكاوى المواطنين المتعلقة بالشأن البيئي، وتقديم الخدمات الإلكترونية المباشرة لهم.',
    stats: [
      { label: 'طلبات هذا الشهر', value: '512', icon: 'fa-solid fa-inbox', trend: 'up', trendVal: '18%' },
      { label: 'شكاوى تم حلها', value: '389', icon: 'fa-solid fa-circle-check', trend: 'up', trendVal: '9%' },
      { label: 'متوسط زمن الاستجابة (ساعة)', value: '36', icon: 'fa-regular fa-clock', trend: 'down', trendVal: '12%' },
      { label: 'معدل رضا المستفيدين', value: '88%', icon: 'fa-regular fa-face-smile', trend: 'up', trendVal: '3%' }
    ],
    tableTitle: 'أحدث طلبات المواطنين',
    tableCols: ['رقم الطلب', 'نوع الطلب', 'المحافظة', 'الحالة'],
    tableRows: [
      ['REQ-88421', 'بلاغ تلوث ضوضاء', 'الجيزة', { text: 'قيد المعالجة', tone: 'amber' }],
      ['REQ-88405', 'استعلام ترخيص', 'القليوبية', { text: 'تم الرد', tone: 'green' }],
      ['REQ-88390', 'شكوى مخلفات', 'الإسكندرية', { text: 'متأخر', tone: 'red' }]
    ],
    quick: [
      { t: 'تسجيل شكوى جديدة', d: 'إدخال بيانات شكوى أو بلاغ من مواطن.', icon: 'fa-solid fa-square-plus' },
      { t: 'الرد على استفسار', d: 'متابعة والرد على استفسارات المواطنين.', icon: 'fa-solid fa-reply' },
      { t: 'تقرير الأداء الشهري', d: 'عرض مؤشرات أداء خدمة المواطنين.', icon: 'fa-solid fa-chart-line' }
    ]
  },
  {
    id: 8,
    name: 'إدارة حماية الأرض والتربة',
    short: 'حماية الأرض والتربة',
    icon: 'fa-solid fa-seedling',
    desc: 'مكافحة التصحر والتعدي على الأراضي الزراعية، ومتابعة برامج تحسين جودة التربة والحد من التلوث الزراعي والصناعي.',
    stats: [
      { label: 'مساحة محمية (فدان)', value: '9,650', icon: 'fa-solid fa-tractor', trend: 'up', trendVal: '2%' },
      { label: 'حالات تعدٍ مرصودة', value: '21', icon: 'fa-solid fa-person-digging', trend: 'down', trendVal: '7%' },
      { label: 'عينات تربة مفحوصة', value: '310', icon: 'fa-solid fa-vial-circle-check', trend: 'up', trendVal: '13%' },
      { label: 'مشروعات استصلاح', value: '14', icon: 'fa-solid fa-leaf', trend: 'up', trendVal: '5%' }
    ],
    tableTitle: 'حالات تعدٍ قيد المتابعة',
    tableCols: ['الموقع', 'المحافظة', 'نوع التعدي', 'الحالة'],
    tableRows: [
      ['أراضي البحيرة الشرقية', 'البحيرة', 'بناء مخالف', { text: 'إحالة قانونية', tone: 'red' }],
      ['أراضي كوم أمبو', 'أسوان', 'ردم زراعي', { text: 'تحت المعاينة', tone: 'amber' }],
      ['أراضي دمياط الجديدة', 'دمياط', 'تلوث صناعي', { text: 'تمت المعالجة', tone: 'green' }]
    ],
    quick: [
      { t: 'رصد تعدٍ على أرض', d: 'تسجيل حالة تعدٍ جديدة على أرض زراعية.', icon: 'fa-solid fa-location-crosshairs' },
      { t: 'طلب فحص تربة', d: 'تسجيل طلب فحص عينة تربة ميدانية.', icon: 'fa-solid fa-vial' },
      { t: 'تقرير مكافحة التصحر', d: 'عرض تقرير برامج مكافحة التصحر.', icon: 'fa-solid fa-chart-area' }
    ]
  },
  {
    id: 9,
    name: 'إدارة المعامل',
    short: 'المعامل',
    icon: 'fa-solid fa-flask',
    desc: 'إدارة المعامل المركزية والفرعية التابعة للجهاز، ومتابعة نتائج التحاليل المعملية للعينات البيئية المختلفة.',
    stats: [
      { label: 'معامل معتمدة', value: '18', icon: 'fa-solid fa-flask-vial', trend: 'up', trendVal: '1%' },
      { label: 'تحاليل هذا الشهر', value: '1,204', icon: 'fa-solid fa-microscope', trend: 'up', trendVal: '14%' },
      { label: 'نتائج متأخرة', value: '9', icon: 'fa-regular fa-clock', trend: 'down', trendVal: '10%' },
      { label: 'معدل دقة النتائج', value: '98.4%', icon: 'fa-solid fa-check-double', trend: 'up', trendVal: '1%' }
    ],
    tableTitle: 'أحدث نتائج التحاليل',
    tableCols: ['رقم العينة', 'نوع التحليل', 'المعمل', 'الحالة'],
    tableRows: [
      ['LAB-30291', 'تحليل مياه شرب', 'المعمل المركزي - القاهرة', { text: 'مطابق', tone: 'green' }],
      ['LAB-30288', 'تحليل انبعاثات غازية', 'معمل الإسكندرية', { text: 'قيد الفحص', tone: 'amber' }],
      ['LAB-30275', 'تحليل تربة زراعية', 'معمل أسيوط', { text: 'غير مطابق', tone: 'red' }]
    ],
    quick: [
      { t: 'تسجيل عينة للفحص', d: 'إدخال عينة جديدة لإجراء التحاليل المعملية.', icon: 'fa-solid fa-vial-circle-check' },
      { t: 'اعتماد نتيجة تحليل', d: 'مراجعة واعتماد نتائج التحاليل الواردة.', icon: 'fa-solid fa-square-check' },
      { t: 'تقرير أداء المعامل', d: 'عرض مؤشرات الأداء الشهرية للمعامل.', icon: 'fa-solid fa-chart-column' }
    ]
  }
]

export default departments
