import Image from "next/image";
import Link from "next/link";
import { ArchiveDemo, ArchiveMotion } from "./ArchiveInteractive";
import styles from "./ArchiveExperience.module.css";

const contact = "/ar/contact?product=archive";

export function ArchiveExperience() {
  return (
    <article className={styles.page}>
      <ArchiveMotion />
      <div className={styles.productBar}>
        <a href="#archive-overview" className={styles.productIdentity}><span className={styles.archiveMark} aria-hidden="true">▤</span><b dir="ltr">AMESCOM ARCHIVE</b></a>
        <nav aria-label="أقسام صفحة الأرشيف"><a href="#archive-demo">جرّب الفكرة</a><a href="#archive-features">المزايا</a><a href="#archive-questions">الأسئلة الشائعة</a></nav>
      </div>

      <section id="archive-overview" className={`${styles.hero} ${styles.wrap}`}>
        <div className={styles.heroCopy}>
          <h1>كل وثيقة في مكانها.<br /><span>وكل معلومة<br className={styles.desktopBreak} /> في متناولك.</span></h1>
          <p>حوّل أكوام الأوراق إلى معرفة منظّمة.<br />أرشفة إلكترونية، بحث في النصوص العربية، وصلاحيات تبقي فريقك على الصفحة نفسها.</p>
          <div className={styles.actions}><Link className={styles.primary} href={contact}>اتصل بنا <span aria-hidden="true">←</span></Link><a className={styles.textLink} href="#archive-demo">شاهد كيف تعمل الفكرة <span aria-hidden="true">↓</span></a></div>
          <div className={styles.heroTags}><span>يقرأ العربية</span><span>ينظّم الوثائق</span><span>يحفظ تاريخها</span></div>
        </div>
        <div className={styles.heroArt} aria-label="تصوّر لصفحة تجد مكانها بين ملفات منظّمة">
          <div className={styles.paperBack} aria-hidden="true"><span>المعرفة تبدأ بوثيقة.</span><i /><i /><i /><b>ARCHIVE</b></div>
          <div className={styles.heroPhoto}><Image src="/media/archive-every-page.jpg" width={1152} height={864} alt="صفحة تنزلق إلى المجلد الصحيح بين ملفات منظّمة، كل وثيقة في مكانها" priority sizes="(max-width: 700px) 75vw, 370px" /><div className={styles.photoLabel}><span className={styles.liveDot} /> كل صفحة في مكانها</div></div>
          <div className={styles.floatingDocument} data-place="back" aria-hidden="true"><span className={styles.fileIcon} data-kind="DOC">DOC</span><div><b>سياسة المشتريات.doc</b><small>مصنّفة. قابلة للبحث. في مكانها.</small></div><span className={styles.check}>✓</span></div>
          <div className={styles.floatingDocument} data-place="mid" aria-hidden="true"><span className={styles.fileIcon}>PDF</span><div><b>محضر الاجتماع.pdf</b><small>مصنّف. قابل للبحث. في مكانه.</small></div><span className={styles.check}>✓</span></div>
          <div className={styles.floatingDocument} data-place="front" aria-hidden="true"><span className={styles.fileIcon}>PDF</span><div><b>عقد توريد.pdf</b><small>مصنّف. قابل للبحث. في مكانه.</small></div><span className={styles.check}>✓</span></div>
        </div>
      </section>

      <section id="archive-demo" className={`${styles.demoSection} ${styles.wrap}`}>
        <div className={styles.sectionHeading} data-archive-reveal><div><h2>تذكّر المعلومة.<br /><span>دع الأرشيف يجد الوثيقة.</span></h2></div><p>ابحث بكلمة، صفِّ حسب النوع، وافتح تفاصيل الوثيقة.<br />جرّب هذا المثال لتستكشف الفكرة بنفسك.</p></div>
        <ArchiveDemo />
        <p className={styles.demoCaption}>مثال تفاعلي ببيانات توضيحية لشرح الإمكانات، وليس واجهة النظام الفعلية.</p>
      </section>

      <section id="archive-features" className={`${styles.featureSection} ${styles.wrap}`}>
        <div className={styles.featureRow} data-archive-reveal>
          <div className={styles.featureCopy}><span className={styles.featureNumber}>01 / التقاط وفهم</span><h2>أوراقك لا تحمل صوراً فقط.<br /><span>إنها تحمل معرفة.</span></h2><p>يقرأ التعرّف الضوئي على النصوص العربية محتوى الوثائق الممسوحة، ليصبح النص قابلاً للبحث والاسترجاع.</p><ul className={styles.checkList}><li>استخراج النص من الوثائق العربية</li><li>تصنيف الوثائق وربط المرفقات</li><li>بحث بالكلمات المفتاحية والمحتوى</li></ul></div>
          <div className={styles.captureArt}><Image src="/media/archive-brochure/ocr.jpg" width={1004} height={564} alt="رسم فوتوغرافي من كتيّب ARCHIVE يوضّح تحويل المستندات إلى معلومات رقمية" sizes="(max-width: 800px) 90vw, 560px" /><div className={styles.extracted}><span className={styles.scanLine} aria-hidden="true"/><div><span className={styles.scanIcon} aria-hidden="true">⌗</span><b>من صورة إلى نص</b><span dir="ltr">Arabic OCR</span></div><p>الموضوع: <mark>عقد توريد</mark></p><p>التصنيف: العقود والمشتريات</p><div className={styles.extractedFoot}><span>نص قابل للبحث</span><span aria-hidden="true">✓</span></div></div></div>
        </div>

        <div className={`${styles.featureRow} ${styles.reverse}`} data-archive-reveal>
          <div className={styles.featureCopy}><span className={styles.featureNumber}>02 / تنظيم ومتابعة</span><h2>للعمل نسخ كثيرة.<br /><span>وللوثيقة تاريخ واضح.</span></h2><p>حافظ على الإصدارات والمرفقات في سياق واحد. اعرف ما تغيّر، وراجع سجل العمليات من الاستعراض والتعديل إلى الطباعة.</p><a href="#archive-demo" className={styles.textLink}>استكشف وثيقة في المثال <span aria-hidden="true">←</span></a></div>
          <div className={styles.historyArt}><div className={styles.historyHeader}><span className={styles.fileIcon}>DOC</span><div><b>سياسة المشتريات</b><small>كل التحديثات، في سياق واحد.</small></div></div><ol><li><span /><div><b>الإصدار الحالي</b><p>تحديث المرفقات وإجراءات الاعتماد</p></div><em>v.03</em></li><li><span /><div><b>مراجعة المحتوى</b><p>تعديل بنود الوثيقة</p></div><em>v.02</em></li><li><span /><div><b>إضافة الوثيقة</b><p>حفظ النسخة الأولى في الأرشيف</p></div><em>v.01</em></li></ol><p className={styles.historyNote}>تصوّر توضيحي لتتبّع الإصدارات</p></div>
        </div>

        <div className={styles.securityPanel} data-archive-reveal>
          <div className={styles.securityPhoto}><Image src="/media/archive-brochure/storage.jpg" width={1738} height={2317} alt="تصوّر من كتيّب ARCHIVE لتنظيم الملفات الورقية والرقمية" sizes="(max-width: 700px) 90vw, 450px" /></div>
          <div className={styles.securityCopy}><span className={styles.featureNumber}>03 / صلاحيات ووضوح</span><h2>المعلومة الصحيحة.<br />للشخص الصحيح.</h2><p>حدّد من يستطيع الاطلاع أو التعديل، واحتفظ بسجل للعمليات يساعد فريقك على المتابعة والمراجعة.</p><div className={styles.permissions}><div><span>عرض الوثائق</span><b>✓</b></div><div><span>تعديل المحتوى</span><b>حسب الصلاحية</b></div><div><span>تاريخ العمليات</span><b>مسجّل</b></div></div><Link href={contact} className={styles.textLink}>لنتحدث عن احتياجات مؤسستك <span aria-hidden="true">←</span></Link></div>
        </div>
      </section>

      <section id="archive-questions" className={`${styles.faqSection} ${styles.wrap}`} data-archive-reveal>
        <h2>لديك أسئلة؟<br /><span>لنبدأ من هنا.</span></h2><div className={styles.faqs}>
          <details><summary>هل يمكن البحث داخل الوثائق الممسوحة؟<span aria-hidden="true">+</span></summary><p>يدعم ARCHIVE التعرّف الضوئي على النصوص العربية لتحويل محتوى الوثائق الممسوحة إلى نص قابل للبحث، إلى جانب البحث بالكلمات المفتاحية.</p></details>
          <details><summary>كيف تُنظّم الإصدارات والصلاحيات؟<span aria-hidden="true">+</span></summary><p>يتيح النظام إدارة إصدارات الوثيقة وربط المرفقات، وتحديد صلاحيات الاطلاع والتعديل، مع سجل للعمليات التي تتم على الوثائق.</p></details>
          <details><summary>كيف نبدأ مع أميسكوم؟<span aria-hidden="true">+</span></summary><p>تواصل معنا وشاركنا طبيعة وثائقك وطريقة العمل الحالية. نناقش احتياجات الأرشفة والبحث والصلاحيات مع فريقك.</p><Link href={contact}>اتصل بنا ←</Link></details>
        </div>
      </section>

      <section className={styles.closing} data-archive-reveal><div className={styles.wrap}><span className={styles.closingMark} aria-hidden="true">▤</span><h2>مساحة أقل للورق.<br />مساحة أكبر للعمل.</h2><p>لنبنِ معاً طريقة أوضح لإدارة وثائق مؤسستك.</p><Link className={styles.primary} href={contact}>اتصل بنا <span aria-hidden="true">←</span></Link></div></section>

      <nav className={`${styles.ecosystem} ${styles.wrap}`} aria-label="منتجات أميسكوم"><p>أدوات تتكامل مع عملك.</p><div><Link href="/ar/products/archive" aria-current="page"><b>ARCHIVE</b><span>إدارة الوثائق</span></Link><Link href="/ar/products/workflow"><b>Workflow</b><span>مسارات العمل</span></Link><Link href="/ar/products/clinical-pro"><b>Clinical PRO</b><span>إدارة المراكز الطبية</span></Link><Link href="/ar/products/frona-oprisk"><b>FRONA</b><span>إدارة المخاطر التشغيلية</span></Link></div></nav>
    </article>
  );
}
