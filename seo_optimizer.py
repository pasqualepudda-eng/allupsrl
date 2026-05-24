#!/usr/bin/env python3
"""
AllUp S.r.l. — Comprehensive SEO Optimization Script
Targets: Make AllUp the #1 FM company in Rome on Google
"""

import re
import os
import json

BASE_DIR = "/Users/pasqualelevelapp/lumisclean2"
DOMAIN    = "https://www.allupsrl.it"
OG_IMAGE  = f"{DOMAIN}/og-image.jpg"

# ─── Page definitions ────────────────────────────────────────────────────────

PAGES = {
    "index.html": {
        "url": f"{DOMAIN}/",
        "title": "AllUp | Facility Management & Pulizie Professionali Roma",
        "desc": "Facility Management integrato a Roma: pulizie professionali, sanificazione ozono, portierato, disinfestazione. Certificati ISO 9001 e HACCP. Preventivo gratuito 24h.",
        "keywords": "facility management roma, pulizie professionali roma, impresa pulizie roma, sanificazione uffici roma, pulizie civili industriali roma",
        "robots": "index, follow",
        "og_type": "website",
        "schema_type": "homepage",
        "breadcrumb": False,
        "page_name": "Home",
    },
    "servizi.html": {
        "url": f"{DOMAIN}/servizi.html",
        "title": "Servizi Pulizia & Facility Management Roma | AllUp",
        "desc": "7 servizi FM a Roma: pulizie civili e industriali, sanificazione ozono, disinfestazione, portierato, lavanolo, verde aziendale. ISO 9001 HACCP. Preventivo gratis.",
        "keywords": "servizi pulizia roma, sanificazione ozono roma, disinfestazione roma, portierato roma, pulizie industriali roma, lavanolo roma, manutenzione verde aziendale",
        "robots": "index, follow",
        "og_type": "website",
        "schema_type": "service",
        "breadcrumb": True,
        "page_name": "Servizi",
    },
    "chi-siamo.html": {
        "url": f"{DOMAIN}/chi-siamo.html",
        "title": "Chi Siamo | AllUp Impresa Pulizie Roma dal 2015",
        "desc": "AllUp è un'azienda di Facility Management a Roma dal 2015. Team certificato ISO 9001, HACCP. Scopri la nostra storia, i valori e chi garantisce qualità ogni giorno.",
        "keywords": "allup srl roma, impresa pulizie roma storia, facility management roma, chi siamo allup, team pulizie professionali roma",
        "robots": "index, follow",
        "og_type": "website",
        "schema_type": "about",
        "breadcrumb": True,
        "page_name": "Chi Siamo",
    },
    "contatti.html": {
        "url": f"{DOMAIN}/contatti.html",
        "title": "Contatti AllUp Roma | Tel +39 06 70496958",
        "desc": "Contatta AllUp per Facility Management e pulizie a Roma. Tel: +39 06 70496958. Via Lusitania 4, 00183 Roma. Risposta garantita entro 24 ore. Preventivo gratuito.",
        "keywords": "contatti allup roma, impresa pulizie roma telefono, preventivo pulizie roma, facility management contatti, allup via lusitania",
        "robots": "index, follow",
        "og_type": "website",
        "schema_type": "contact",
        "breadcrumb": True,
        "page_name": "Contatti",
    },
    "preventivo.html": {
        "url": f"{DOMAIN}/preventivo.html",
        "title": "Preventivo Gratuito Pulizie Roma | AllUp Facility Management",
        "desc": "Richiedi preventivo gratuito per pulizie e Facility Management a Roma. Risposta entro 24h. Sopralluogo senza impegno. Certificati ISO 9001 HACCP. Contattaci ora.",
        "keywords": "preventivo pulizie roma, preventivo facility management roma, preventivo sanificazione roma, preventivo gratuito uffici roma, pulizie professionali prezzi",
        "robots": "index, follow",
        "og_type": "website",
        "schema_type": "quote",
        "breadcrumb": True,
        "page_name": "Preventivo Gratuito",
    },
    "lavora-con-noi.html": {
        "url": f"{DOMAIN}/lavora-con-noi.html",
        "title": "Lavora con Noi | AllUp Roma - Operatori Facility Management",
        "desc": "Unisciti al team AllUp di Roma. Ricerchiamo operatori pulizia, addetti sanificazione, coordinatori FM. Contratto nazionale, formazione continua. Candidati ora.",
        "keywords": "lavora allup roma, operatore pulizie roma lavoro, addetto sanificazione roma, facility management lavoro roma, impresa pulizie assunzioni",
        "robots": "index, follow",
        "og_type": "website",
        "schema_type": "jobs",
        "breadcrumb": True,
        "page_name": "Lavora con Noi",
    },
    "blog.html": {
        "url": f"{DOMAIN}/blog.html",
        "title": "Blog Facility Management & Igiene Aziendale Roma | AllUp",
        "desc": "Guide pratiche su facility management, sanificazione professionale, prevenzione virus e igiene aziendale a Roma. Aggiornamenti e consigli dagli esperti AllUp.",
        "keywords": "blog facility management roma, igiene aziendale roma, sanificazione professionale consigli, prevenzione virus ufficio, pulizie professionali guide",
        "robots": "index, follow",
        "og_type": "website",
        "schema_type": "blog",
        "breadcrumb": True,
        "page_name": "Blog",
    },
    "blog-virus-uffici.html": {
        "url": f"{DOMAIN}/blog-virus-uffici.html",
        "title": "Virus Influenzali in Ufficio Roma: Prevenzione | AllUp",
        "desc": "I virus influenzali sopravvivono 72h sulle superfici degli uffici. Scopri i 7 punti critici e i protocolli certificati AllUp per proteggere i tuoi spazi. Roma.",
        "keywords": "virus ufficio roma, prevenzione influenza ufficio, sanificazione superfici roma, protocollo antivirus ufficio, pulizie anti-contagio roma",
        "robots": "index, follow",
        "og_type": "article",
        "schema_type": "article",
        "breadcrumb": True,
        "page_name": "Virus Influenzali in Ufficio",
        "article_date": "2026-05-15",
        "article_category": "Virus & Prevenzione",
    },
    "blog-ozono-sanificazione.html": {
        "url": f"{DOMAIN}/blog-ozono-sanificazione.html",
        "title": "Sanificazione a Ozono Roma: Come Funziona | AllUp",
        "desc": "Sanificazione a ozono: elimina il 99,99% di virus e batteri, penetra ogni angolo. Come funziona, dove applicarla e perché è superiore ai metodi tradizionali. Roma.",
        "keywords": "sanificazione ozono roma, ozono professionale roma, sanificazione profonda roma, disinfezione ozono uffici, impresa sanificazione roma",
        "robots": "index, follow",
        "og_type": "article",
        "schema_type": "article",
        "breadcrumb": True,
        "page_name": "Sanificazione a Ozono",
        "article_date": "2026-05-10",
        "article_category": "Sanificazione",
    },
    "blog-errori-pulizia-ufficio.html": {
        "url": f"{DOMAIN}/blog-errori-pulizia-ufficio.html",
        "title": "5 Errori Pulizia Ufficio che Diffondono Batteri | AllUp Roma",
        "desc": "Il 78% delle aziende non ha un protocollo di pulizia corretto. Ecco i 5 errori che trasformano l'ufficio in incubatore di batteri e come correggerli subito. Roma.",
        "keywords": "errori pulizia ufficio roma, protocollo pulizia ufficio, batteri ufficio prevenzione, igiene ufficio roma, pulizia corretta ambienti lavoro",
        "robots": "index, follow",
        "og_type": "article",
        "schema_type": "article",
        "breadcrumb": True,
        "page_name": "5 Errori Pulizia Ufficio",
        "article_date": "2026-05-05",
        "article_category": "Tips & Consigli",
    },
    "blog-facility-management-futuro.html": {
        "url": f"{DOMAIN}/blog-facility-management-futuro.html",
        "title": "Facility Management Roma: Outsourcing & Risparmio | AllUp",
        "desc": "Il FM integrato riduce i costi fino al 23% e semplifica la gestione degli spazi. Perché le aziende romane scelgono l'outsourcing facility management. Guida AllUp.",
        "keywords": "facility management roma, outsourcing fm roma, gestione edifici roma, fm integrato risparmio, partner facility management",
        "robots": "index, follow",
        "og_type": "article",
        "schema_type": "article",
        "breadcrumb": True,
        "page_name": "Facility Management Roma",
        "article_date": "2026-04-28",
        "article_category": "Facility Management",
    },
    "blog-norovirus-prevenzione.html": {
        "url": f"{DOMAIN}/blog-norovirus-prevenzione.html",
        "title": "Norovirus Ufficio Roma: Prevenzione e Sanificazione | AllUp",
        "desc": "Il norovirus sopravvive 21 giorni sulle superfici e resiste all'alcool. Protocollo certificato AllUp per eliminarlo dagli ambienti di lavoro a Roma. Scopri come.",
        "keywords": "norovirus ufficio roma, prevenzione norovirus ambienti lavoro, sanificazione norovirus roma, gastroenterite prevenzione ufficio, virus stomaco roma",
        "robots": "index, follow",
        "og_type": "article",
        "schema_type": "article",
        "breadcrumb": True,
        "page_name": "Norovirus Ufficio",
        "article_date": "2026-05-01",
        "article_category": "Virus & Prevenzione",
    },
    "blog-costi-facility.html": {
        "url": f"{DOMAIN}/blog-costi-facility.html",
        "title": "Ridurre Costi Facility Management Roma -30% | AllUp",
        "desc": "Come ridurre i costi di gestione immobiliare fino al 30% con il FM integrato. Formula di calcolo, 5 leve di risparmio e guida pratica per immobili a Roma.",
        "keywords": "ridurre costi facility management roma, costi gestione edificio roma, risparmio fm integrato, gestione immobiliare economica, outsourcing pulizie risparmio",
        "robots": "index, follow",
        "og_type": "article",
        "schema_type": "article",
        "breadcrumb": True,
        "page_name": "Ridurre Costi Facility Management",
        "article_date": "2026-04-20",
        "article_category": "Facility Management",
    },
    "privacy-policy.html": {
        "url": f"{DOMAIN}/privacy-policy.html",
        "title": "Privacy Policy | AllUp S.r.l. Roma",
        "desc": "Informativa trattamento dati personali AllUp S.r.l. ai sensi GDPR (Regolamento UE 2016/679). Via Lusitania 4, 00183 Roma RM.",
        "keywords": "",
        "robots": "noindex, follow",
        "og_type": "website",
        "schema_type": "none",
        "breadcrumb": True,
        "page_name": "Privacy Policy",
    },
    "termini-condizioni.html": {
        "url": f"{DOMAIN}/termini-condizioni.html",
        "title": "Termini e Condizioni | AllUp S.r.l. Roma",
        "desc": "Termini e condizioni generali di contratto per i servizi AllUp S.r.l. Facility Management Roma. Via Lusitania 4, 00183 Roma.",
        "keywords": "",
        "robots": "noindex, follow",
        "og_type": "website",
        "schema_type": "none",
        "breadcrumb": True,
        "page_name": "Termini e Condizioni",
    },
    "sitemap.html": {
        "url": f"{DOMAIN}/sitemap.html",
        "title": "Sitemap | AllUp Facility Management Roma",
        "desc": "Mappa del sito AllUp S.r.l. - Tutti i servizi di Facility Management e pulizie professionali disponibili a Roma.",
        "keywords": "",
        "robots": "noindex, follow",
        "og_type": "website",
        "schema_type": "none",
        "breadcrumb": True,
        "page_name": "Sitemap",
    },
}

