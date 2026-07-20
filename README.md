# Operation Constantine — DFIR Case File

**TLP:AMBER — Restricted Distribution** · Purple Team / DFIR Adversary Emulation

Full digital forensics and incident response reconstruction of a Caldera-emulated intrusion against an isolated Windows 10 lab host, independently re-validated against its own forensic evidence before publication. Every correction in this report is evidence-based — nothing was changed on the strength of a review comment alone.

**[→ View the case site](https://YOUR-GITHUB-USERNAME.github.io/operation-constantine-dfir/)** — replace `YOUR-GITHUB-USERNAME` with your actual GitHub username once the repo is pushed (see [Publishing this site yourself](#publishing-this-site-yourself) below).

---

## Case summary

| | |
|---|---|
| **Target host** | DESKTOP-2A1O8LD (Windows 10 x64) |
| **Threat actor** | Constantine Group (financially motivated) |
| **Campaign window** | 2026-07-05, 06:12Z → 10:07Z (~3h 55m) |
| **C2 infrastructure** | 192.168.67.128:8888 (HTTP, unencrypted) |
| **MITRE ATT&CK coverage** | 30 confirmed techniques + 1 observed-scenario-intent (T1547.001) |
| **Caldera abilities executed** | 35 |
| **Attack streams identified** | 3 concurrent (Caldera automated / secondary implant / manual on-disk tooling) |

The intrusion began with a spearphishing email impersonating internal IT Security, leading to execution of a malicious Python payload and manual deployment of a C2 implant (`splunkd.exe`) masquerading as a legitimate Splunk binary. Credentials were dumped from LSASS, sensitive files were staged and exfiltrated, and a secondary independent implant (`anmar_hacking.exe`) was found operating concurrently. Full narrative, evidence, and reasoning are in the report.

## What's in this repo

```
.
├── index.html                          # Case site (GitHub Pages)
├── assets/                             # Site CSS/JS + 33 original evidence screenshots
├── report/
│   ├── Operation_Constantine_DFIR_Report.docx   # Full report — live TOC, 40+ pages
│   └── Operation_Constantine_DFIR_Report.pdf    # Fixed-layout rendition
├── detection-rules/
│   ├── sigma_operation_constantine.yml # Sigma — C2 deployment + LSASS PROCESS_ALL_ACCESS
│   └── nulltackkatz_payload.yar        # YARA — NulltackKatz credential dumper
├── mitre-mapping/
│   └── mitre_attack_mapping.csv        # 31 techniques × tactic × evidence × confidence
├── timeline/
│   └── unified_timeline.csv            # 29-event consolidated attack timeline
├── iocs/
│   ├── network_iocs.csv
│   ├── file_process_iocs.csv
│   └── email_iocs.csv
└── evidence-log/
    └── evidence_log.csv                # 32 SCR entries with hash/integrity status
```

## Methodology notes

- **Negative findings are reported as negative findings.** T1547.001 (Registry Run Key persistence) was the scenario's documented intent, but six independent sources (HKCU/HKLM Run & RunOnce, Services hive, Sysmon EID 12+13, SAM hive) confirm it was never executed on the physical disk. It's tracked in the MITRE mapping as *Observed Scenario Intent — Not Forensically Confirmed*, not folded into the confirmed-technique count.
- **Hashes are never invented.** Where a forensic artifact wasn't independently hashed at acquisition, the evidence log says so explicitly (`Hash Not Available`) rather than fabricating a value.
- **The attack is modeled as three concurrent streams**, not one linear chain — this is what the Sysmon process lineage and Prefetch data actually show, not a narrative simplification.
- **The report's own live TOC** is a native Word field (`TOC \h \o "1-3"`), not hand-typed page numbers — it recalculates automatically and can't drift out of sync with the document.

## Using the detection content

```bash
# Sigma rule — convert to your SIEM's query language with sigma-cli / pySigma
sigma convert -t splunk detection-rules/sigma_operation_constantine.yml

# YARA rule — scan a file or directory
yara detection-rules/nulltackkatz_payload.yar /path/to/scan
```

## Publishing this site yourself

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.** The included workflow (`.github/workflows/pages.yml`) deploys `index.html` and its assets automatically on every push to `main`.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

No build step, no dependencies — it's a static HTML/CSS/JS page.

## Disclosure

All hostnames, IP addresses, and infrastructure referenced in this case are lab-isolated (VMware, non-routable RFC1918 space) and were generated for a Purple Team adversary-emulation exercise. No production systems or real organizations were involved.

---

*Prepared by Adham Alhamidi · Purple Team / DFIR*
