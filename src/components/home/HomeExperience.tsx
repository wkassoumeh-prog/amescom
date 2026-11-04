import Image from "next/image";
import Link from "next/link";
import { HomeHeroMedia } from "./HomeHeroMedia";
import { HomeProductStage } from "./HomeProductStage";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/Icons";
import styles from "./HomeExperience.module.css";

type HomeProps = {
  products: { id: string; name: string; href: string }[];
  sectors: { id: string; name: string; href: string }[];
};

const services = [
  { title: "حلول برمجية", text: "تطبيقات بواجهات ويب وحلول للموبايل، تُطوَّر وفق احتياجات مؤسستك وطبيعة عملها." },
  { title: "البنية التحتية والسحابة", text: "بناء البنية التقنية للمؤسسات، من البيئات الافتراضية وأنظمة التشغيل إلى الأنظمة السحابية." },
  { title: "أمن المعلومات", text: "حلول لحماية بيئة العمل الرقمية، تشمل أنظمة مكافحة الفيروسات وجدران الحماية." },
  { title: "الشبكات", text: "حلول للشبكات المحلية والبعيدة تدعم اتصال الفرق والأنظمة داخل المؤسسة وبين مواقعها." },
];

const heroSlides = [
  {
    src: "/media/home-brochure/software-desk-hero.jpg",
    alt: "امرأة تعمل على لوحة برمجيات مؤسسية في مكتب مضاء، صورة توضيحية",
    position: "32% 78%",
  },
  {
    src: "/media/home-brochure/tech-apps-hero.jpg",
    alt: "مكتب مع شاشات تعرض أنظمة تقنية مترابطة، صورة توضيحية من كتيّب أميسكوم",
    position: "50% 55%",
  },
  {
    src: "/media/home-brochure/clinical-cover.jpg",
    alt: "لوح في مركز طبي يعرض تطبيقات سريرية، من كتيّب Clinical PRO",
    position: "50% 62%",
  },
];