# ─── Base JSON-LD schema (LocalBusiness + WebSite) ────────────────────────────

BASE_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": ["LocalBusiness", "CleaningService"],
            "@id": "https://www.allupsrl.it/#business",
            "name": "AllUp S.r.l.",
            "legalName": "AllUp S.r.l.",
            "description": "Facility Management integrato a Roma: pulizie professionali, sanificazione a ozono, disinfestazione, portierato, lavanolo e manutenzione del verde.",
            "url": "https://www.allupsrl.it",
            "telephone": "+390670496958",
            "email": "amministrazione@allupsrl.it",
            "foundingDate": "2015",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Via Lusitania, 4",
                "addressLocality": "Roma",
                "addressRegion": "RM",
                "postalCode": "00183",
                "addressCountry": "IT"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "41.8818",
                "longitude": "12.5191"
            },
            "areaServed": [
                {"@type": "City", "name": "Roma"},
                {"@type": "State", "name": "Lazio"}
            ],
            "priceRange": "€€",
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "08:00",
                    "closes": "18:00"
                }
            ],
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servizi Facility Management Roma",
                "itemListElement": [
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Sanificazione a Ozono Roma", "provider": {"@id": "https://www.allupsrl.it/#business"}}},
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Pulizie Civili e Industriali Roma"}},
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Disinfestazione e Derattizzazione Roma"}},
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Facchinaggio Roma"}},
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Portierato e Reception Roma"}},
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Lavanolo Roma"}},
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Manutenzione del Verde Roma"}}
                ]
            },
            "sameAs": [
                "https://www.facebook.com/allupsrl",
                "https://www.instagram.com/allupsrl",
                "https://www.linkedin.com/company/allup-srl"
            ]
        },
        {
            "@type": "WebSite",
            "@id": "https://www.allupsrl.it/#website",
            "url": "https://www.allupsrl.it",
            "name": "AllUp - Facility Management Roma",
            "publisher": {"@id": "https://www.allupsrl.it/#business"},
            "inLanguage": "it-IT",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.allupsrl.it/?s={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        }
    ]
}


