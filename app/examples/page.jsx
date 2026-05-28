import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpenCheck } from "lucide-react";
import SearchPanel from "@/app/components/SearchPanel";
import { examples, searchItems } from "@/lib/mockTrialContent";

export const metadata = {
  title: "예시자료실 | 우리 반 모의재판",
  description: "학급 법안, 공소장, 변론요지서, 판결문 등 모의재판 예시자료"
};

export default function ExamplesPage() {
  return (
    <main>
      <header className="site-header compact">
        <Link href="/" className="brand" aria-label="처음으로">
          <span className="brandMark">법</span>
          <span>우리 반 모의재판</span>
        </Link>
        <nav className="top-nav" aria-label="예시자료 탐색">
          <Link href="/#roles">역할별</Link>
          <Link href="/#search">검색</Link>
          <a href="/활동지/index.html">활동지</a>
        </nav>
      </header>

      <section className="roleHero">
        <Link href="/" className="backLink">
          <ArrowLeft aria-hidden size={18} /> 처음으로
        </Link>
        <p className="kicker">Examples</p>
        <h1>예시자료실</h1>
        <p className="heroLead">
          학생들이 “어떻게 쓰면 되는지” 바로 볼 수 있도록 법안, 출처, 주장 글,
          공소장, 변론요지서, 판결문, 배심원 의견서, 증인 진술서 예시를 모았습니다.
        </p>
      </section>

      <SearchPanel items={searchItems} />

      <section className="section">
        <div className="exampleGrid full">
          {examples.map((example) => (
            <Link href={example.href} className="exampleCard" key={example.slug}>
              <BookOpenCheck aria-hidden size={22} />
              <span>{example.category}</span>
              <h3>{example.title}</h3>
              <p>{example.summary}</p>
              <div className="tagRow">
                {example.tags.map((tag) => (
                  <em key={tag}>{tag}</em>
                ))}
              </div>
              <strong className="cardLink">
                예시 열기 <ArrowRight aria-hidden size={16} />
              </strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
