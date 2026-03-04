Celeiro Digital

Ambiente: https://celeirodigital.base44.app

Versão: 1.0
Data: 03/03/2026
Classificação: Público 

Responsável Técnico (CTO): Pedro Henrique Brezolin de Freitas

1. OBJETIVO

Estabelecer diretrizes técnicas, administrativas e operacionais para garantir:

Confidencialidade

Integridade

Disponibilidade

Autenticidade

Rastreabilidade

Das informações, ativos digitais e sistemas do Celeiro Digital, assegurando conformidade com:

Lei Geral de Proteção de Dados Pessoais

Marco Civil da Internet (Lei 12.965/2014)

Diretrizes do National Institute of Standards and Technology (NIST – SP 800-207 e SP 800-53)

Boas práticas da ISO 27001/27002

2. ESCOPO

Esta política aplica-se a:

Web Application (Frontend)

APIs e Backend

Banco de dados

Infraestrutura em cloud (Base44 e integrações externas)

Repositórios de código

Ambientes de desenvolvimento, staging e produção

Serviços de terceiros integrados

3. MODELO DE SEGURANÇA ADOTADO
3.1 Zero Trust Architecture

O Celeiro Digital adota princípios de Zero Trust:

Nenhuma entidade é confiável por padrão

Toda requisição é validada continuamente

Acesso concedido sob menor privilégio

Sessões são temporárias e revogáveis

3.2 Princípios Fundamentais

Security by Design

Privacy by Design

Least Privilege

Segregação de ambientes

Defesa em profundidade

4. ARQUITETURA DE SEGURANÇA
4.1 Infraestrutura

HTTPS obrigatório (TLS 1.2+)

Certificado SSL válido

WAF ativo

Proteção contra DDoS

Separação lógica entre frontend, backend e banco

Firewall com portas mínimas abertas

4.2 Segurança de Aplicação

Proteções implementadas contra:

SQL Injection

Cross-Site Scripting (XSS)

Cross-Site Request Forgery (CSRF)

Clickjacking

Injeção de comandos

Escalada de privilégio

4.3 Headers de Segurança

Devem estar ativos:

Content-Security-Policy

X-Frame-Options: DENY

X-Content-Type-Options: nosniff

Referrer-Policy: strict-origin

Permissions-Policy

5. CONTROLE DE ACESSO
5.1 Autenticação

Autenticação baseada em token (JWT ou similar)

Expiração curta de sessão

Refresh token protegido

MFA obrigatório para administradores

5.2 Autorização

Modelo RBAC:

Usuário padrão

Editor (se aplicável)

Administrador

Aplicação do princípio do menor privilégio.

6. PROTEÇÃO DE DADOS
6.1 Dados Potencialmente Coletados

Nome

E-mail

Telefone

Informações cadastrais

IP e logs técnicos

6.2 Criptografia

Criptografia em trânsito (TLS)

Dados sensíveis criptografados em repouso

Senhas armazenadas com hash seguro (bcrypt ou equivalente)

7. LOGS E MONITORAMENTO

Registro de tentativas de login

Registro de alterações administrativas

Logs de acesso a dados sensíveis

Monitoramento de tráfego anômalo

Retenção mínima de logs: 6 meses

8. BACKUP E CONTINUIDADE

Backup automático diário

Retenção mínima de 30 dias

Backup criptografado

Testes periódicos de restauração

RTO máximo: 4 horas

RPO máximo: 24 horas

9. SEGURANÇA NO CICLO DE DESENVOLVIMENTO (Secure SDLC)

Versionamento via Git

Code review obrigatório

Auditoria de dependências

Separação entre ambientes (dev / staging / prod)

Testes de segurança antes de deploy

10. GESTÃO DE INCIDENTES
10.1 Classificação

Baixo impacto

Médio impacto

Alto impacto (ex: vazamento de dados)

10.2 Procedimento

Identificação

Contenção

Erradicação

Recuperação

Análise pós-incidente

Notificação à autoridade competente quando exigido pela LGPD

Tempo máximo de resposta inicial: 72 horas.

11. GESTÃO DE TERCEIROS

Serviços externos devem:

Garantir criptografia

Cumprir LGPD

Possuir política de segurança documentada

Não compartilhar dados sem autorização formal

12. POLÍTICA DE VULNERABILIDADES

Relatórios devem ser enviados para:

security@portofirmedigital.com.br

Informações necessárias:

Descrição técnica

Evidências

Passo a passo de reprodução

Impacto estimado

Prazo de correção:

Crítica: até 7 dias

Alta: até 15 dias

Média: até 30 dias

13. CONFORMIDADE REGULATÓRIA

O Celeiro Digital compromete-se a:

Garantir direitos do titular de dados

Permitir solicitação de acesso, correção e exclusão

Garantir transparência no tratamento de dados

Não realizar decisões automatizadas com impacto jurídico sem revisão humana

14. AUDITORIA E REVISÃO

Revisão anual da política

Auditoria interna semestral

Testes periódicos de vulnerabilidade

Pentest externo recomendado anualmente

15. DECLARAÇÃO FINAL

O Celeiro Digital adota postura estruturada e proativa em segurança da informação, visando:

Proteção dos usuários

Conformidade legal

Redução de risco operacional

Sustentabilidade tecnológica

Documento aprovado por:

Pedro Henrique Brezolin de Freitas
CTO – Celeiro Digital