def build_article_schema(page_url, title, desc, date, category):
    return {
        "@type": "Article",
        "@id": f"{page_url}#article",
        "headline": title,
        "description": desc,
        "datePublished": date,
        "dateModified": date,
        "author": {"@type": "Organization", "@id": "https://www.allupsrl.it/#business"},
        "publisher": {"@id": "https://www.allupsrl.it/#business"},
        "mainEntityOfPage": {"@type": "WebPage", "@id": page_url},
        "articleSection": category,
        "inLanguage": "it-IT",
        "image": {
            "@type": "ImageObject",
            "url": "https://www.allupsrl.it/og-image.jpg",
            "width": 1200,
            "height": 630
        }
    }


def build_breadcrumb_schema(page_name, page_url):
    return {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allupsrl.it/"},
            {"@type": "ListItem", "position": 2, "name": page_name, "item": page_url}
        ]
    }


def build_jsonld(filename, page):
    """Build the full JSON-LD block for a page."""
    import copy
    schema = copy.deepcopy(BASE_SCHEMA)

    # Add Article schema for article pages
    if page["schema_type"] == "article":
        article = build_article_schema(
            page["url"],
            page["title"],
            page["desc"],
            page.get("article_date", "2026-05-24"),
            page.get("article_category", "Facility Management")
        )
        schema["@graph"].append(article)

    # Add BreadcrumbList for all non-index pages
    if page.get("breadcrumb", False):
        breadcrumb = build_breadcrumb_schema(page["page_name"], page["url"])
        schema["@graph"].append(breadcrumb)

    json_str = json.dumps(schema, ensure_ascii=False, indent=2)
    return f'<script type="application/ld+json">\n{json_str}\n</script>'


