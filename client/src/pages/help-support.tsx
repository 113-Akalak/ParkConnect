import { Link } from "wouter";

export default function HelpSupport() {
  const helpTopics = [
    {
      title: "การใช้งานแอพ",
      description: "วิธีการใช้งานฟีเจอร์ต่างๆ ในแอพ",
      icon: "fas fa-mobile-alt",
      items: [
        "การลงทะเบียนเข้าใช้งาน",
        "การดูข้อมูลสภาพอากาศ",
        "การลงทะเบียนกิจกรรม",
        "การค้นหาสิ่งอำนวยความสะดวก"
      ]
    },
    {
      title: "ข้อมูลสวนสาธารณะ",
      description: "ข้อมูลทั่วไปเกี่ยวกับสวนธนบุรีรมย์",
      icon: "fas fa-tree",
      items: [
        "เวลาเปิด-ปิด: 05:00 - 21:00 น.",
        "ค่าเข้าชม: ฟรี",
        "พื้นที่: 142 ไร่",
        "ที่ตั้ง: ถนนรัชดาภิเษก เขตธนบุรี"
      ]
    },
    {
      title: "ความปลอดภัย",
      description: "ข้อมูลเกี่ยวกับความปลอดภัยในสวน",
      icon: "fas fa-shield-alt",
      items: [
        "เจ้าหน้าที่รักษาความปลอดภัย 24 ชม.",
        "กล้องวงจรปิดครอบคลุมทั่วสวน",
        "จุดเรียกความช่วยเหลือฉุกเฉิน",
        "แสงสว่างเพียงพอในเวลากลางคืน"
      ]
    }
  ];

  const emergencyContacts = [
    { label: "เหตุฉุกเฉิน", number: "191", icon: "fas fa-phone" },
    { label: "ศูนย์ข้อมูลสวน", number: "02-424-7171", icon: "fas fa-info-circle" },
    { label: "การแพทย์ฉุกเฉิน", number: "1669", icon: "fas fa-ambulance" },
    { label: "ดับเพลิง", number: "199", icon: "fas fa-fire-extinguisher" }
  ];

  const faqs = [
    {
      question: "สวนเปิดกี่โมง?",
      answer: "สวนเปิดทุกวัน เวลา 05:00 - 21:00 น."
    },
    {
      question: "มีที่จอดรถไหม?",
      answer: "มีที่จอดรถฟรี 3 จุด รวม 150 คัน และมีที่จอดจักรยาน"
    },
    {
      question: "สามารถพาสัตว์เลี้ยงเข้ามาได้ไหม?",
      answer: "สามารถพาสัตว์เลี้ยงได้ แต่ต้องจูงสายจูงและเก็บมูลสัตว์"
    },
    {
      question: "มีการจัดกิจกรรมอะไรบ้าง?",
      answer: "มีกิจกรรมวิ่ง เดิน โยคะ ไทเก๊ก และกิจกรรมชุมชนต่างๆ"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 flex items-center gap-3">
        <Link href="/" className="text-green-600" data-testid="button-back-home">
          <i className="fas fa-arrow-left text-xl"></i>
        </Link>
        <h1 className="text-xl font-bold text-gray-800">ช่วยเหลือ & สนับสนุน</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Help Topics */}
        <div className="space-y-4">
          {helpTopics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <i className={`${topic.icon} text-green-600 text-xl`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-2">{topic.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
                  <ul className="space-y-2">
                    {topic.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-sm">
                        <i className="fas fa-check-circle text-green-500 text-xs"></i>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-phone-alt text-red-500"></i>
            หมายเลขฉุกเฉิน
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {emergencyContacts.map((contact, index) => (
              <a 
                key={index}
                href={`tel:${contact.number}`}
                className="bg-red-50 p-3 rounded-lg text-center hover:bg-red-100 transition-colors"
                data-testid={`button-call-${contact.number}`}
              >
                <i className={`${contact.icon} text-red-500 text-lg mb-2`}></i>
                <div className="text-xs text-gray-600">{contact.label}</div>
                <div className="font-bold text-red-600">{contact.number}</div>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-question-circle text-blue-500"></i>
            คำถามที่พบบ่อย
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                <h4 className="font-medium text-gray-800 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-envelope text-green-500"></i>
            ติดต่อเรา
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หัวข้อ
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" data-testid="select-contact-subject">
                <option value="">เลือกหัวข้อ</option>
                <option value="technical">ปัญหาการใช้งาน</option>
                <option value="facility">สิ่งอำนวยความสะดวก</option>
                <option value="safety">ความปลอดภัย</option>
                <option value="suggestion">ข้อเสนอแนะ</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รายละเอียด
              </label>
              <textarea 
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="กรุณาแจ้งรายละเอียดปัญหาหรือข้อเสนอแนะ"
                data-testid="textarea-contact-details"
              ></textarea>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors" data-testid="button-submit-contact">
              ส่งข้อความ
            </button>
          </div>
        </div>

        {/* Version Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-gray-500 text-sm">
            สวนธนบุรีรมย์ แอพ เวอร์ชัน 1.0.0
          </p>
          <p className="text-gray-400 text-xs mt-1">
            © 2024 สำนักงานเขตธนบุรี กรุงเทพมหานคร
          </p>
        </div>
      </div>
    </div>
  );
}