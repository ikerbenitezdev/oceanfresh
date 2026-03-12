$ErrorActionPreference = 'Stop'

$csvPath = 'C:\Users\ikerb\Downloads\9ca4b92e1e92e8b9d09e9325ada5cf31-export.csv'
if (-not (Test-Path $csvPath)) {
  throw "CSV not found: $csvPath"
}

$rows = Import-Csv -Path $csvPath -Delimiter ';'
if (-not $rows -or $rows.Count -eq 0) {
  throw 'CSV has no rows.'
}

function Remove-Diacritics {
  param([string]$Text)
  if ([string]::IsNullOrWhiteSpace($Text)) { return '' }
  $normalized = $Text.Normalize([Text.NormalizationForm]::FormD)
  $chars = New-Object System.Collections.Generic.List[char]
  foreach ($ch in $normalized.ToCharArray()) {
    $cat = [Globalization.CharUnicodeInfo]::GetUnicodeCategory($ch)
    if ($cat -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
      [void]$chars.Add($ch)
    }
  }
  return (-join $chars)
}

function Normalize-Header {
  param([string]$Name)
  $s = Remove-Diacritics $Name
  $s = $s.ToLower()
  $s = $s -replace '[^a-z0-9]',''
  return $s
}

function Normalize-Key {
  param([string]$Text)
  if ([string]::IsNullOrWhiteSpace($Text)) { return '' }
  $value = (Remove-Diacritics $Text).ToLower()
  $value = $value -replace '-scaled$',''
  $value = $value -replace '[-_](\d{2,4}x\d{2,4})$',''
  $value = $value -replace '[^a-z0-9]',''
  return $value
}