def build_seo_tags(filename, page):
    """Build the complete block of SEO meta tags to inject after charset/viewport."""
    lines = []

    # Title
    lines.append(f'<title>{page["title"]}</title>')

    # Core meta
    lines.append(f'<meta name="description" content="{page["desc"]}">')
    if page["keywords"]:
        lines.append(f'<meta name="keywords" content="{page["keywords"]}">')
    lines.append(f'<meta name="robots" content="{page["robots"]}">')
    lines.append('<meta name="author" content="AllUp S.r.l.">')

    # Geo meta
    lines.append('<meta name="geo.region" content="IT-RM">')
    lines.append('<meta name="geo.placename" content="Roma">')
    lines.append('<meta name="geo.position" content="41.8818;12.5191">')
    lines.append('<meta name="ICBM" content="41.8818, 12.5191">')

    # Canonical
    lines.append(f'<link rel="canonical" href="{page["url"]}">')

    # Open Graph
    lines.append(f'<meta property="og:type" content="{page["og_type"]}">')
    lines.append(f'<meta property="og:url" content="{page["url"]}">')
    lines.append(f'<meta property="og:title" content="{page["title"]}">')
    lines.append(f'<meta property="og:description" content="{page["desc"]}">')
    lines.append('<meta property="og:site_name" content="AllUp S.r.l.">')
    lines.append('<meta property="og:locale" content="it_IT">')
    lines.append(f'<meta property="og:image" content="{OG_IMAGE}">')

    # Twitter Card
    lines.append('<meta name="twitter:card" content="summary_large_image">')
    lines.append(f'<meta name="twitter:title" content="{page["title"]}">')
    lines.append(f'<meta name="twitter:description" content="{page["desc"]}">')

    # Preconnect for fonts
    lines.append('<link rel="preconnect" href="https://fonts.googleapis.com">')
    lines.append('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>')

    return "\n".join(lines)


