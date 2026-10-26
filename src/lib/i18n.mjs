export const locales = Object.freeze(["id", "en"]);
export const isLocale = (value) => locales.includes(value);
export const defaultLocale = "id";
export const messages = Object.freeze({
  id: {
    nav: { home: "Beranda", play: "Main demo", world: "Dunia", archive: "Arsip", account: "Akun", language: "Bahasa" },
    home: {
      eyebrow: "MOONWITNESS XV / ROCKSOUL EXPERIMENT 001",
      title: "THE LOST SIGNAL",
      intro: "Tidak semua yang hilang harus ditemukan. Tidak semua yang ditemukan boleh diungkapkan.",
      body: "Masuki dunia di mana sinyal, ingatan, dan kebenaran saling bertabrakan. Pulihkan pemancar, temui crew yang absurd, dan putuskan kisah mana yang layak diteruskan.",
      primary: "MASUK KE STASIUN",
      secondary: "JELAJAHI CERITA",
      state: "PREVIEW INTERAKTIF · BELUM GAME ONLINE",
      chapter: "01 / THE ARRIVAL",
      system: "TRANSMISSION STATUS",
      active: "SINYAL TERPUTUS",
      featured: "KISAH YANG MENUNGGU",
      first: "THE SHADOW", firstBody: "Seseorang pernah meminta untuk dilupakan.",
      second: "THE BATTERIES", secondBody: "Perbaikan tercepat tidak selalu menjadi yang terbaik.",
      third: "BABY-DOLL", thirdBody: "Sebuah pilihan untuk lupa menyimpan konsekuensinya.",
      philosophy: "APA YANG LAYAK DITERUSKAN?",
      philosophyBody: "Mengumpulkan bukan berarti memahami. Cerita ini adalah adaptasi fiksi, bukan pernyataan wahyu maupun fakta sejarah.",
      learn: "LIHAT ARSIP",
    },
    play: {
      kicker: "EPISODE DEMO / SIGNAL STATION ZERO", title: "TICK / STATIC / HELLO?",
      intro: "Pulihkan satu pemancar. Dengarkan THE BATTERY. Simpan pilihanmu secara lokal.",
      demo: "DEMO BROWSER SAJA", data: "Progres tersimpan di browser ini, bukan di server atau Supabase. Tidak ada item/uang online yang dibuat.",
      energy: "SIGNAL CHARGE", collect: "ISI DAYA", repair: "PULIHKAN PEMANCAR", repaired: "PEMANCAR AKTIF",
      inspect: "PERIKSA FRAGMEN", inspectText: "Sebuah pesan tanpa nama pengirim ditemukan di antara derau frekuensi.",
      unknown: "TANDAI: BELUM DIKETAHUI", verify: "SELIDIKI LEBIH LANJUT",
      battery: "THE BATTERY", batteryLine: "LESGO! Kita cas dulu. Tapi... jangan hapus catatan orang tanpa izin, ya!",
      outcomeUnknown: "Fragmen disimpan sebagai misteri. Tidak ada identitas yang dipaksakan.",
      outcomeVerify: "Permintaan verifikasi tercatat. Sinyal tetap belum pasti.",
      decision: "KEPUTUSANMU", none: "Belum ada pilihan", reset: "ULANGI DEMO", saved: "STATUS TERSIMPAN LOKAL",
      chargeHint: "Butuh 3 Signal Charge untuk memulihkan pemancar.",
      offline: "Demo lokal, belum terhubung ke dunia multiplayer.", goWorld: "PETA DUNIA",
    },
    world: { kicker:"WORLD / REGIONS",title:"KARTOGRAFI SINYAL",intro:"Wilayah berikut merupakan rancangan fiksi, bukan lokasi atau fasilitas sungguhan.", labels:["SIGNAL STATION ZERO","MOON ARCHIVE","ELECTRIC FOREST","HAVEN / BASECAMP"],bodies:["Titik kedatangan dan pusat perbaikan pemancar.","Berkas, kesaksian, dan pertanyaan yang masih terbuka.","Jalur bercabang dan petunjuk dari para Runaways.","Pemulihan, bantuan, dan kesempatan kedua."],locked:"KANDIDAT REGION",open:"DEMO TERSEDIA" },
    archive: { kicker:"WITNESS ARCHIVE",title:"CATATAN YANG BELUM SELESAI",intro:"Baca jejak kisah dengan batas yang jelas antara sumber historis dan adaptasi baru.",statuses:["SUMBER TERARSIP","ADAPTASI DIAJUKAN","SUMBER BELUM LENGKAP"],items:["THE SHADOW / BEFORE LIGHT","THE LISTENER / LOST SIGNAL","THE BATTERIES / FOUR BOOKS"],notes:["Motif seseorang yang sengaja meminta dilupakan berasal dari MOONWITNESS II.","Protagonis pemain baru; belum disahkan sebagai canon asli.","Naskah empat buku masih membutuhkan pemulihan arsip."],source:"SUMBER CERITA",visit:"PELAJARI DUNIA" },
    account:{ title:"AKUN / THE LISTENER", kicker:"ACCOUNT TERMINAL / PHASE M2", intro:"Masuk menggunakan email untuk menyiapkan identitas dan satu slot save game online. Demo pemancar tetap terpisah.", unavailable:"Supabase belum dikonfigurasi. Demo browser tetap bisa dimainkan. Setelah proyek Supabase dibuat, atur dua variabel publik di Vercel.", email:"EMAIL", submit:"KIRIM TAUTAN MASUK", sending:"MENGIRIM...", sent:"Jika alamat diizinkan, periksa email Anda untuk tautan masuk.", connected:"ANDA SUDAH MASUK", bootstrapping:"MEMBUKA SAVE GAME...", profile:"PROFIL GAME", save:"SAVE GAME ONLINE", era:"ERA", revision:"REVISI", state:"STATUS", pending:"BELUM DIBUAT", signout:"KELUAR", error:"Tidak dapat terhubung ke layanan akun. Periksa konfigurasi dan migrasi Supabase.", signIn:"Masuk lewat email", note:"Slot save online baru berisi progres awal, belum mengimpor demo lokal dan belum memiliki reward yang bisa diperdagangkan.", unavailableShort:"SUPABASE BELUM TERHUBUNG", signoutFailed:"Gagal keluar dari sesi." },
    footer:"DISEBABKAN OLEH IMAJINASI · DIDASARKAN PADA ARSIP · TANPA KLAIM OTORITAS ILAHI",
    a11y: { skip:"Lewati navigasi",earth:"Bulan dan jalur sinyal bergaya ilustrasi",status:"Status stasiun" }
  },
  en: {
    nav: { home: "Home", play: "Play demo", world: "World", archive: "Archive", account: "Account", language: "Language" },
    home: {
      eyebrow: "MOONWITNESS XV / ROCKSOUL EXPERIMENT 001",
      title: "THE LOST SIGNAL",
      intro: "Not everything lost must be found. Not everything found should be exposed.",
      body: "Enter a world where signals, memory, and truth collide. Restore a transmitter, meet an absurd crew, and choose what deserves to continue.",
      primary: "ENTER THE STATION", secondary: "EXPLORE THE STORY", state: "INTERACTIVE PREVIEW · NOT AN ONLINE GAME",
      chapter: "01 / THE ARRIVAL", system: "TRANSMISSION STATUS", active: "SIGNAL LOST",
      featured: "STORIES IN WAITING",
      first: "THE SHADOW", firstBody: "Someone once asked to be forgotten.",
      second: "THE BATTERIES", secondBody: "The quickest fix is not always the right one.",
      third: "BABY-DOLL", thirdBody: "A choice to forget still has consequences.",
      philosophy: "WHAT DESERVES TO CONTINUE?", philosophyBody: "Collecting is not the same as understanding. This is fictional adaptation, not a claim of revelation or historical fact.",
      learn: "OPEN ARCHIVE",
    },
    play: {
      kicker: "DEMO EPISODE / SIGNAL STATION ZERO", title: "TICK / STATIC / HELLO?",
      intro: "Repair a single transmitter. Listen to THE BATTERY. Save one decision locally.",
      demo:"BROWSER DEMO ONLY",data:"Progress is saved in this browser, not a server or Supabase. No online items or currency are created.",
      energy:"SIGNAL CHARGE",collect:"CHARGE",repair:"RESTORE TRANSMITTER",repaired:"TRANSMITTER ONLINE",
      inspect:"INSPECT FRAGMENT",inspectText:"A message with no sender was found inside the radio static.",
      unknown:"MARK AS UNKNOWN",verify:"VERIFY FIRST",battery:"THE BATTERY",
      batteryLine:"LESGO! Let's charge it. But... don't erase someone's story without asking!",
      outcomeUnknown:"Fragment kept unresolved. No identity was imposed.",
      outcomeVerify:"Verification request recorded. The signal remains uncertain.",
      decision:"YOUR CHOICE",none:"No choice yet",reset:"RESET DEMO",saved:"LOCALLY SAVED",
      chargeHint:"You need 3 Signal Charge to restore the transmitter.",
      offline:"Local demo only. Not connected to multiplayer.",goWorld:"WORLD MAP",
    },
    world:{kicker:"WORLD / REGIONS",title:"CARTOGRAPHY OF SIGNALS",intro:"These are proposed fictional regions, not real places or facilities.",labels:["SIGNAL STATION ZERO","MOON ARCHIVE","ELECTRIC FOREST","HAVEN / BASECAMP"],bodies:["Your arrival point and transmitter repair station.","Records, witnesses, and unresolved questions.","Branching routes and clues from the Runaways.","Restoration, care, and second chances."],locked:"REGION CANDIDATE",open:"DEMO AVAILABLE"},
    archive:{kicker:"WITNESS ARCHIVE",title:"UNFINISHED RECORDS",intro:"Explore story traces while keeping original source and new adaptation distinct.",statuses:["RECORDED SOURCE","PROPOSED ADAPTATION","SOURCE INCOMPLETE"],items:["THE SHADOW / BEFORE LIGHT","THE LISTENER / LOST SIGNAL","THE BATTERIES / FOUR BOOKS"],notes:["The intentionally-forgotten motif comes from MOONWITNESS II.","A new player protagonist, not approved original canon.","The four-book manuscripts still require archival recovery."],source:"STORY SOURCES",visit:"EXPLORE WORLD"},
    account:{ title:"ACCOUNT / THE LISTENER", kicker:"ACCOUNT TERMINAL / PHASE M2", intro:"Sign in with email to set up your identity and one online save slot. The beacon browser demo stays separate.", unavailable:"Supabase is not configured yet. The browser demo remains playable. Once your Supabase project is ready, set the two public environment variables in Vercel.", email:"EMAIL", submit:"SEND SIGN-IN LINK", sending:"SENDING...", sent:"If the address is allowed, check your email for a sign-in link.", connected:"YOU ARE SIGNED IN", bootstrapping:"OPENING GAME SAVE...", profile:"GAME PROFILE", save:"ONLINE GAME SAVE", era:"ERA", revision:"REVISION", state:"STATUS", pending:"NOT CREATED YET", signout:"SIGN OUT", error:"Could not connect to the account service. Check Supabase configuration and migration.", signIn:"Email sign in", note:"This new online save slot contains only initial progress. It does not import your local demo or award tradeable items.", unavailableShort:"SUPABASE NOT CONNECTED", signoutFailed:"Could not sign out." },
    footer:"BUILT FROM IMAGINATION · GROUNDED IN ARCHIVES · CLAIMS NO DIVINE AUTHORITY",
    a11y:{skip:"Skip navigation",earth:"Stylized moon and signal routes illustration",status:"Station status"}
  }
});
export function getMessages(locale) {
  if (!isLocale(locale)) throw new RangeError("Unsupported locale: " + String(locale));
  return messages[locale];
}
export function localizedHref(locale, path = "") {
  if (!isLocale(locale)) throw new RangeError("Unsupported locale");
  return "/" + locale + (path ? "/" + path.replace(/^\/+/,"") : "");
}
