import { Metadata } from "next";

const SITE_NAME = "Sublime Positivity - Unipessoal, Lda";
const SITE_NIF = "516520326";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade e Proteção de Dados da " +
    SITE_NAME +
    " em conformidade com o RGPD.",
};

export default function PrivacyPage() {
  return (
    <>
      <main>
        <article className="pt-16 pb-12 sm:pb-16 lg:pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <header className="mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Política de Privacidade
                </h1>
                <p className="text-muted-foreground">
                  Última atualização: {new Date().toLocaleDateString("pt-PT")}
                </p>
              </header>

              <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    1. Responsável pelo Tratamento de Dados
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    O responsável pelo tratamento dos seus dados pessoais é:
                  </p>
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <p className="font-semibold mb-2">{SITE_NAME}</p>
                    <p className="text-sm font-semibold mb-2">
                      NIF: {SITE_NIF}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Para questões relacionadas com a proteção de dados, pode
                      contactar-nos através do formulário de contacto disponível
                      no nosso website.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    2. Dados Pessoais Recolhidos
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Quando submete o formulário de contacto, recolhemos os
                    seguintes dados pessoais:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                    <li>Nome completo</li>
                    <li>Endereço de email profissional</li>
                    <li>Número de telemóvel</li>
                    <li>Nome da empresa</li>
                  </ul>
                  <p className="text-muted-foreground">
                    Estes dados são fornecidos voluntariamente por si quando
                    preenche e submete o formulário de contacto.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    3. Finalidades do Tratamento
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Os seus dados pessoais são tratados para as seguintes
                    finalidades:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                    <li>
                      <strong>Contacto e resposta a pedidos:</strong> Para
                      responder às suas questões e solicitações de contacto
                      relacionadas com os nossos serviços de marketing digital.
                    </li>
                    <li>
                      <strong>Comunicações de marketing:</strong> Ao submeter o
                      formulário de contacto, aceita expressamente ser
                      contactado para fins de marketing, incluindo o envio de
                      informações sobre os nossos serviços, ofertas
                      promocionais, novidades e conteúdos relevantes
                      relacionados com marketing digital.
                    </li>
                    <li>
                      <strong>Prestação de serviços:</strong> Para estabelecer
                      contacto comercial e prestar os serviços solicitados.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    4. Base Legal para o Tratamento
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    O tratamento dos seus dados pessoais baseia-se em:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                    <li>
                      <strong>Consentimento:</strong> Ao submeter o formulário
                      de contacto, consente expressamente no tratamento dos seus
                      dados pessoais para as finalidades acima descritas,
                      incluindo comunicações de marketing.
                    </li>
                    <li>
                      <strong>Execução de medidas pré-contratuais:</strong> Para
                      responder ao seu pedido de contacto e estabelecer uma
                      relação comercial.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    5. Conservação dos Dados
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Os seus dados pessoais serão conservados durante o tempo
                    necessário para cumprir as finalidades para as quais foram
                    recolhidos, nomeadamente:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                    <li>
                      Enquanto mantiver uma relação comercial connosco ou
                      enquanto não retirar o seu consentimento.
                    </li>
                    <li>
                      Durante os prazos legalmente estabelecidos para a
                      conservação de dados para fins contabilísticos e fiscais.
                    </li>
                  </ul>
                  <p className="text-muted-foreground">
                    Após o término do período de conservação, os dados serão
                    eliminados de forma segura.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    6. Partilha de Dados
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Os seus dados pessoais são geridos exclusivamente por{" "}
                    {SITE_NAME} e não são partilhados com terceiros, exceto:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                    <li>
                      Quando necessário para a prestação dos serviços
                      solicitados (por exemplo, prestadores de serviços de email
                      marketing ou plataformas de gestão de contactos).
                    </li>
                    <li>Quando exigido por lei ou por ordem judicial.</li>
                  </ul>
                  <p className="text-muted-foreground">
                    Todos os prestadores de serviços que possam ter acesso aos
                    seus dados estão obrigados a manter a confidencialidade e a
                    cumprir as normas de proteção de dados aplicáveis.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    7. Os Seus Direitos
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Nos termos do Regulamento Geral sobre a Proteção de Dados
                    (RGPD), tem os seguintes direitos:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                    <li>
                      <strong>Direito de acesso:</strong> Pode solicitar
                      informações sobre os dados pessoais que temos sobre si.
                    </li>
                    <li>
                      <strong>Direito de retificação:</strong> Pode solicitar a
                      correção de dados incorretos ou incompletos.
                    </li>
                    <li>
                      <strong>Direito ao apagamento:</strong> Pode solicitar a
                      eliminação dos seus dados pessoais em determinadas
                      circunstâncias.
                    </li>
                    <li>
                      <strong>Direito à limitação do tratamento:</strong> Pode
                      solicitar a limitação do tratamento dos seus dados em
                      determinadas situações.
                    </li>
                    <li>
                      <strong>Direito à portabilidade:</strong> Pode solicitar a
                      transferência dos seus dados para outro responsável pelo
                      tratamento.
                    </li>
                    <li>
                      <strong>Direito de oposição:</strong> Pode opor-se ao
                      tratamento dos seus dados para fins de marketing.
                    </li>
                    <li>
                      <strong>Direito de retirar o consentimento:</strong> Pode
                      retirar o seu consentimento a qualquer momento, sem afetar
                      a licitude do tratamento baseado no consentimento
                      anteriormente prestado.
                    </li>
                  </ul>
                  <p className="text-muted-foreground">
                    Para exercer qualquer um destes direitos, pode contactar-nos
                    através do formulário de contacto disponível no nosso
                    website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    8. Retirada do Consentimento
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Pode retirar o seu consentimento para o tratamento dos seus
                    dados pessoais para fins de marketing a qualquer momento,
                    sem qualquer custo. A retirada do consentimento não afeta a
                    licitude do tratamento efetuado com base no consentimento
                    anteriormente prestado.
                  </p>
                  <p className="text-muted-foreground">
                    Para retirar o seu consentimento, pode contactar-nos através
                    do formulário de contacto ou seguir as instruções de
                    cancelamento de subscrição incluídas nas nossas comunicações
                    de marketing.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    9. Medidas de Segurança
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Implementamos medidas técnicas e organizativas adequadas
                    para proteger os seus dados pessoais contra acesso não
                    autorizado, alteração, divulgação ou destruição. Estas
                    medidas incluem:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                    <li>Encriptação de dados em trânsito</li>
                    <li>Controlos de acesso restritos</li>
                    <li>Monitorização regular dos sistemas</li>
                    <li>Backups regulares dos dados</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    10. Reclamações
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Se considerar que o tratamento dos seus dados pessoais viola
                    a legislação aplicável, tem o direito de apresentar uma
                    reclamação junto da autoridade de controlo competente:
                  </p>
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <p className="font-semibold mb-2">
                      Comissão Nacional de Proteção de Dados (CNPD)
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Av. D. Carlos I, 134, 1.º, 1200-651 Lisboa
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Telefone: +351 213 928 400
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Website:{" "}
                      <a
                        href="https://www.cnpd.pt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        www.cnpd.pt
                      </a>
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    11. Alterações à Política de Privacidade
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Reservamo-nos o direito de atualizar esta Política de
                    Privacidade periodicamente. Qualquer alteração será
                    publicada nesta página com a data da última atualização.
                    Recomendamos que consulte regularmente esta página para se
                    manter informado sobre como protegemos os seus dados.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">12. Contacto</h2>
                  <p className="text-muted-foreground mb-4">
                    Para questões relacionadas com esta Política de Privacidade
                    ou para exercer os seus direitos, pode contactar-nos através
                    do formulário de contacto disponível no nosso website.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
