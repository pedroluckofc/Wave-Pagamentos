import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestBody {
  prompt: string;
  type: 'copy' | 'strategy';
  copyType?: string;
  context?: {
    name?: string;
    description?: string;
    price?: string;
    target?: string;
  };
}

const generateResponse = (body: RequestBody): string => {
  const { prompt, type, copyType, context } = body;

  if (type === 'copy') {
    return generateCopyResponse(copyType || 'headline', context);
  } else {
    return generateStrategyResponse();
  }
};

const generateCopyResponse = (
  copyType: string,
  context?: { name?: string; description?: string; price?: string; target?: string }
): string => {
  const productName = context?.name || 'Seu Produto';
  const productDesc = context?.description || 'um produto de alta qualidade';
  const price = context?.price || 'R$ 497';
  const target = context?.target || 'empreendedores digitais';

  const copyTemplates: Record<string, string> = {
    headline: `Headline Sugerido:

"Transforme Seu Negócio Digital Em Uma Máquina de Vendas Automatizada"

Alternativas:
1. "Triplique Suas Vendas Em 30 Dias Com Nossa Metodologia Comprovada"
2. "O Sistema Completo Para Escalar Seu Infoproduto de ${price} a R$ 100k/Mês"
3. "Descubra o Segredo dos Top 1% de Vendedores Digitais"
4. "${productName}: Transforme ${target} em Empreendedores de Seis Dígitos"
5. "Ganhe ${price} Vendendo ${productDesc} Este Mês"`,

    email: `Assunto: Você está deixando dinheiro na mesa

---

Olá,

Enquanto você lê este email, seus concorrentes estão faturando MUITO mais que você.

E não é porque eles têm um produto melhor...

É porque eles descobriram o ${productName} que eu vou revelar para você hoje.

Esse mesmo ${productName} que transformou:

✓ João de R$ 3k para R$ 85k/mês em 4 meses
✓ Maria de zero a R$ 50k/mês em apenas 60 dias  
✓ Pedro de R$ 10k para R$ 200k/mês em 6 meses

E agora é a SUA vez.

O que você vai receber:

${productDesc}

Valor da oferta: ${price}
Mas se você agir HOJE: 50% OFF

[CLIQUE AQUI PARA GARANTIR SEU ACESSO]

P.S.: Esta oferta especial expira em 24 horas. Depois volta ao preço normal.`,

    vsl: `Script VSL - Primeira Página (0:00 a 0:45)

"Pare tudo que você está fazendo...

Se você é ${target} e ainda não está faturando pelo menos R$ 30.000 por mês, você PRECISA ver isso.

Nos próximos minutos, vou te mostrar o sistema EXATO que usei para ir de R$ 0 a R$ 150.000 em apenas 90 dias...

E o melhor: você pode copiar tudo isso começando HOJE, mesmo se você nunca vendeu NADA online."

[PROBLEMA - 0:45 a 2:30]

"Você já sentiu que está fazendo TUDO certo...

Criou o ${productName}...
Fez as páginas de venda...
Gravou os vídeos...

Mas as vendas simplesmente NÃO APARECEM?

Eu sei exatamente como você se sente...
Porque eu também já passei por isso.

Gastei R$ 50 mil em cursos.
Tentei tudo o que ensinavam.

Mas NADA funcionava.

Até que eu descobri isso..."`,

    landing: `Copy para Landing Page - ${productName}

[HERO SECTION]

Título Principal:
"Transforme ${target} Em Máquinas de Vender Online"

Subtítulo:
"Descubra como ${productDesc} usando a metodologia que já gerou R$ 2.5 milhões em vendas"

CTA Primária: [GARANTIR MEU ACESSO AGORA]

[SEÇÃO DE BENEFÍCIOS]

✓ ${productDesc}
Implemente rápido, veja resultados em 7 dias

✓ Sistema Comprovado
Usado por mais de 5 mil ${target}

✓ Suporte VIP
Accesso direto ao nosso time

✓ Garantia de 30 Dias
Se não gostar, seu dinheiro de volta

[PROVA SOCIAL]

"Em 30 dias saí de R$ 5k para R$ 47k/mês"
- Carlos Silva, São Paulo

"Finalmente consegui escalar meu negócio"
- Maria Santos, Rio de Janeiro`,

    ads: `Copy para Anúncio - ${productName}

[VERSÃO 1 - GANCHO DIRETO]

Título: "R$ 50.000 em 30 Dias"

Texto: ${target.charAt(0).toUpperCase() + target.slice(1)} que querem R$ 50k/mês devem ver isso. Método comprovado. Acesso imediato.

CTA: Quero Ver o Método

---

[VERSÃO 2 - PROBLEMA]

Título: "Cansado de Trabalhar Duro e Ganhar Pouco?"

Texto: E se existisse um jeito de ganhar em 1 mês o que você ganha em 1 ano? ${productName}. Resultados reais. Veja a prova.

CTA: Garantir Acesso Agora

---

[VERSÃO 3 - CURIOSIDADE]

Título: "O Segredo dos R$ 100k/Mês"

Texto: Não é sorte. Não é dom. É ${productName} que qualquer pessoa pode copiar. Clique e veja.

CTA: Descobrir Como`,

    checkout: `Copy para Página de Checkout - ${productName}

[ACIMA DO FORMULÁRIO]

🔥 Oferta Especial Termina em: [CONTADOR 23:59]

"Você está a 1 clique de transformar seu negócio com ${productName}"

O que você vai receber HOJE:

✅ Acesso vitalício ao ${productName}
✅ ${productDesc}
✅ Suporte prioritário por 90 dias
✅ Grupo VIP de networking
✅ Atualizações gratuitas
✅ Bônus exclusivos (valor R$ 3.497)

Valor Total: R$ 7.994

[DESTAQUE PRINCIPAL]

HOJE APENAS: ${price}
Ou 12x de R$ ${Math.round((parseInt(price.replace(/[^0-9]/g, '')) || 497) / 12)}

[ABAIXO DO BOTÃO]

🔒 Compra 100% Segura - SSL Protegido
✅ Garantia de 30 Dias ou Dinheiro de Volta
💳 Parcelamos em até 12x

"Comece hoje, veja resultados em 7 dias ou seu dinheiro de volta"`
  };

  return copyTemplates[copyType] || copyTemplates['headline'];
};