export function HomeExperience({ products, sectors }: HomeProps) {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-heading">
        <HomeHeroMedia slides={heroSlides} />
        <div className={styles.heroShade} />
        <div className={`${styles.heroIntro} ${styles.wrap}`}>
          <h1 id="home-heading">
            معلومات منظّمة.
            <br />
            <span>وعمل يتحرّك.</span>
          </h1>
          <p>
            حلول أميسكوم لإدارة الوثائق، ومسارات العمل، والمراكز الطبية، والمخاطر.
            <br className={styles.wideBreak} /> وضوح لفريقك. ومساحة أكبر لإنجاز العمل.
          </p>
          <div className={styles.actions}>
            <Link href="/ar/contact" className={styles.primary}>
              اتصل بنا <ArrowIcon />
            </Link>
            <a className={styles.secondary} href="#home-products">
              اكتشف الحل المناسب <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {products.length > 0 && (
        <section id="home-products" className={`${styles.products} ${styles.wrap}`} aria-label="منتجات أميسكوم">
          <HomeProductStage products={products} />
        </section>
      )}

      {sectors.length > 0 && (
        <section className={`${styles.sectors} ${styles.wrap}`} aria-label="قطاعات نخدمها">
          <p>
            حلول لأعمال مختلفة.
            <br />
            <b>واهتمام واحد بالتفاصيل.</b>
          </p>
          <nav aria-label="استكشف القطاعات">
            {sectors.map((sector) => (
              <Link key={sector.id} href={sector.href}>
                {sector.name}
                <ArrowIcon />
              </Link>
            ))}
          </nav>
        </section>
      )}

      <section className={`${styles.story} ${styles.wrap}`} aria-labelledby="home-story-heading">
        <Reveal kind="single" className={styles.storyIntro}>
          <h2 id="home-story-heading">
            التقنية تصبح أفضل
            <br />
            <span>حين تفهم طريقة عملك.</span>
          </h2>
          <p>
            الوثائق والموافقات والعمليات اليومية جزء من قصة واحدة: عمل مؤسستك. نطوّر حلولاً مرنة لتنظيم المعلومات ومساعدة الفرق على المتابعة واتخاذ القرار.
          </p>
        </Reveal>
        <div className={styles.storyGrid}>
          <Reveal kind="single" className={styles.photoComposition}>
            <figure className={styles.widePhoto}>
              <Image
                src="/media/home-brochure/apps-on-devices.jpg"
                alt="حاسوب ولوحي وهاتف تعرض تطبيقات برمجية على مكتب، صورة توضيحية"
                width={1376}
                height={768}
                sizes="(max-width: 700px) 90vw, 640px"
              />
              <figcaption>
                <span>Clinical PRO</span>
                البرمجيات في مكان العمل
              </figcaption>
            </figure>
            <figure className={styles.portraitPhoto}>
              <Image
                src="/media/home-brochure/tablet-software-hands.jpg"
                alt="يدان تمسكان لوحياً يعرض تطبيقاً برمجياً، صورة توضيحية"
                width={1024}
                height={1365}
                sizes="(max-width: 700px) 55vw, 280px"
              />
              <figcaption>
                <span>تطبيقات العمل</span>
                من الشاشة إلى القرار
              </figcaption>
            </figure>
            <p className={styles.photoNote}>صور توضيحية من كتيّبات أميسكوم ومشاهد تقنية أُعدّت للموقع.</p>
          </Reveal>
          <Reveal kind="stagger" className={styles.principles}>
            <div>
              <h3>المعلومة في سياقها.</h3>
              <p>وثائق منظّمة، وبيانات يسهل الرجوع إليها، وتاريخ يوضّح ما تغيّر.</p>
            </div>
            <div>
              <h3>مرونة تناسب مؤسستك.</h3>
              <p>تكييف مسارات العمل والصلاحيات والنماذج والتقارير مع هيكل المؤسسة وسياساتها.</p>
            </div>
            <div>
              <h3>تطوير يستمع لفريقك.</h3>
              <p>نستفيد من ملاحظات المستخدمين لتطوير الأنظمة وتحسين تجربة العمل.</p>
            </div>
            <Link href="/ar/about" className={styles.textLink}>
              تعرّف على أميسكوم <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className={styles.servicesSection} aria-labelledby="home-services-heading">
        <div className={`${styles.services} ${styles.wrap}`}>
          <Reveal kind="single">
            <h2 id="home-services-heading">
              وراء كل نظام جيد،
              <br />
              <span>أساس تقني متين.</span>
            </h2>
            <p>نساند مؤسستك بالبرمجيات والبنية التحتية وأمن المعلومات والشبكات.</p>
            <Link href="/ar/contact" className={styles.textLink}>
              ناقش احتياجاتك معنا <ArrowIcon />
            </Link>
          </Reveal>
          <div className={styles.serviceList}>
            {services.map((service, i) => (
              <details key={service.title} open={i === 0}>
                <summary>
                  {service.title}
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <path d="M3 9h12M9 3v12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </summary>
                <p>{service.text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.start} ${styles.wrap}`} aria-labelledby="home-start-heading">
        <Reveal kind="single">
          <h2 id="home-start-heading">
            نبدأ من احتياجك.
            <br />
            <span>ثم نرسم الخطوة التالية.</span>
          </h2>
        </Reveal>
        <ol className={styles.steps}>
          <li>
            <span>١</span>
            <div>
              <h3>نتحدث عن عملك</h3>
              <p>ما الذي يحتاج فريقك إلى تنظيمه أو تبسيطه؟</p>
            </div>
          </li>
          <li>
            <span>٢</span>
            <div>
              <h3>نحدّد الحل المناسب</h3>
              <p>نربط احتياجاتك بالإمكانات التي تخدمها.</p>
            </div>
          </li>
          <li>
            <span>٣</span>
            <div>
              <h3>نتفق على الخطوات</h3>
              <p>نناقش نطاق التنفيذ والدعم وفق مشروعك.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className={styles.closing}>
        <div className={styles.wrap}>
          <Reveal kind="single">
            <h2>
              لنمنح العمل
              <br />
              <span>مساحة ليتقدّم.</span>
            </h2>
            <p>أخبرنا عمّا تريد تحسينه في مؤسستك.</p>
            <Link href="/ar/contact" className={styles.primary}>
              اتصل بنا <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