# Patterns to strip from <head>
STRIP_PATTERNS = [
    # <title>...</title> (possibly multiline but practically single-line)
    re.compile(r'<title>.*?</title>', re.IGNORECASE | re.DOTALL),
    # meta description / keywords / robots / author / geo / icbm
    re.compile(r'<meta\s+name="description"[^>]*>', re.IGNORECASE),
    re.compile(r'<meta\s+name="keywords"[^>]*>', re.IGNORECASE),
    re.compile(r'<meta\s+name="robots"[^>]*>', re.IGNORECASE),
    re.compile(r'<meta\s+name="author"[^>]*>', re.IGNORECASE),
    re.compile(r'<meta\s+name="geo\.[^"]*"[^>]*>', re.IGNORECASE),
    re.compile(r'<meta\s+name="ICBM"[^>]*>', re.IGNORECASE),
    # canonical
    re.compile(r'<link\s+rel="canonical"[^>]*>', re.IGNORECASE),
    # Open Graph
    re.compile(r'<meta\s+property="og:[^"]*"[^>]*>', re.IGNORECASE),
    # Twitter
    re.compile(r'<meta\s+name="twitter:[^"]*"[^>]*>', re.IGNORECASE),
    # Preconnect to fonts
    re.compile(r'<link\s+rel="preconnect"\s+href="https://fonts[^>]*>', re.IGNORECASE),
    # JSON-LD script blocks
    re.compile(r'<script\s+type="application/ld\+json">.*?</script>', re.IGNORECASE | re.DOTALL),
]


def strip_old_tags(head_content):
    """Remove all old SEO-related tags from the head content."""
    for pattern in STRIP_PATTERNS:
        head_content = pattern.sub('', head_content)
    # Clean up excessive blank lines left after removal
    head_content = re.sub(r'\n{3,}', '\n\n', head_content)
    return head_content


def process_html_file(filename, page):
    filepath = os.path.join(BASE_DIR, filename)
    if not os.path.exists(filepath):
        print(f"  [SKIP] {filename} — file not found")
        return False

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # ── Locate <head> ... </head> ─────────────────────────────────────────────
    head_match = re.search(r'(<head>)(.*?)(</head>)', content, re.IGNORECASE | re.DOTALL)
    if not head_match:
        print(f"  [SKIP] {filename} — <head> not found")
        return False

    head_open  = head_match.group(1)
    head_body  = head_match.group(2)
    head_close = head_match.group(3)

    # ── Strip old SEO tags from head body ─────────────────────────────────────
    head_body_clean = strip_old_tags(head_body)

    # ── Identify the anchor: charset + viewport lines ─────────────────────────
    # We want to insert SEO tags right after the viewport meta tag
    # Pattern: find <meta charset ... > and <meta name="viewport" ...>
    # They're usually on consecutive lines; find the end position of viewport tag.

    viewport_pattern = re.compile(
        r'(<meta\s+charset[^>]*>)([ \t]*\n?[ \t]*)(<meta\s+name="viewport"[^>]*>)',
        re.IGNORECASE
    )
    vp_match = viewport_pattern.search(head_body_clean)

    seo_block   = build_seo_tags(filename, page)
    jsonld_block = build_jsonld(filename, page)

    if vp_match:
        # Insert SEO tags right after the viewport tag
        insert_pos = vp_match.end()
        head_body_new = (
            head_body_clean[:insert_pos]
            + "\n"
            + seo_block
            + head_body_clean[insert_pos:]
        )
    else:
        # Fallback: insert at start of head body (after possible whitespace)
        head_body_new = "\n" + seo_block + "\n" + head_body_clean

    # ── Inject JSON-LD right before </head> ───────────────────────────────────
    head_body_new = head_body_new.rstrip() + "\n" + jsonld_block + "\n"

    new_head = head_open + head_body_new + head_close
    new_content = content[:head_match.start()] + new_head + content[head_match.end():]

    if new_content == original_content:
        print(f"  [UNCHANGED] {filename}")
        return False

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True