const generateStrategyResponse = (): string => {
  const strategies = [
    {
      title: 'Estratégia de Lançamento Semente',
      description: `FASE 1: PRÉ-LANÇAMENTO (7 dias)

1. Conteúdo de Valor
- Poste 3-5 conteúdos por dia sobre o problema
- Stories mostrando bastidores
- Enquetes para engajar a audiência

2. Aquecimento
- Anuncie que algo grande está vindo
- Crie expectativa sem revelar detalhes
- Abra lista de espera

FASE 2: LANÇAMENTO (4 dias)

Dia 1: Abertura
- Webinar ou VSL revelando a solução
- Oferta com bônus limitados
- Contador regressivo de 96h

Dia 2-3: Nutrição
- Depoimentos de beta testers
- Quebra de objeções
- FAQ ao vivo

Dia 4: Encerramento
- Último dia com urgência
- Bônus extra para últimas horas
- Fechamento às 23:59

FASE 3: PÓS-LANÇAMENTO

- Follow-up com quem não comprou
- Oferta especial com desconto (48h)
- Análise de métricas`,
      metrics: 'Taxa de conversão esperada: 3-8%'
    },
    {
      title: 'Funil Evergreen de Alto Ticket',
      description: `ESTRUTURA COMPLETA:

1. TRÁFEGO (Dia 0)
- Anúncios no Facebook/Instagram
- Público: Empreendedores 25-45 anos
- Budget: R$ 100-300/dia

2. CAPTURA (Dias 0-1)
- Landing page com lead magnet
- Ebook/Webinar grátis
- Taxa de conversão: 35-50%

3. NUTRIÇÃO (Dias 2-7)
- Sequência de 5-7 emails
- Conteúdo de valor + vendas
- Direcionamento para VSL

4. VENDA (Dia 7+)
- VSL de 20-30 minutos
- Oferta clara e urgente
- Checkout com upsell

5. PÓS-VENDA
- Onboarding automatizado
- Remarketing para não-compradores
- Upsells adicionais

INVESTIMENTO:
- R$ 3.000-10.000/mês em tráfego
- ROI esperado: 3x-8x`,
      metrics: 'Meta mensal: R$ 30k-100k'
    },
    {
      title: 'Sistema de Afiliados Escalável',
      description: `FASE 1: ESTRUTURAÇÃO

1. Produto e Comissões
- Defina comissão atrativa (30-50%)
- Crie materiais de divulgação
- Configure tracking avançado

2. Recrutamento Inicial
- Identifique 10-20 afiliados estratégicos
- Grandes audiências no seu nicho
- Ofereça exclusividade inicial

FASE 2: ATIVAÇÃO

1. Treinamento
- Webinar de onboarding
- Scripts e swipe files
- Melhores práticas

2. Materiais
- Anúncios prontos
- Emails de promoção
- Stories e posts

3. Suporte
- Grupo exclusivo no Telegram
- Suporte prioritário
- Calls semanais

FASE 3: ESCALA

1. Gamificação
- Ranking de afiliados
- Prêmios por performance
- Bônus progressivos

2. Expansão
- Abrir para mais afiliados
- Criar níveis (bronze, prata, ouro)
- Desenvolver super afiliados

RESULTADO:
- 50-200 afiliados ativos
- 60-80% das vendas via afiliados
- Crescimento orgânico exponencial`,
      metrics: 'Meta: 100+ afiliados em 90 dias'
    }
  ];

  const selected = strategies[Math.floor(Math.random() * strategies.length)];
  return `${selected.title}\n\n${selected.description}\n\n📊 ${selected.metrics}`;
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body: RequestBody = await req.json();
    const response = generateResponse(body);

    return new Response(
      JSON.stringify({
        success: true,
        response: response,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});