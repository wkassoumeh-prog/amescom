import Image from "next/image";
import Link from "next/link";
import { productPageCopy, productsById } from "@content/products";
import { HomeHeroMedia } from "@/components/home/HomeHeroMedia";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/Icons";
import { WorkflowSceneStage } from "./WorkflowSceneStage";
import { relatedSectors } from "@/lib/product-view";
import { productJsonLd } from "@/lib/structured-data";
import home from "@/components/home/HomeExperience.module.css";
import styles from "./WorkflowExperience.module.css";

const contact = "/ar/contact?product=workflow";

const heroSlides = [
  {
    src: "/media/workflow/workflow-review-hero.jpg",
    alt: "فريق يراجع مسار اعتماد على شاشة كبيرة، صورة توضيحية",
    position: "58% 48%",
  },
  {
    src: "/media/home-brochure/tech-apps-hero.jpg",
    alt: "مكتب مع شاشات تعرض أنظمة لمسارات العمل، صورة توضيحية من كتيّب أميسكوم",
    position: "50% 55%",
  },
  {
    src: "/media/workflow/workflow-ops-desk.jpg",
    alt: "حاسوب وهاتف لمتابعة المهام والتقارير، صورة توضيحية",
    position: "50% 58%",
  },
];

export function WorkflowExperience() {
  const sectors = relatedSectors(productsById.workflow, "ar");

  return (
    <div className={home.page}>
      <JsonLd data={productJsonLd(productsById.workflow, "ar")} />
      <section className={home.hero} aria-labelledby="workflow-heading">
        <HomeHeroMedia slides={heroSlides} />
        <div className={home.heroShade} />
        <div className={`${home.heroIntro} ${home.wrap}`}>
          <span className={styles.productName} dir="ltr">
            AMESCOM Workflow
          </span>
          <h1 id="workflow-heading">
            كل خطوة واضحة.
            <br />
            <span>وكل مهمة في مسارها.</span>
          </h1>
          <p>
            نظّم مسارات المراجعة والاعتماد، وتابع المهام والمستندات بين أقسام مؤسستك.
            <br className={home.wideBreak} /> للإدارات التي تحتاج وضوح المسؤوليات دون ضياع الملفات.
          </p>
          <div className={home.actions}>
            <Link href={contact} className={home.primary}>
              اتصل بنا <ArrowIcon />
            </Link>
            <a className={home.secondary} href="#workflow-path">
              استكشف المسار <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section id="workflow-path" className={`${home.products} ${home.wrap}`} aria-label="قدرات المسار">
        <WorkflowSceneStage />
      </section>

      <section className={`${home.story} ${home.wrap}`} aria-labelledby="workflow-problem-heading">
        <Reveal kind="single" className={home.storyIntro}>
          <h2 id="workflow-problem-heading">
            المستندات تتأخر على المكاتب.
            <br />
            <span>ولا يتضح أين توقفت.</span>
          </h2>
          <p>
            Workflow يضع المراجعة والاعتماد في مسار واحد: من المسؤول الآن، وما الخطوة التالية، وأين يُحفظ الملف بعد القرار.
          </p>
        </Reveal>
        <div className={home.storyGrid}>
          <Reveal kind="single" className={home.photoComposition}>
            <figure className={home.widePhoto}>
              <Image
                src="/media/workflow/workflow-review-hero.jpg"
                alt="زملاء يراجعون مسار عمل على شاشة، صورة توضيحية"
                width={1376}
                height={768}
                sizes="(max-width: 700px) 90vw, 640px"
              />
              <figcaption>
                <span>Workflow</span>
                من الطلب إلى الاعتماد
              </figcaption>
            </figure>
            <figure className={home.portraitPhoto}>
              <Image
                src="/media/workflow/workflow-tablet-approve.jpg"
                alt="لوح يعرض مهمة اعتماد، صورة توضيحية"
                width={1024}
                height={1365}
                sizes="(max-width: 700px) 55vw, 280px"
              />
              <figcaption>
                <span>المهام</span>
                القرار في يد المسؤول
              </figcaption>
            </figure>
            <p className={home.photoNote}>صور توضيحية أُعدّت للموقع، وليست لواجهة النظام الفعلية.</p>
          </Reveal>
          <Reveal kind="stagger" className={home.principles}>
            <div>
              <h3>مسار يعرفه الفريق.</h3>
              <p>تصميم مسارات الاعتماد بالسحب والإفلات، مع الترتيب وشروط التفرّع والصلاحيات.</p>
            </div>
            <div>
              <h3>ملف لا يضيع بين المكاتب.</h3>
              <p>مكان واحد لتصنيف المستندات وحفظها والبحث عنها عبر عوامل تصفية.</p>
            </div>
            <div>
              <h3>يتصل بأنظمة العمل.</h3>
              <p>قابلية التكامل مع أنظمة تخطيط الموارد (ERP) وإدارة علاقات العملاء (CRM) وبرامج المحاسبة. أسماء الموصلات الجاهزة غير مؤكدة بعد.</p>
            </div>
            <Link href={contact} className={home.textLink}>
              ناقش احتياج مؤسستك <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      {sectors.length > 0 && (
        <section className={styles.usesSection} aria-labelledby="workflow-sectors-heading">
          <div className={home.wrap}>
            <Reveal kind="single">
              <h2 id="workflow-sectors-heading">{productPageCopy.sectorsTitle.ar}</h2>
              <p className={styles.usesLead}>{productPageCopy.proposedNote.ar}</p>
            </Reveal>
            <div className={styles.uses}>
              {sectors.map(({ sector, useCases }) => (
                <article key={sector.id}>
                  <h3>
                    <Link href={`/ar/sectors/${sector.slug}`}>
                      {sector.name.ar}
                      <ArrowIcon />
                    </Link>
                  </h3>
                  {useCases.map((useCase) => (
                    <p key={useCase.id}>{useCase.body.ar}</p>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={home.closing}>
        <div className={home.wrap}>
          <Reveal kind="single">
            <h2>
              لنعطِ كل ملف
              <br />
              <span>مساراً يُنجز.</span>
            </h2>
            <p>أخبرنا كيف تتم المراجعات والاعتمادات في مؤسستك.</p>
            <Link href={contact} className={home.primary}>
              اتصل بنا <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      <nav className={`${styles.ecosystem} ${home.wrap}`} aria-label="منتجات أميسكوم">
        <p>حلول لأعمال مختلفة.</p>
        <div>
          <Link href="/ar/products/archive">
            <b dir="ltr">ARCHIVE</b>
            <span>إدارة الوثائق</span>
          </Link>
          <Link href="/ar/products/workflow" aria-current="page">
            <b dir="ltr">Workflow</b>
            <span>مسارات العمل</span>
          </Link>
          <Link href="/ar/products/clinical-pro">
            <b dir="ltr">Clinical PRO</b>
            <span>المراكز الطبية</span>
          </Link>
          <Link href="/ar/products/frona-oprisk">
            <b dir="ltr">FRONA</b>
            <span>المخاطر التشغيلية</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
