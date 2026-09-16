# DESIGN.md — Hafizh Sulthan Bachtiyar Portfolio

Identitas: portfolio bilingual insinyur lapangan yang juga membangun software. Jujur, rapi, fungsional.

## Dials

Dial: ENERGY 2 / RHYTHM 2 / MOTION 1.

## Palette

- Core: latar terang `#f9fafb` / gelap `#0b0d13`, kartu putih / `#13171f`.
- Aksen tunggal: primary cyan `#00709c` (light) / `#00bcff` (dark), dipakai di momen kunci: CTA, status, badge aktif.
- Token kode light digelapkan agar lolos AA (emerald/sky/violet/amber-700).

## Typography

- Geist Variable untuk teks, Geist Mono untuk label teknis dan kartu kode. Alasan: tampilan insinyur, terbaca, konsisten dengan stack React.
- Mono hanya untuk label teknis 11-13px, bukan heading besar.
- Label `uppercase tracking-wider` hanya untuk eyebrow/kategori kecil (pendidikan, fakta, footer), bukan heading. Alasan: membedakan metadata dari isi.

## Motif

- Latar dot-grid halus + parallax drift mengikuti mouse. Alasan: tekstur "kertas kerja insinyur" yang tenang, bukan dekorasi tren.
- Kartu kode `developer.ts` sebagai jendela identitas ganda lapangan/software.
- Glow hanya satu: di belakang kartu kode hero sebagai focal point. About dan contact tidak pakai glow.

## Ikon

- Ikon brand asli (Simple Icons) untuk logo teknologi di marquee dan chip; Lucide hanya untuk aksi UI generik (mail, unduh, menu). Alasan: logo brand adalah identitas teknologi yang diwakili, bukan dekorasi.
- Tanpa ikon generik `Sparkles`: fakta pendidikan pakai `GraduationCap`, badge kontak dekoratif dihapus.

## Panah

- `ArrowRight` = aksi dalam halaman (lihat karya, buka detail, hubungi). `ArrowUpRight` = link eksternal tab baru (demo, GitHub). Alasan: arah panah memberi tahu ke mana pengguna pergi.

## Badge

- Satu badge fungsional: status "Open to work" di hero dengan titik hijau live. Badge dekoratif kontak dihapus. Alasan: badge hanya untuk status nyata.

## Elevasi (bayang) dan blur

- `shadow-xl`: hanya permukaan di atas halaman, kartu kode hero (fokal) dan dialog modal (overlay).
- `shadow-md`: media/feature penutup section (potret about, kartu kontak).
- `shadow-sm`: kartu istirahat (proyek, skill, experience); naik ke `lg` saat hover sebagai umpan balik.
- Blur hanya di 2 permukaan mengambang: navbar saat scroll dan backdrop modal. Menu mobile, chip, dan kartu kode solid.

## Hierarki kartu

- Kartu skill seragam 3 kolom (Technical Support, Programming Languages, Tools & Systems). Alasan: ketiganya setara sebagai inventaris kemampuan.
- Kartu proyek pertama di filter aktif bertint primary. Alasan: penanda "terbaru/unggulan" di tiap kategori.
- Kartu experience seragam karena timeline. Alasan: keseragaman di sini berarti kronologi, bukan hierarki.

## Motion

- MOTION 1: entrance ringan sekali tampil + hover lift pada kartu.
- Loop yang dipertahankan: ping hijau (status live "open to work"), caret kode (identitas terminal), marquee logo (inventaris teknologi tanpa interaksi).
- Float chip hero dihapus; shine border skill hanya saat hover.
- Semua loop mati di `prefers-reduced-motion`.
