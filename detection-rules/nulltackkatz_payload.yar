rule NulltackKatz_Python_CredDumper {
  meta:
    author = "Adham Alhamidi"
    description = "Detects NulltackKatz Python credential dumping tool"
    hash_sha256 = "0FCF079A631B2E358E3B46B89A81E572879F26A79128F03FC1325F0D9028EBF0"
    reference = "Operation Constantine DFIR Report"
    date = "2026-07-05"
  strings:
    $s1 = "sekurlsa" nocase
    $s2 = "SeDebugPrivilege" nocase
    $s3 = "lsass" nocase
    $s4 = "import ctypes" nocase
    $s5 = "smtp.gmail.com" nocase
    $s6 = "WriteAllBytes" nocase
  condition:
    filesize < 500KB and 3 of ($s*)
}