# ─── robots.txt ───────────────────────────────────────────────────────────────

ROBOTS_TXT = """\
User-agent: *
Allow: /
Disallow: /privacy-policy.html
Disallow: /termini-condizioni.html
Disallow: /sitemap.html

Sitemap: https://www.allupsrl.it/sitemap.xml
"""

# ─── sitemap.xml ──────────────────────────────────────────────────────────────

SITEMAP_PAGES = [
    ("https://www.allupsrl.it/",                             "2026-05-24", "weekly",  "1.0"),
    ("https://www.allupsrl.it/servizi.html",                 "2026-05-24", "monthly", "0.9"),
    ("https://www.allupsrl.it/contatti.html",                "2026-05-24", "monthly", "0.8"),
    ("https://www.allupsrl.it/preventivo.html",              "2026-05-24", "monthly", "0.8"),
    ("https://www.allupsrl.it/chi-siamo.html",               "2026-05-24", "monthly", "0.7"),
    ("https://www.allupsrl.it/lavora-con-noi.html",          "2026-05-24", "monthly", "0.6"),
    ("https://www.allupsrl.it/blog.html",                    "2026-05-24", "weekly",  "0.8"),
    ("https://www.allupsrl.it/blog-virus-uffici.html",       "2026-05-24", "monthly", "0.7"),
    ("https://www.allupsrl.it/blog-ozono-sanificazione.html","2026-05-24", "monthly", "0.7"),
    ("https://www.allupsrl.it/blog-errori-pulizia-ufficio.html","2026-05-24","monthly","0.7"),
    ("https://www.allupsrl.it/blog-facility-management-futuro.html","2026-05-24","monthly","0.7"),
    ("https://www.allupsrl.it/blog-norovirus-prevenzione.html","2026-05-24","monthly","0.7"),
    ("https://www.allupsrl.it/blog-costi-facility.html",     "2026-05-24", "monthly", "0.7"),
]

def build_sitemap():
    url_entries = []
    for loc, lastmod, freq, priority in SITEMAP_PAGES:
        url_entries.append(
            f"  <url>\n"
            f"    <loc>{loc}</loc>\n"
            f"    <lastmod>{lastmod}</lastmod>\n"
            f"    <changefreq>{freq}</changefreq>\n"
            f"    <priority>{priority}</priority>\n"
            f"  </url>"
        )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
        '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n'
        '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n'
        '          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n'
        + "\n".join(url_entries)
        + "\n</urlset>\n"
    )


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    print("=" * 65)
    print("  AllUp SEO Optimization — Starting")
    print("=" * 65)

    total = 0
    updated = 0
    skipped = 0

    for filename, page in PAGES.items():
        total += 1
        print(f"\n[{total:02d}/{len(PAGES)}] Processing: {filename}")
        schema_label = page["schema_type"].upper() if page["schema_type"] != "none" else "NONE"
        breadcrumb_label = "YES" if page.get("breadcrumb") else "NO"
        print(f"       Title    : {page['title']}")
        print(f"       Robots   : {page['robots']}")
        print(f"       Schema   : {schema_label}  |  Breadcrumb: {breadcrumb_label}")

        result = process_html_file(filename, page)
        if result:
            print(f"       Status   : UPDATED")
            updated += 1
        else:
            # process_html_file prints its own skip/unchanged message
            skipped += 1

    # Write robots.txt
    robots_path = os.path.join(BASE_DIR, "robots.txt")
    with open(robots_path, 'w', encoding='utf-8') as f:
        f.write(ROBOTS_TXT)
    print(f"\n[robots.txt]   WRITTEN -> {robots_path}")

    # Write sitemap.xml
    sitemap_path = os.path.join(BASE_DIR, "sitemap.xml")
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(build_sitemap())
    print(f"[sitemap.xml]  WRITTEN -> {sitemap_path}")

    print("\n" + "=" * 65)
    print(f"  DONE — {updated} HTML files updated, {skipped} skipped/unchanged")
    print(f"  robots.txt and sitemap.xml created")
    print("=" * 65)


if __name__ == "__main__":
    main()
