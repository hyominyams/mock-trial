import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Lightbulb,
  MessageCircle,
  Route,
  TriangleAlert
} from "lucide-react";
import { examples, roles } from "@/lib/mockTrialContent";

export function generateStaticParams() {
  return roles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const role = roles.find((item) => item.slug === slug);
  if (!role) return {};
  return {
    title: `${role.name} 역할 자료 | 우리 반 모의재판`,
    description: role.short
  };
}

export default async function RolePage({ params }) {
  const { slug } = await params;
  const role = roles.find((item) => item.slug === slug);
  if (!role) notFound();
  const relatedExamples = examples.filter((example) => example.category === role.name).slice(0, 3);

  return (
    <main>
      <header className="site-header compact">
        <Link href="/" className="brand" aria-label="처음으로">
          <span className="brandMark">법</span>
          <span>우리 반 모의재판</span>
        </Link>
        <nav className="top-nav" aria-label="역할 탐색">
          <Link href="/#roles">역할별</Link>
          <Link href="/examples">예시자료</Link>
          <a href="/활동지/index.html">활동지</a>
        </nav>
      </header>

      <section className="roleHero" style={{ "--role-color": role.color }}>
        <Link href="/#roles" className="backLink">
          <ArrowLeft aria-hidden size={18} /> 역할 목록으로
        </Link>
        <p className="kicker">역할 자료</p>
        <h1>{role.name}</h1>
        <p className="roleSubtitle">{role.studentName}</p>
        <p className="heroLead">{role.description}</p>
      </section>

      <section className="roleLayout">
        <aside className="sideNav" aria-label={`${role.name} 목차`}>
          <strong>이 페이지에서 확인할 것</strong>
          <a href="#mission">핵심 임무</a>
          <a href="#steps">준비 순서</a>
          <a href="#forms">작성 자료</a>
          <a href="#speech">말하기 예시</a>
          {relatedExamples.length > 0 ? <a href="#examples">관련 예시</a> : null}
          <a href="#mistakes">흔한 실수</a>
        </aside>

        <div className="roleContent">
          <section id="mission" className="contentPanel highlight">
            <div className="panelTitle">
              <Lightbulb aria-hidden size={22} />
              <h2>핵심 임무</h2>
            </div>
            <p className="bigText">{role.mission}</p>
            <div className="miniGrid">
              {role.principles.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="steps" className="contentPanel">
            <div className="panelTitle">
              <Route aria-hidden size={22} />
              <h2>준비 순서</h2>
            </div>
            <ol className="stepList">
              {role.steps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="forms" className="contentPanel">
            <div className="panelTitle">
              <FileText aria-hidden size={22} />
              <h2>작성 자료</h2>
            </div>
            <div className="formGrid">
              {role.outputs.map((output) => (
                <article key={output.title}>
                  <h3>{output.title}</h3>
                  <p>{output.description}</p>
                  <ul>
                    {output.fields.map((field) => (
                      <li key={field}>{field}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="speech" className="contentPanel">
            <div className="panelTitle">
              <MessageCircle aria-hidden size={22} />
              <h2>말하기 예시</h2>
            </div>
            <div className="speechStack">
              {role.speech.map((line) => (
                <blockquote key={line}>{line}</blockquote>
              ))}
            </div>
          </section>

          {relatedExamples.length > 0 ? (
            <section id="examples" className="contentPanel">
              <div className="panelTitle">
                <FileText aria-hidden size={22} />
                <h2>관련 예시자료</h2>
              </div>
              <div className="exampleGrid compact">
                {relatedExamples.map((example) => (
                  <Link href={example.href} className="exampleCard" key={example.slug}>
                    <span>{example.category}</span>
                    <h3>{example.title}</h3>
                    <p>{example.summary}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section id="mistakes" className="contentPanel">
            <div className="panelTitle">
              <TriangleAlert aria-hidden size={22} />
              <h2>흔한 실수와 점검</h2>
            </div>
            <div className="checkGrid">
              <article>
                <h3>피해야 할 실수</h3>
                <ul>
                  {role.mistakes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>마지막 체크</h3>
                <ul>
                  {role.checklist.map((item) => (
                    <li key={item}>
                      <CheckCircle2 aria-hidden size={17} /> {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section className="nextAction">
            <ClipboardCheck aria-hidden size={24} />
            <div>
              <h2>이제 활동지로 옮겨 적기</h2>
              <p>역할을 이해했다면 필요한 문서를 활동지에서 찾아 작성합니다.</p>
            </div>
            <a href={role.worksheet}>관련 활동지</a>
          </section>
        </div>
      </section>
    </main>
  );
}
