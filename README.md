# ColorMind — primeira versão funcional

Aplicação web demonstrativa para apoiar docentes na revisão e adaptação de materiais pedagógicos considerando barreiras relacionadas ao uso de cores.

## Requisitos
- Node.js 18 ou superior
- npm

## Como executar no Visual Studio Code
1. Extraia o arquivo ZIP.
2. Abra a pasta `colormind` no VS Code.
3. Abra o terminal integrado.
4. Execute:

```bash
npm install
npm run dev
```

5. Acesse o endereço local indicado pelo Vite (normalmente `http://localhost:5173`).

## O que funciona nesta versão
- Navegação entre Visão geral, Scanner, Adaptar atividade, Simulador visual, Biblioteca inclusiva, Indicadores e Perfis.
- Envio local de PDF ou imagem para uma triagem demonstrativa.
- Relatório orientativo exportável em `.txt`.
- Criação de uma proposta inicial de atividade inclusiva com exportação em `.txt`.
- Simulador visual ilustrativo com opções de protanopia, deuteranopia, tritanopia e escala de cinza.
- Biblioteca de boas práticas com orientações expansíveis.
- Indicadores calculados a partir dos materiais da sessão.
- Cadastro e remoção de perfis de apoio durante a sessão.
- Layout responsivo para desktop e dispositivos móveis.

## Limites importantes
Esta versão não possui backend nem conexão com um serviço de IA. O scanner gera uma triagem demonstrativa com recomendações preventivas e não realiza leitura semântica real de PDF/imagens, nem uma avaliação de acessibilidade validada. A simulação visual é ilustrativa e não substitui simuladores cientificamente calibrados ou avaliação profissional. Os dados e perfis ficam na memória da sessão e não são persistidos após recarregar a página.

## Próximas evoluções recomendadas
1. Adicionar backend seguro e autenticação.
2. Integrar OCR e análise de imagens/PDF.
3. Implementar análise real de contraste e redundância de codificação visual.
4. Integrar serviço de IA com revisão humana e explicabilidade.
5. Implementar persistência segura, consentimento e controles de privacidade.
6. Validar as recomendações com especialistas em acessibilidade e pessoas com daltonismo.
