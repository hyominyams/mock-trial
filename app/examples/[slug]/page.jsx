import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { examples } from "@/lib/mockTrialContent";

export function generateStaticParams() {
  return examples.map((example) => ({ slug: example.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const example = examples.find((item) => item.slug === slug);
  if (!example) return {};
  return {
    title: `${example.title} | 우리 반 모의재판`,
    description: example.summary
  };
}

export default async function ExampleDetailPage({ params }) {
  const { slug } = await params;
  const example = examples.find((item) => item.slug === slug);
  if (!example) notFound();

  return (
    <main>
      <header className="site-header compact">
        <Link href="/" className="brand" aria-label="처음으로">
          <span className="brandMark">법</span>
          <span>우리 반 모의재판</span>
        </Link>
        <nav className="top-nav" aria-label="예시자료 탐색">
          <Link href="/examples">예시자료실</Link>
          <Link href="/#search">검색</Link>
          <a href="/활동지/index.html">활동지</a>
        </nav>
      </header>

      <section className="roleHero">
        <Link href="/examples" className="backLink">
          <ArrowLeft aria-hidden size={18} /> 예시자료실
        </Link>
        <p className="kicker">{example.category}</p>
        <h1>{example.title}</h1>
        <p className="heroLead">{example.summary}</p>
        <div className="tagRow wide">
          {example.tags.map((tag) => (
            <em key={tag}>{tag}</em>
          ))}
        </div>
      </section>

      <section className="exampleDetail">
        {example.sections.map((section) => (
          <article className="contentPanel" key={section.heading}>
            <h2>{section.heading}</h2>
            <div className="exampleText">
              {section.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </article>
        ))}
        <section className="nextAction">
          <ClipboardList aria-hidden size={24} />
          <div>
            <h2>활동지에 적용하기</h2>
            <p>예시 구조를 참고해 우리 반 법안이나 사건에 맞게 바꿔 씁니다.</p>
          </div>
          <a href="/활동지/index.html">활동지 열기</a>
        </section>
      </section>
    </main>
  );
}
