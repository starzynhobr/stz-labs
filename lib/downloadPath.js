/**
 * Downloads passam por uma página de agradecimento antes do arquivo.
 * O pedido de apoio vem depois da entrega, não antes.
 */
export const downloadPath = (locale, slug) => `/${locale}/download?app=${slug}`;
