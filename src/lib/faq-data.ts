export const FAQ_ITEMS = [
  {
    q: "HilfeNetz garantit-il l'obtention d'un don ?",
    a: "Non. HilfeNetz est une plateforme de mise en relation. La publication d'une demande ne garantit pas qu'un don sera accordé.",
  },

  {
    q: "Qui décide de l'attribution d'un don ?",
    a: "La décision appartient exclusivement au donateur concerné. HilfeNetz facilite la mise en relation mais ne décide pas de l'attribution.",
  },
  {
    q: "Le montant affiché est-il garanti ?",
    a: "Le montant indiqué est celui proposé par le donateur. Il ne constitue ni une promesse ni une garantie de financement.",
  },
  {
    q: "Dois-je indiquer le montant que je souhaite recevoir ?",
    a: "Vous décrivez votre situation et votre besoin ; le donateur définit ses propres critères et décide librement.",
  },
  {
    q: "HilfeNetz est-il une banque ?",
    a: "Non. HilfeNetz n'est ni une banque ni un établissement de crédit, et ne propose aucun produit financier.",
  },
  {
    q: "Une demande peut-elle être refusée ?",
    a: "Oui. Les demandes incomplètes, inexactes ou manifestement frauduleuses peuvent être refusées ou supprimées.",
  },
  {
    q: "Comment signaler une annonce suspecte ?",
    a: "Utilisez la page « Signaler une annonce » pour décrire l'annonce ou le comportement concerné. Chaque signalement est examiné par l'équipe.",
  },
];

export const FAQ_ITEMS_BY_LOCALE: Record<string, { q: string; a: string }[]> = {
  fr: FAQ_ITEMS,
  de: [
    {
      q: "Garantiert HilfeNetz den Erhalt einer Spende?",
      a: "Nein. HilfeNetz ist eine Vermittlungsplattform. Die Veröffentlichung einer Anfrage garantiert nicht, dass eine Spende zugesagt wird.",
    },

    {
      q: "Wer entscheidet über die Vergabe einer Spende?",
      a: "Die Entscheidung liegt ausschließlich beim jeweiligen Spender. HilfeNetz erleichtert die Vermittlung, entscheidet aber nicht über die Vergabe.",
    },
    {
      q: "Ist der angezeigte Betrag garantiert?",
      a: "Der angegebene Betrag ist der vom Spender vorgeschlagene Betrag. Er stellt weder ein Versprechen noch eine Finanzierungsgarantie dar.",
    },
    {
      q: "Muss ich den gewünschten Betrag angeben?",
      a: "Sie beschreiben Ihre Situation und Ihren Bedarf; der Spender legt seine eigenen Kriterien fest und entscheidet frei.",
    },
    {
      q: "Ist HilfeNetz eine Bank?",
      a: "Nein. HilfeNetz ist weder eine Bank noch ein Kreditinstitut und bietet keine Finanzprodukte an.",
    },
    {
      q: "Kann eine Anfrage abgelehnt werden?",
      a: "Ja. Unvollständige, fehlerhafte oder offensichtlich betrügerische Anfragen können abgelehnt oder entfernt werden.",
    },
    {
      q: "Wie melde ich ein verdächtiges Angebot?",
      a: "Nutzen Sie die Seite „Angebot melden“, um das betreffende Angebot oder Verhalten zu beschreiben. Jede Meldung wird vom Team geprüft.",
    },
  ],
  it: [
    {
      q: "HilfeNetz garantisce l'ottenimento di una donazione?",
      a: "No. HilfeNetz è una piattaforma di collegamento. La pubblicazione di una richiesta non garantisce che una donazione venga concessa.",
    },

    {
      q: "Chi decide l'assegnazione di una donazione?",
      a: "La decisione spetta esclusivamente al donatore interessato. HilfeNetz facilita il collegamento ma non decide l'assegnazione.",
    },
    {
      q: "L'importo indicato è garantito?",
      a: "L'importo indicato è quello proposto dal donatore. Non costituisce né una promessa né una garanzia di finanziamento.",
    },
    {
      q: "Devo indicare l'importo che desidero ricevere?",
      a: "Descrivi la tua situazione e il tuo bisogno; il donatore definisce i propri criteri e decide liberamente.",
    },
    {
      q: "HilfeNetz è una banca?",
      a: "No. HilfeNetz non è né una banca né un istituto di credito e non offre alcun prodotto finanziario.",
    },
    {
      q: "Una richiesta può essere rifiutata?",
      a: "Sì. Le richieste incomplete, inesatte o manifestamente fraudolente possono essere rifiutate o rimosse.",
    },
    {
      q: "Come segnalare un annuncio sospetto?",
      a: "Usa la pagina « Segnala un annuncio » per descrivere l'annuncio o il comportamento in questione. Ogni segnalazione viene esaminata dal team.",
    },
  ],
  es: [
    {
      q: "¿HilfeNetz garantiza la obtención de una donación?",
      a: "No. HilfeNetz es una plataforma de conexión. La publicación de una solicitud no garantiza que se conceda una donación.",
    },

    {
      q: "¿Quién decide la concesión de una donación?",
      a: "La decisión corresponde exclusivamente al donante en cuestión. HilfeNetz facilita la conexión pero no decide la concesión.",
    },
    {
      q: "¿El importe mostrado está garantizado?",
      a: "El importe indicado es el propuesto por el donante. No constituye ni una promesa ni una garantía de financiación.",
    },
    {
      q: "¿Debo indicar el importe que deseo recibir?",
      a: "Describes tu situación y tu necesidad; el donante define sus propios criterios y decide libremente.",
    },
    {
      q: "¿HilfeNetz es un banco?",
      a: "No. HilfeNetz no es ni un banco ni una entidad de crédito, y no ofrece ningún producto financiero.",
    },
    {
      q: "¿Puede rechazarse una solicitud?",
      a: "Sí. Las solicitudes incompletas, inexactas o manifiestamente fraudulentas pueden ser rechazadas o eliminadas.",
    },
    {
      q: "¿Cómo denunciar un anuncio sospechoso?",
      a: "Utiliza la página « Denunciar un anuncio » para describir el anuncio o el comportamiento en cuestión. Cada denuncia es examinada por el equipo.",
    },
  ],
  pt: [
    {
      q: "A HilfeNetz garante a obtenção de uma doação?",
      a: "Não. A HilfeNetz é uma plataforma de ligação. A publicação de um pedido não garante que uma doação será concedida.",
    },

    {
      q: "Quem decide a atribuição de uma doação?",
      a: "A decisão pertence exclusivamente ao doador em causa. A HilfeNetz facilita a ligação, mas não decide a atribuição.",
    },
    {
      q: "O montante apresentado é garantido?",
      a: "O montante indicado é o proposto pelo doador. Não constitui uma promessa nem uma garantia de financiamento.",
    },
    {
      q: "Devo indicar o montante que pretendo receber?",
      a: "Descreves a tua situação e a tua necessidade; o doador define os seus próprios critérios e decide livremente.",
    },
    {
      q: "A HilfeNetz é um banco?",
      a: "Não. A HilfeNetz não é um banco nem uma instituição de crédito e não oferece qualquer produto financeiro.",
    },
    {
      q: "Um pedido pode ser recusado?",
      a: "Sim. Pedidos incompletos, incorretos ou manifestamente fraudulentos podem ser recusados ou removidos.",
    },
    {
      q: "Como denunciar um anúncio suspeito?",
      a: "Utiliza a página « Denunciar um anúncio » para descrever o anúncio ou o comportamento em causa. Cada denúncia é examinada pela equipa.",
    },
  ],
};
