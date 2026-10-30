# Cadastra o webhook de releases (stzlabs.com/api/release-hook) nos repositórios das ferramentas.
# O segredo é pedido aqui e vai ao GitHub pela entrada padrão: não aparece na tela nem no histórico.
$repos = 'gf-ui-editor', 'stz-downloader', 'STZ-XML-Translator', 'stz-pdf-suite', 'gym-app'
$hookUrl = 'https://stzlabs.com/api/release-hook'

$secure = Read-Host 'Cole o GITHUB_RELEASES_WEBHOOK_SECRET' -AsSecureString
$secret = [Runtime.InteropServices.Marshal]::PtrToStringBSTR([Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure))
if (-not $secret) { Write-Error 'Segredo vazio.'; exit 1 }

foreach ($repo in $repos) {
    $existing = gh api "repos/starzynhobr/$repo/hooks" --jq ".[] | select(.config.url == `"$hookUrl`") | .id"
    $body = @{
        name = 'web'; active = $true; events = @('release')
        config = @{ url = $hookUrl; content_type = 'json'; secret = $secret; insecure_ssl = '0' }
    } | ConvertTo-Json -Depth 3

    if ($existing) {
        $body | gh api -X PATCH "repos/starzynhobr/$repo/hooks/$existing" --input - --silent
        Write-Host "atualizado: $repo"
    } else {
        $body | gh api -X POST "repos/starzynhobr/$repo/hooks" --input - --silent
        Write-Host "criado: $repo"
    }
}