function Strip-Html {
  param([string]$Html)
  if ([string]::IsNullOrWhiteSpace($Html)) { return '' }
  $text = [regex]::Replace($Html, '<!--.*?-->', ' ', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  $text = [regex]::Replace($text, '<[^>]+>', ' ')
  $text = [System.Net.WebUtility]::HtmlDecode($text)
  $text = $text -replace '\s+', ' '
  return $text.Trim()
}

function Extract-Field {
  param(
    [string]$Html,
    [string]$LabelPattern
  )
  if ([string]::IsNullOrWhiteSpace($Html)) { return '' }
  $pattern = "(?:${LabelPattern})\s*:\s*</strong>\s*(?:<[^>]+>\s*)*([^<]+)"
  $match = [regex]::Match($Html, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  if ($match.Success) { return $match.Groups[1].Value.Trim() }
  return ''
}

function Slugify {
  param([string]$Value)
  if ([string]::IsNullOrWhiteSpace($Value)) { return 'producto' }
  $ascii = (Remove-Diacritics $Value).ToLower()
  $ascii = $ascii -replace '[^a-z0-9]+','-'
  $ascii = $ascii.Trim('-')
  if ([string]::IsNullOrWhiteSpace($ascii)) { return 'producto' }
  return $ascii
}

function Infer-Category {
  param([string]$Name)
  $n = (Remove-Diacritics $Name).ToLower()
  if ($n -match 'pulpo|sepia|calamar') { return 'Cefalopodos' }
  if ($n -match 'gamba|camaron|langost|centolla|cigarra|paramola|gerion|calapa') { return 'Crustaceos' }
  if ($n -match 'raya|chucho|cornuda|musola|quelvacho|guitarra|tremolina|torpedo|perro|rata') { return 'Condroictios' }
  return 'Pescado'
}

$headerMap = @{}
foreach ($h in $rows[0].PSObject.Properties.Name) {
  $headerMap[(Normalize-Header $h)] = $h
}

$colUrl = $headerMap['urldelaimagen']
$colName = $headerMap['nombre']
$colPrice = $headerMap['precio']
$colCategory = $headerMap['categorias']
$colShort = $headerMap['descripcioncorta']
$colLong = $headerMap['descripcionlarga']

$localFiles = Get-ChildItem -Path 'public/productos' -File | Select-Object -ExpandProperty Name
$localByExact = @{}
$localByNorm = @{}
foreach ($file in $localFiles) {
  $localByExact[$file.ToLower()] = "/productos/$file"
  $norm = Normalize-Key ([System.IO.Path]::GetFileNameWithoutExtension($file))
  if (-not [string]::IsNullOrWhiteSpace($norm) -and -not $localByNorm.ContainsKey($norm)) {
    $localByNorm[$norm] = "/productos/$file"
  }
}

$imageAliases = @{
  'gambbadealtura' = '/productos/gamba-de-altura.png'
}

$usedIds = @{}
$result = @()

foreach ($row in $rows) {
  $name = if ($colName) { [string]$row.$colName } else { '' }
  $name = $name.Trim()

  $url = if ($colUrl) { [string]$row.$colUrl } else { '' }
  $url = $url.Trim()

  if ([string]::IsNullOrWhiteSpace($name)) { continue }
  if ((Normalize-Key $name) -eq 'muestradelapaginadelproducto') { continue }

  $fileName = ''
  if (-not [string]::IsNullOrWhiteSpace($url)) {
    try {
      $fileName = [System.IO.Path]::GetFileName(([uri]$url).AbsolutePath)
    } catch {
      $fileName = ''
    }
  }

  $imageUrl = ''
  if (-not [string]::IsNullOrWhiteSpace($fileName)) {
    $exact = $fileName.ToLower()
    if ($localByExact.ContainsKey($exact)) {
      $imageUrl = $localByExact[$exact]
    } else {
      $norm = Normalize-Key ([System.IO.Path]::GetFileNameWithoutExtension($fileName))
      if ($localByNorm.ContainsKey($norm)) {
        $imageUrl = $localByNorm[$norm]
      } elseif ($imageAliases.ContainsKey($norm)) {
        $imageUrl = $imageAliases[$norm]
      } else {
        $best = $null
        foreach ($local in $localFiles) {
          $localNorm = Normalize-Key ([System.IO.Path]::GetFileNameWithoutExtension($local))
          if ([string]::IsNullOrWhiteSpace($localNorm)) { continue }
          if ($localNorm -like "*$norm*" -or $norm -like "*$localNorm*") {
            $best = $local
            break
          }
        }
        if ($best) {
          $imageUrl = "/productos/$best"
        }
      }
    }
  }

  if ([string]::IsNullOrWhiteSpace($imageUrl)) {
    $imageUrl = $url
  }

  if ($imageUrl -like 'http://solounpago.com/*') {
    $imageUrl = $imageUrl -replace '^http://', 'https://'
  }

  $shortHtml = if ($colShort) { [string]$row.$colShort } else { '' }
  $longHtml = if ($colLong) { [string]$row.$colLong } else { '' }

  $shortText = Strip-Html $shortHtml
  $longText = Strip-Html $longHtml

  $desc = if (-not [string]::IsNullOrWhiteSpace($longText)) {
    $longText
  } elseif (-not [string]::IsNullOrWhiteSpace($shortText)) {
    $shortText
  } else {
    "$name disponible para exportacion. Consulta talla y disponibilidad."
  }

  $shortNorm = Remove-Diacritics $shortText

  $zone = ''
  if ($shortNorm -match 'Zona de captura:\s*(.+?)(?=\s+Certificacion(?: sanitaria)?:|$)') {
    $zone = $matches[1].Trim()
  }
  if ([string]::IsNullOrWhiteSpace($zone)) { $zone = 'Atlantico Centro-Este - Mauritania' }

  $scientific = ''
  if ($shortNorm -match 'Nombre cientifico:\s*(.+?)(?=\s+Presentacion:|$)') {
    $scientific = $matches[1].Trim()
  }

  $presentation = ''
  if ($shortNorm -match 'Presentacion:\s*(.+?)(?=\s+Temperatura de conservacion:|$)') {
    $presentation = $matches[1].Trim()
  }

  $temperature = ''
  if ($shortNorm -match 'Temperatura de conservacion:\s*(.+?)(?=\s+Envasado:|$)') {
    $temperature = $matches[1].Trim()
  }

  $packaging = ''
  if ($shortNorm -match 'Envasado:\s*(.+?)(?=\s+Zona de captura:|$)') {
    $packaging = $matches[1].Trim()
  }

  $cert = ''
  if ($shortNorm -match 'Certificacion(?: sanitaria)?:\s*(.+)$') {
    $cert = $matches[1].Trim()
  }

  $category = if ($colCategory) { [string]$row.$colCategory } else { '' }
  $category = $category.Trim()
  if ([string]::IsNullOrWhiteSpace($category)) {
    $category = Infer-Category $name
  }

  $price = if ($colPrice) { [string]$row.$colPrice } else { '' }
  $price = $price.Trim()

  $id = Slugify $name
  if ($usedIds.ContainsKey($id)) {
    $usedIds[$id] = $usedIds[$id] + 1
    $id = "$id-$($usedIds[$id])"
  } else {
    $usedIds[$id] = 1
  }

  $result += [pscustomobject]@{
    id = $id
    nombre = $name
    origen = $zone
    descripcion = $desc
    imagen_url = $imageUrl
    categoria = $category
    talla_minima = 'Consultar'
    temporada = 'Todo el ano'
    precio = $(if ([string]::IsNullOrWhiteSpace($price)) { $null } else { $price })
    ficha_tecnica = [pscustomobject]@{
      nombre_cientifico = $scientific
      presentacion = $presentation
      temperatura_conservacion = $temperature
      envasado = $packaging
      zona_captura = $zone
      certificacion = $cert
    }
    descripcion_corta = $shortText
    descripcion_larga = $longText
  }
}

$jsonOutput = $result | ConvertTo-Json -Depth 6
$jsonPath = [System.IO.Path]::GetFullPath('data/productos.json')
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($jsonPath, $jsonOutput, $utf8NoBom)

$remoteCount = ($result | Where-Object { $_.imagen_url -like 'http*' }).Count
Write-Output "Productos importados: $($result.Count)"
Write-Output "Imagenes locales: $($result.Count - $remoteCount)"
Write-Output "Imagenes remotas: $remoteCount"
