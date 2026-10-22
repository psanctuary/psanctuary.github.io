/* Psanctuary's arrival config, read by arrival.js (kit v1.4). Shared by every Psanctuary page: the
   entry portal (/, /donate/, /pledge/, /map/, the 404) and, by absolute URL, the AstroLog.

   psanctuary is the church's decentralized, playful side on GitHub; its sibling, psanctuarychurch, is
   the church's professional face. Every fact here comes from psanctuary.org's own public pages (home,
   About, Contact, Community Tools, Membership, Donate). Anything not decided yet is marked as a
   placeholder or "coming soon" rather than guessed, and no link is ever made up. People are named by
   first name and last initial. Strings shown in the guide and the modals may hold simple HTML. */
(function () {
  var ROOT = "https://psanctuary.github.io";
  var LOG = ROOT + "/changelog-astro-public";
  var SITE = "https://www.psanctuary.org";
  var SIBLING = "https://psanctuarychurch.github.io";
  // The church's member network on Mighty Networks. One link (Christopher's decision, 2026-10-22):
  // the root and /plans/ show the same page to a visitor who isn't signed in, and both open the
  // dashboard for a member who is, so the root is the one door, for joining and for signing in.
  var MIGHTY = "https://psanctuary-member-community.mn.co/";
  // Every way to reach the church, on GitHub (psanctuary/.github).
  var CONTACTS = "https://github.com/psanctuary/.github/blob/main/CONTACTS.md";
  // The church's own words about its standing and about giving, quoted on /donate/ (receipts and
  // taxes): the legal notice on psanctuary.org, and the donation page on its ministries site.
  var LEGAL = SITE + "/legal-notice";
  var MINISTRIES_DONATE = "https://ministries.psanctuary.org/donate";
  // Keeps fonts with contextual alternates from turning "(c)" into a copyright sign.
  var C508 = '<span style="font-variant-ligatures: none; font-feature-settings: \'calt\' 0, \'liga\' 0, \'dlig\' 0">508(c)(1)(a)</span>';
  // Spore violets and bruise blues. They color the guide's cap (one gill per step) and the initials
  // avatars of anyone without a GitHub picture.
  var GILLS = ["#a88bc9", "#74bce0", "#8c70b0", "#5fa8d3", "#c2a9e0", "#9fd3ee", "#6a4c8c", "#3e8db8"];

  // An initials avatar in the family's shape: a tiny spore print (gills, dust, a stem ring) with the
  // initials at its heart. System serif only: an <img> SVG can't load the page's web fonts.
  function sporeAvatar(ini, c1, c2, name) {
    // Someone named by one word gets one letter, not the first two of the name.
    var one = String(name || "").trim();
    if (one && !/\s/.test(one)) ini = one.charAt(0).toUpperCase();
    var g = "";
    for (var i = 0; i < 40; i++) {
      var a = (i / 40) * Math.PI * 2 + 0.05;
      var r1 = i % 4 === 0 ? 25 : i % 2 ? 36 : 31;
      g +=
        '<line x1="' + (50 + r1 * Math.cos(a)).toFixed(1) + '" y1="' + (50 + r1 * Math.sin(a)).toFixed(1) +
        '" x2="' + (50 + 47 * Math.cos(a)).toFixed(1) + '" y2="' + (50 + 47 * Math.sin(a)).toFixed(1) + '"/>';
    }
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
      '<defs><radialGradient id="g" cx="50%" cy="50%" r="50%"><stop offset="0.3" stop-color="#1c1522"/>' +
      '<stop offset="0.75" stop-color="' + c2 + '"/><stop offset="1" stop-color="' + c1 + '"/></radialGradient></defs>' +
      '<circle cx="50" cy="50" r="50" fill="url(#g)"/>' +
      '<g stroke="#f6efe4" stroke-opacity=".34" stroke-width="1.2" stroke-linecap="round">' + g + "</g>" +
      '<circle cx="50" cy="50" r="22" fill="#16111a" fill-opacity=".72" stroke="' + c1 + '" stroke-width="2"/>' +
      '<text x="50" y="50" dy=".36em" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif" font-size="' +
      (ini.length > 1 ? 21 : 27) + '" fill="#f6efe4">' + ini + "</text></svg>"
    );
  }

  window.ARRIVAL = {
    org: {
      short: "Psanctuary",
      name: "The playful side",
      motto: "Rooted in sincerity, cultivated by the mushroom.",
      about:
        "In psanctuary.org's own words, Psanctuary is “an inter-tradition church built on growing together with a sincere sacred mushroom practice rooted in spiritual autonomy.” This GitHub organization is its decentralized, playful side: experiments in tools the community can own, a little more color, and an open record of how it's all built. The church's professional face on GitHub is its sibling, psanctuarychurch.",
      // The family mark: a spore print with its stem ring, in this org's accent.
      mark: { src: ROOT + "/favicon.svg" },
      home: {
        label: "psanctuary.org",
        href: SITE,
        text: "The church's real home: Sunday service, membership, courses, ceremonies and events all live there. Everything on GitHub is the quieter, technical side, kept out in the open.",
      },
      welcomeNote: null,
      welcomePlaceholder:
        "A few words of welcome belong here, perhaps from Psanctuary's co-founders, Eric O, Courtney M and Athena. The space is left empty on purpose until someone at the church would like to write them.",
    },

    // Psanctuary's portal and AstroLog share one origin, so one key carries every choice between them.
    storage: { key: "psanctuary-arrival" },

    modes: [
      { id: "spore", name: "Spore Print", note: "Violet-black, like the print a cap leaves on paper overnight, lit in bruise blue.", swatch: ["#16111a", "#74bce0"], dark: true },
      { id: "paper", name: "Print Paper", note: "The white card a print is taken on, inked in violet and blue.", swatch: ["#f3f1f4", "#1a6a90"], calm: true },
      { id: "dusk", name: "Blue Hour", note: "Deep twilight blue, the color a cap turns where it's touched.", swatch: ["#0e1524", "#8fd0f2"], dark: true },
      { id: "blacklight", name: "Blacklight", note: "The playful one: ultraviolet black, glowing lime and spore pink, like a poster under a black light.", swatch: ["#0b0612", "#c9f76f"], dark: true },
      {
        id: "day",
        name: "Follow the day",
        note: "Print paper by day, blue hour at dusk, spore print by night.",
        shows: ["paper", "dusk", "spore"],
        ink: "repeating-conic-gradient(from 0deg at 50% 210%, transparent 0deg, rgba(22, 17, 26, 0.3) 0.8deg, transparent 1.6deg 3.4deg), linear-gradient(90deg, #f3f1f4 0 33.3%, #8fd0f2 0 66.6%, #a88bc9 0)",
        follows: function (d) {
          var h = d.getHours();
          return h >= 7 && h < 17 ? "paper" : h >= 17 && h < 21 ? "dusk" : "spore";
        },
      },
    ],
    defaultMode: "spore",

    // Reading mode: one tap for Print Paper, the spores at rest, more contrast, no mycelium threads
    // and a comfortable line length; text size steps sit beside it (kit 1.2).
    reading: { light: "paper" },

    // "What's new since your last visit": the AstroLog's latest.json lists its newest entries,
    // write-ups and ledger items (same origin for the portal and the AstroLog).
    news: { sources: [LOG + "/latest.json"] },

    // The spore field behind every page: spores drift up, and the pointer grows mycelium threads to
    // the ones nearby. Its cursor effects switch off on their own, and rest whenever motion is Still.
    motions: [
      { id: "still", name: "Still", icon: "pause", note: "The spores settle where they are, and nothing moves." },
      { id: "drift", name: "Drift", icon: "wind", note: "Spores drift upward. Your pointer grows mycelium threads to the ones nearby and leaves a little spore dust." },
      { id: "flush", name: "Flush", icon: "sparkle", note: "A flush: more spores, longer threads that reach further, and a brighter puff behind your pointer." },
    ],
    defaultMotion: "drift",
    stillMotion: "still",

    wedges: GILLS,

    // Gravatar only for an address at the church's own domain; otherwise GitHub, otherwise initials.
    avatar: { shape: "circle", roleDomains: ["psanctuary.org"], svg: sporeAvatar },

    // ── kit 1.2: the navbar, shared by the portal and the AstroLog ─────────────────────────────
    // Lower priority folds into "More" first when the bar runs short; below 1100px it all folds
    // into the Menu.
    nav: {
      label: "Psanctuary",
      fold: 1100,
      items: [
        { id: "portal", label: "Portal", icon: "house-simple", href: ROOT + "/", hideOn: ["portal"], priority: 1, note: "Psanctuary's front door on GitHub" },
        { id: "porch", label: "Porch", icon: "door-open", href: LOG + "/", exact: true, priority: 1, note: "The AstroLog's front door" },
        { id: "changelog", label: "Changelog", icon: "clock-counter-clockwise", href: LOG + "/changelog", priority: 3, note: "What changed, newest first" },
        { id: "library", label: "Library", icon: "books", href: LOG + "/library", priority: 2, note: "Longer write-ups on how it works" },
        { id: "ledger", label: "Ledger", icon: "scroll", href: LOG + "/ledger", priority: 2, note: "Every public change, in plain words" },
        { id: "map", label: "Map", icon: "map-trifold", href: LOG + "/map", hrefs: { portal: ROOT + "/map/" }, priority: 2, note: "Every place, with a picture of each" },
        {
          id: "involved",
          label: "Get involved",
          icon: "hand-heart",
          priority: 3,
          items: [
            { id: "community", label: "Community", icon: "users-three", href: MIGHTY, open: "community", note: "The member network, on Mighty Networks" },
            { id: "contact", label: "Reach out", icon: "envelope-simple", href: SITE + "/contact", open: "contact", note: "Every way to reach the church" },
            { id: "donate", label: "Donate", icon: "heart", href: ROOT + "/donate/", note: "Ways to give, and thanks by name" },
            { id: "pledge", label: "Pledge", icon: "handshake", href: ROOT + "/pledge/", note: "Sign a pledge of support: free, nothing sent" },
          ],
        },
        {
          id: "about",
          label: "About",
          icon: "info",
          priority: 1,
          items: [
            { id: "roadmap", label: "Roadmap", icon: "path", href: LOG + "/roadmap", note: "Where these pages are headed" },
            { id: "sustainability", label: "Sustainability", icon: "plant", href: LOG + "/sustainability", note: "What it takes to keep them running" },
            { id: "home", label: "psanctuary.org", icon: "globe-simple", href: SITE, note: "The church's main site" },
            { id: "sibling", label: "Psanctuary Church", icon: "tree-structure", href: SIBLING + "/", note: "The sibling org: the church's professional face" },
            { id: "github", label: "GitHub", icon: "github-logo", href: "https://github.com/psanctuary", note: "The organization and its code" },
          ],
        },
      ],
    },
    footer: {
      label: "Psanctuary, all the ways around",
      groups: [
        { label: "Explore", icon: "compass", items: ["portal", "porch", "changelog", "library", "ledger", "map"] },
        { label: "Get involved", icon: "hand-heart", items: ["community", "contact", "donate", "pledge", { id: "guide", label: "Welcome guide", icon: "signpost", href: "#welcome", open: "guide" }] },
        { label: "About this build", icon: "wrench", items: ["roadmap", "sustainability", "github", { id: "contacts", label: "CONTACTS.md", icon: "address-book", href: CONTACTS }, { id: "source", label: "AstroLog source", icon: "code", href: "https://github.com/psanctuary/changelog-astro-public" }] },
        { label: "Psanctuary", icon: "plant", items: ["home", "sibling", { id: "youtube", label: "YouTube", icon: "youtube-logo", href: "https://www.youtube.com/@psanctuarychurch" }] },
      ],
      note: "Code here is MIT licensed and the words are CC BY-SA 4.0. The Psanctuary name and marks belong to the church.",
    },

    // ── kit 1.2: one modal for every way to reach the church ───────────────────────────────────
    contact: {
      title: "Reach out",
      intro: "Every way to reach the people behind Psanctuary. Pick whichever suits you.",
      paths: [
        {
          kind: "form",
          label: "The contact form on psanctuary.org",
          href: SITE + "/contact",
          action: "Open the form",
          note: "In the church's own words: “To reach our team, please fill out the form below or e-mail info@psanctuary.org.”",
        },
        {
          kind: "email",
          label: "info@psanctuary.org",
          href: "mailto:info@psanctuary.org",
          note: "The church's public address, for questions about membership, Sunday service, ceremonies, courses, giving, or these pages.",
        },
        {
          kind: "github",
          label: "Every way in, on GitHub",
          href: CONTACTS,
          action: "Open CONTACTS.md",
          note: "The church's addresses, the member network and the channels psanctuary.org lists, in one page.",
        },
      ],
    },

    // ── where the community talks: the church's member network, one link (Christopher's decision,
    //    2026-10-22), with the honest story of the Discord in the fine print, and the sneak peek at a
    //    network of the community's own. ──────────────────────────────────────────────────────────
    community: {
      name: "the member community",
      icon: "users-three",
      label: "See every way in",
      title: "Where we gather",
      eyebrow: "Community",
      text: "Psanctuary's community gathers in one place: the church's member network on Mighty Networks. Further out, a network the community owns, and a DAO to go with it.",
      intro: "Psanctuary's community gathers in one place, the church's member network. One link does both: visitors see how to join, and members land on their dashboard.",
      platforms: [
        {
          id: "mighty",
          kind: "mighty",
          name: "Psanctuary Member Community",
          text: "The church's member network: events, member-led clubs, courses and messages, on the web and in the Mighty app. It comes with membership.",
          // One door: the kit always draws a public slot too; org.css hides an empty one on a live card.
          join: { href: MIGHTY, label: "Join or sign in on Mighty Networks", note: "New here? You'll see how to join. Members land on their dashboard." },
        },
      ],
      bespoke: {
        title: "A network of our own",
        tag: "Sneak peek",
        icon: "graph",
        text: "Further out, Psanctuary would like a small social network of its own, owned by the people in it rather than by one company.",
        points: [
          "Profiles and posts on open protocols like Lens and Farcaster, so what members share stays theirs.",
          "Paired with a Psanctuary DAO, where members can propose ideas and decide together.",
          "Privacy first: you choose what's public and what stays among members.",
          'And tokens of gratitude: soulbound thank-yous that stay in the wallet they\'re given to (a <a href="' + ROOT + '/pledge/">sneak peek on the pledge page</a>).',
        ],
        note: "No dates, and nothing to sign up for yet. This is a direction, not a promise. When there's something to try, it'll appear here first.",
      },
      fine: "Why there's no Discord: Psanctuary once had one, and Eric O closed it on purpose, so the community gathers in one place, on Mighty Networks. A Discord may only ever come back as a help-desk back end most people would never see, unless a DAO or something new grows here. Time will tell.",
      more: ['Sunday service is open to everyone, online. <a href="' + SITE + '/community-tools">psanctuary.org/community-tools</a> explains the member network.'],
    },

    // ── kit 1.2: the donate page (/donate/) ────────────────────────────────────────────────────
    // Give with crypto (kit v1.3, arrival/give/give.js): one Connect button in the donate page's crypto
    // slot. The Reown project (a public client ID, shared by the fleet's portals for now) must list
    // https://psanctuary.github.io in its allowlist at dashboard.reown.com; until it does, the page
    // calmly says wallet connect isn't switched on for this site yet. No treasury address yet, so every
    // coin reads "Treasury address coming soon" and connecting is a labelled preview. Never put a
    // placeholder or example address here: the page would show it. note: the org's own words, if any.
    give: {
      reownProjectId: "00b6a1cd528ff580f1fd845ed08b0187",
      chains: ["mainnet"],
      addresses: { eth: null, btc: null, sol: null },
      note: "",
    },

    donate: {
      give: [
        {
          label: "Give through psanctuary.org",
          icon: "heart",
          href: SITE + "/donate",
          action: "Give on psanctuary.org",
          note: "The church's own giving page. In psanctuary.org's words: “Your donation supports the right to spiritual connection through entheogens and supports a growing community preserving and sharing practices with sacred mushrooms.”",
        },
      ],
      disclaimer: {
        title: "Please note",
        text: "Gifts are made on psanctuary.org, through the church's own checkout. This GitHub page doesn't take payments and never sees payment details. Questions about giving go to <a href=\"mailto:info@psanctuary.org\">info@psanctuary.org</a>.",
      },
      ledger: {
        src: ROOT + "/donate/contributors.json",
        title: "Contribution ledger",
        intro: "People and groups who have given time, skills or gifts to Psanctuary's GitHub home, and said yes to being thanked by name here.",
      },
      crypto: {
        text: "Giving from a crypto wallet is planned for this page: one button for browser wallets, phone wallets and email sign-in. It isn't open yet.",
      },
      // kit 1.4: "Receipts and taxes", in the church's own words only, quoted and linked, never
      // restated as more (checked 2026-10-22, also in the private crawl archive): the legal notice's
      // own summary ("Psanctuary Church is a lawfully incorporated 508(c)(1)(a) Faith Based
      // Organization operating."; its body says "As a 508 organization") and the donation page on
      // ministries.psanctuary.org, with its own CPA line. The kit adds "This isn't tax advice."
      tax: {
        status: 'The church\'s own <a href="' + LEGAL + '">legal notice</a> describes Psanctuary Church as “a lawfully incorporated ' + C508 + ' Faith Based Organization”.',
        deductible: 'The church\'s <a href="' + MINISTRIES_DONATE + '">donation page</a> says: “All donations to Psanctuary (as a ' + C508 + ') are tax deductible.” It adds: “Please consult and confirm with your CPA regarding all tax related benefits for you personally.”',
        receipts: 'Ask the church for one: email <a href="mailto:info@psanctuary.org" data-arr-direct>info@psanctuary.org</a> and say what you gave and when.',
      },
    },

    // ── kit 1.4: the dock (.universal-footer .footer-inner, the kit's default) shows a fade and a
    //    chevron on the side with more, so a phone visitor can tell it scrolls. ──────────────────
    dock: { scroll: true },

    // ── kit 1.4: a pledge of support, on its own page (/pledge/). A visitor signs it with a wallet:
    //    a message, not a transaction, so it's free, sends nothing and records nothing, and there are
    //    no counts. Same wallet connection as /donate/ (give.reownProjectId). The words follow the
    //    church's own (psanctuary.org: spiritual autonomy, peer support, communal care), in this
    //    side's voice: a small, decentralized way to stand with the community. ───────────────────
    pledge: {
      href: ROOT + "/pledge/",
      text: "I support Psanctuary: a sincere community rooted in spiritual autonomy, peer support and communal care, and the tools its people are growing together, out in the open.",
      intro: "If Psanctuary matters to you, you can say so by signing a short pledge with a crypto wallet: a small, decentralized way to stand with the community. It's free: no gas and no money, and for now nothing is recorded. A pledge isn't membership; <a href=\"" + SITE + "/membership\">joining the church</a> is its own step.",
      note: 'A pledge isn\'t a gift and asks nothing more of you. To give as well, see <a href="' + ROOT + '/donate/">the ways to give</a>.',
    },

    record: {
      intro: "Psanctuary's AstroLog has two halves.",
      share:
        "Sharing one change? Every entry and every write-up has its own preview card, a prism spore print of its own with the title and summary. Paste its link into Telegram, iMessage or Discord and it arrives with that card. The <strong>Copy a link</strong> button under each one does the copying.",
      changelog: {
        name: "The changelog",
        text: "Every notable change to Psanctuary's GitHub home, newest first. Each entry opens with a one-line summary, with the full story folded underneath, and credits whoever did the work.",
        href: LOG + "/changelog",
        label: "Read the changelog",
      },
      library: {
        name: "The library",
        text: "Longer write-ups on how things are built and why. The changelog says what changed; the library explains how it works.",
        href: LOG + "/library",
        label: "Open the library",
      },
      ledger: {
        name: "The ledger",
        text: "Every public change to Psanctuary's code on GitHub, in plain words: grouped by day and by kind, credited by name, and linked to the change itself. For anyone who'd rather not open GitHub. It refreshes every day.",
        href: LOG + "/ledger",
        label: "Open the ledger",
      },
    },

    sites: {
      portal: {
        name: "Psanctuary on GitHub",
        what: "This is Psanctuary's playful corner of GitHub: where experiments in decentralized, community-owned tools take shape, and the way into the AstroLog, where every change is written down.",
      },
      astrolog: {
        name: "the Psanctuary AstroLog",
        what: "The AstroLog is Psanctuary's plain-language record of what changed on GitHub, who made each change, and how the pieces fit together.",
      },
    },

    guide: {
      light: {
        text: "Every Psanctuary page takes its colors from a spore print: violet-black, the paper it's taken on, the blue a cap turns where it's touched, and, for the playful, a blacklight. Pick one, and it follows you from page to page.",
      },
      motion: {
        text: "Behind each page, spores drift upward. Move your pointer and mycelium threads reach out to the spores nearby, the way a mushroom's network grows underground. Choose how much moves, how large the text is, and whether you'd like more contrast for reading.",
      },
      people: {
        text: "Every entry credits whoever did the work, by first name and last initial. Eric O and Alana are here early, so you can see how the record will look as more of the community takes part.",
        fine: "Pictures come from public GitHub profiles. Anyone without one linked gets a small spore print with their initials.",
      },
    },
    guideFinale: "You've lit every gill of the print. Welcome to Psanctuary.",

    words: {
      enter: "Enter Psanctuary",
      cursorNote: "Mycelium threads that reach from your pointer to nearby spores, and a little spore dust as you move. Switch them off if you'd rather not.",
      readingNote: "One tap for the calmest page: Print Paper, the spores at rest, more contrast, shorter lines, and no mycelium threads. Tap again to go back to how you had it.",
      pause: "Let the spores settle",
      play: "Let the spores drift",
      searchTip: "Anywhere on Psanctuary's pages, any time: every change, write-up, person and page, including the AstroLog from the entry portal.",
    },

    search: {
      sources: [{ url: LOG + "/search.json" }],
      items: [
        { t: "Psanctuary entry portal", k: "page", i: "house", h: ROOT + "/", pin: true, x: "home github io root portal" },
        { t: "psanctuary.org", k: "the church", i: "globe-simple", h: SITE, pin: true, x: "website main home church" },
        { t: "The ledger: every public change", k: "AstroLog", i: "scroll", h: LOG + "/ledger", pin: true, x: "commits github history code record plain words" },
        { t: "Map: every place, with pictures", k: "page", i: "map-trifold", h: LOG + "/map", pin: true, x: "sitemap where everything links overview thumbnails" },
        { t: "Donate", k: "page", i: "heart", h: ROOT + "/donate/", x: "give gift support money contribution ledger thanks crypto receipt tax deductible 508" },
        { t: "A pledge of support", k: "page", i: "handshake", h: ROOT + "/pledge/", x: "pledge sign wallet support signature verify gratitude tokens soulbound" },
        { t: "How a decentralized church can work", k: "portal", i: "graph", h: ROOT + "/#decentralized", x: "decentralized dao mycelium network gratitude tokens soulbound lens farcaster" },
        { t: "Join or sign in: the member community", k: "Mighty Networks", i: "users-three", h: MIGHTY, pin: true, x: "community members mighty networks join sign in dashboard app clubs events" },
        { t: "Every way to reach the church (CONTACTS.md)", k: "GitHub", i: "address-book", h: CONTACTS, x: "contacts email info address channels youtube spotify instagram facebook reach out" },
        { t: "Legal notice", k: "psanctuary.org", i: "scroll", h: LEGAL, x: "legal 508 faith based organization rfra church status" },
        { t: "Roadmap", k: "page", i: "path", h: LOG + "/roadmap", x: "plans next future ideas direction" },
        { t: "Sustainability", k: "page", i: "plant", h: LOG + "/sustainability", x: "maintenance keep running tokens costs upkeep" },
        { t: "What to expect", k: "psanctuary.org", i: "compass", h: SITE + "/welcome", x: "welcome new members ceremony" },
        { t: "Sunday service", k: "psanctuary.org", i: "sun-horizon", h: SITE + "/sunday", x: "zoom meditation tao journaling weekly online" },
        { t: "Membership", k: "psanctuary.org", i: "hand-heart", h: SITE + "/membership", x: "join member plans" },
        { t: "Courses", k: "psanctuary.org", i: "graduation-cap", h: SITE + "/courses", x: "space holding foundations education" },
        { t: "Events calendar", k: "psanctuary.org", i: "calendar-dots", h: SITE + "/events", x: "events meetups" },
        { t: "Church blog", k: "psanctuary.org", i: "notebook", h: SITE + "/blog", x: "blog posts founders" },
        { t: "About Psanctuary", k: "psanctuary.org", i: "info", h: SITE + "/about", x: "mission vision about louisville kentucky" },
        { t: "My Mushroom Map", k: "psanctuary.org", i: "map-trifold", h: SITE + "/mushroom-map", x: "mini course safety legality integration" },
        { t: "Psanctuary on YouTube", k: "link", i: "youtube-logo", h: "https://www.youtube.com/@psanctuarychurch", x: "video" },
        { t: "Psanctuary on GitHub", k: "link", i: "github-logo", h: "https://github.com/psanctuary", x: "organization code repositories" },
        { t: "Sibling org: Psanctuary Church", k: "link", i: "tree-structure", h: SIBLING + "/", x: "sibling church second organization professional" },
      ],
    },
  };
})();
