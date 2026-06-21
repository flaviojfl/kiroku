// As datas dos eventos são "data pura" (sem hora), salvas à meia-noite UTC.
// Por isso formatamos em UTC, para não exibir o dia anterior em fusos como o do Brasil.
export function formatarData(data) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(data));
}

export function formatarDataCurta(data) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(data));
}
