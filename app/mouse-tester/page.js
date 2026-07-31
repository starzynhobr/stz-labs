import { permanentRedirect } from 'next/navigation';

/**
 * A ferramenta virou um cluster com uma rota por teste. O redirecionamento
 * permanente preserva os links antigos e transfere o histórico da URL.
 */
export default function LegacyMouseTesterPage() {
    permanentRedirect('/pt/mouse/teste-de-clique');
}
