/* ================= CONFIG =================
   Leads go through /api/lead → Google Sheets + TeleCRM (keys in .env.local, see .env.example). */
export const CONFIG = {
  CENTRAL_PHONE: "+917871111115", // TN and Puducherry number from the RJR site
  IMG: "/images/", // all images are served locally from public/images
};

export const img = (src: string) => CONFIG.IMG + src;

export type Lang = "en" | "ta";

export const HERO_IMAGES = [
  "banner/siddha-hospital-in-tamilnadu.webp",
  "banner/siddhaclinic.webp",
  "banner/siddhadoctors.webp",
  "banner/bestherbalhospitalindia.webp",
  "banner/ayurveda-thearpy.webp",
  "banner/siddha-hospital-tamilnadu.webp",
];

export const SLIDE_BG = [
  "radial-gradient(circle at 78% 22%,rgba(232,200,119,.34),transparent 46%),linear-gradient(120deg,#1A4331,#0F2B1D)",
  "radial-gradient(circle at 12% 82%,rgba(232,200,119,.34),transparent 46%),linear-gradient(128deg,#2E6B52,#12301F)",
  "radial-gradient(circle at 60% 90%,rgba(232,200,119,.34),transparent 46%),linear-gradient(136deg,#1A4331,#0B2418)",
  "radial-gradient(circle at 88% 70%,rgba(232,200,119,.34),transparent 46%),linear-gradient(144deg,#245A43,#12301F)",
  "radial-gradient(circle at 30% 20%,rgba(232,200,119,.34),transparent 46%),linear-gradient(152deg,#2E6B52,#0F2B1D)",
  "radial-gradient(circle at 70% 30%,rgba(232,200,119,.34),transparent 46%),linear-gradient(160deg,#1A4331,#12301F)",
];

/* Leaf pattern drawn over each hero slide */
export const LEAF_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 64 64' fill='none' stroke='%23E8C877' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M12 52C12 28 28 12 52 12c0 24-16 40-40 40z'/%3E%3Cpath d='M12 52L36 28'/%3E%3C/svg%3E\")";

/* Treatments carousel. img = RJR site icon (optional). Wording kept neutral: no cure or outcome claims. */
export type Treatment = { photo: string; img: string; en: [string, string]; ta: [string, string] };
export const TREAT: Treatment[] = [
  { photo: "/treatments/knee-pain.jpg", img: "treatmenticon/knee-pain.gif", en: ["01. Knee Pain & Joint Discomfort", "Experiencing stiffness, swelling, or discomfort in your knee? Our doctor may recommend suitable Ayurvedic therapies based on your examination."], ta: ["01. முழங்கால் மற்றும் மூட்டு வலி", "முழங்கால் வலி, வீக்கம் மற்றும் மூட்டு விறைப்புக்கான மருத்துவப் பரிசோதனை மற்றும் சிகிச்சை வழிகாட்டுதல்."] },
  { photo: "/treatments/arthritis.jpg", img: "treatmenticon/arthritis.gif", en: ["02. Arthritis & Joint Conditions", "Persistent joint pain, morning stiffness, and restricted movement due to arthritis can affect your everyday life. Know your suitable care options, which may include prescribed medicines and selected therapies."], ta: ["02. ஆர்த்ரைட்டிஸ்", "மூட்டு வலி, காலை நேர விறைப்பு மற்றும் அசைவுகளில் ஏற்படும் சிரமத்திற்கான மருத்துவப் பராமரிப்பு."] },
  { photo: "/treatments/back-pain.jpg", img: "treatmenticon/disc-issue.gif", en: ["03. Back Pain, Disc Problems & Sciatica", "Lower back pain, radiating leg pain, numbness, and restricted movement can have different underlying causes. Get suitable Ayurvedic care, designed for your condition."], ta: ["03. முதுகுவலி, டிஸ்க் மற்றும் சியாட்டிகா", "முதுகுவலி, கால்களுக்குப் பரவும் வலி மற்றும் மரத்துப்போதலுக்கான மருத்துவ மதிப்பீடு."] },
  { photo: "/treatments/neck-shoulder.jpg", img: "", en: ["04. Neck Pain & Cervical Conditions", "Neck stiffness, shoulder discomfort, and restricted movement can interfere with your daily routine. Get your condition evaluated and understand the suitable treatment options and posture guidance."], ta: ["04. கழுத்து வலி மற்றும் சர்வைக்கல் பாதிப்புகள்", "கழுத்து விறைப்பு, தோள்பட்டை வலி மற்றும் அசைவுகளில் ஏற்படும் சிரமத்திற்கான சிகிச்சை வழிகாட்டுதல்."] },
  { photo: "/treatments/psoriasis.jpg", img: "treatmenticon/psoriasis.gif", en: ["05. Psoriasis & Skin Conditions", "Persistent skin patches, scaling, itching, and inflammation deserve proper medical attention. Our doctors assess your skin condition and medical history before explaining suitable care options."], ta: ["05. சொரியாசிஸ் மற்றும் சருமப் பிரச்சினைகள்", "சரும அரிப்பு, திட்டுகள் மற்றும் தோல் உரிதல் போன்ற பிரச்சினைகளுக்கான மருத்துவப் பரிசோதனை."] },
  { photo: "/treatments/piles.jpg", img: "", en: ["06. Piles, Fissure & Fistula", "Pain, bleeding, or discomfort during bowel movements should not be ignored. Consult a qualified doctor for a proper examination and an understanding of the available treatment options."], ta: ["06. மூலம், பவுத்திரம் மற்றும் ஆசனவாய் வெடிப்பு", "வலி, இரத்தப்போக்கு மற்றும் மலம் கழிக்கும்போது ஏற்படும் அசௌகரியத்திற்கான மருத்துவ ஆலோசனை."] },
  { photo: "/treatments/sinus-migraine.jpg", img: "treatmenticon/sinuistis.gif", en: ["07. Sinusitis & Migraine", "Recurring headaches, facial pressure, nasal congestion, and sinus discomfort can affect your quality of life. Your doctor evaluates your symptoms and discusses suitable management options."], ta: ["07. சைனசைட்டிஸ் மற்றும் மைக்ரேன்", "தொடர்ச்சியான தலைவலி, மூக்கடைப்பு மற்றும் முக அழுத்தத்திற்கான மருத்துவ மதிப்பீடு."] },
  { photo: "/treatments/pcod.jpg", img: "treatmenticon/pcod.gif", en: ["08. PCOD & Women's Health", "Irregular menstrual cycles and other hormonal concerns require individual attention. Our doctors review your medical history and discuss appropriate medical and lifestyle guidance."], ta: ["08. PCOD மற்றும் பெண்கள் நலம்", "மாதவிடாய் சுழற்சி மற்றும் ஹார்மோன் தொடர்பான பிரச்சினைகளுக்கான தனிப்பட்ட மருத்துவ ஆலோசனை."] },
  { photo: "/treatments/digestive.jpg", img: "", en: ["09. Digestive & Gastrointestinal Concerns", "Frequent acidity, bloating, constipation, and digestive discomfort can have several underlying causes. Get evaluated by a doctor to understand your condition and suitable care options."], ta: ["09. செரிமானப் பிரச்சினைகள்", "அமிலத்தன்மை, வயிறு உப்புசம் மற்றும் மலச்சிக்கல் போன்ற பிரச்சினைகளுக்கான மருத்துவ வழிகாட்டுதல்."] },
  { photo: "/treatments/hair-scalp.jpg", img: "", en: ["10. Hair & Scalp Conditions", "Excessive hair fall, dandruff and persistent scalp concerns may need a closer evaluation. Your doctor assesses possible contributing factors before recommending appropriate care."], ta: ["10. முடி மற்றும் உச்சந்தலைப் பிரச்சினைகள்", "முடி உதிர்வு, பொடுகு மற்றும் உச்சந்தலைப் பிரச்சினைகளுக்கான மருத்துவப் பரிசோதனை."] },
  { photo: "/treatments/respiratory.jpg", img: "", en: ["11. Respiratory & Allergic Conditions", "Recurring allergies, breathing discomfort, and respiratory concerns deserve proper evaluation. Know your possible causes and suitable management options."], ta: ["11. சுவாசம் மற்றும் ஒவ்வாமைப் பிரச்சினைகள்", "அடிக்கடி ஏற்படும் ஒவ்வாமை மற்றும் சுவாசப் பிரச்சினைகளுக்கான மருத்துவ ஆலோசனை."] },
];

/* Doctors. TODO: replace with the full doctors list from RJR (name, qualification, photo, role). */
export type Doctor = { img: string; en: [string, string, string]; ta: [string, string, string]; ini: string };
export const DOCS: Doctor[] = [
  { img: "doctors/dr-naveen.webp", en: ["Dr. N. Naveen", "BSMS, M.Sc. (Varma)", ""], ta: ["டாக்டர் N. நவீன்", "BSMS, M.Sc. (Varma)", ""], ini: "NN" },
  { img: "doctors/dr-kavitha.webp", en: ["Dr. J. Kavitha", "BSMS", ""], ta: ["டாக்டர் J. கவிதா", "BSMS", ""], ini: "JK" },
  { img: "doctors/dr-thatchana-murthy.webp", en: ["Dr. R. Thatchana Murthy", "BNYS", ""], ta: ["டாக்டர் R. தட்சணாமூர்த்தி", "BNYS", ""], ini: "RT" },];

/* 37 Tamil Nadu branches. Addresses and phones as listed on rjrherbalhospitals.com. x = approximate pin position. */
export type Branch = { n: string; t: string; la: number; lo: number; x?: 1; a: string; p: string[] };
export const BR: Branch[] = [
  { n: "Ambur", t: "ஆம்பூர்", la: 12.7923, lo: 78.7257, a: "Door No:1, Ground Floor, Anna Nagar, Chennai-Bangalore Highway, near Bajaj Bike Showroom, Ambur 635802", p: ["+919514577711", "04174290066"] },
  { n: "Chennai - T. Nagar", t: "சென்னை - தி. நகர்", la: 13.0509, lo: 80.2325, a: "No. 150, Habibulla Road, Darmapuram, T. Nagar, Chennai 600017", p: ["+917871111115", "04440064006"] },
  { n: "Chennai - Urapakkam", t: "சென்னை - ஊரப்பாக்கம்", la: 12.8605, lo: 80.061, x: 1, a: "No. 11, GST Road, near Airtel Store, near Kilambakkam bus stand, Senthil Nagar, Urapakkam, Chennai 603210", p: ["+917092777118"] },
  { n: "Chennai - Arumbakkam", t: "சென்னை - அரும்பாக்கம்", la: 13.072, lo: 80.212, x: 1, a: "No. 376, Poonamallee High Road, opposite Anna Arch, Arumbakkam, Chennai 600106", p: ["+917092777118"] },
  { n: "Coimbatore", t: "கோயம்புத்தூர்", la: 11.0208, lo: 76.9697, a: "No. 624, BSR Complex, Ground Floor, 100 Feet Road, Gandhipuram (landmark: GP Signal), Coimbatore 641012", p: ["+917092077711", "+919677608444", "04224384965"] },
  { n: "Cuddalore", t: "கடலூர்", la: 11.7665, lo: 79.7426, a: "No. 15, Nellikuppam Main Road, S N Chavadi, near TVS Showroom, Cuddalore 607001", p: ["+919787377711", "04142222006"] },
  { n: "Dharmapuri", t: "தர்மபுரி", la: 12.1115, lo: 78.1314, a: "No. 3/183/H, Govt Arts College Bus Stop, Dharmapuri-Salem main road, Savulupatti, opposite govt college ladies hostel, Dharmapuri 636705", p: ["+919092977711", "04342262006"] },
  { n: "Dindigul", t: "திண்டுக்கல்", la: 10.3695, lo: 77.9512, a: "No. 165/5A, Megam Towers, Madurai Road, near Kottapatty Junction (Palani bypass, near HP Petrol Bunk), Dindigul 624002", p: ["+917448377711", "04512434006"] },
  { n: "Erode", t: "ஈரோடு", la: 11.3528, lo: 77.7204, a: "No. 40, Meenachi Sundaram Street, near State Bank, Tirunagar Colony, Karungalpalayam Road, V.O.C Park back gate, Erode 638003", p: ["+919087577711"] },
  { n: "Hosur", t: "ஓசூர்", la: 12.741, lo: 77.818, a: "No. 58, Bangalore Highway, opposite Traffic Police Station, near Agarwal Eye Hospital, Hosur 635109", p: ["+917871677711", "04344244006"] },
  { n: "Kanchipuram", t: "காஞ்சிபுரம்", la: 12.835, lo: 79.7, a: "No. 64 D, Salai Street (Vellore Highway), Gujarat Chathiram Bus Stop, Periya Kanchipuram 631502", p: ["+919087277711", "04427227266"] },
  { n: "Karaikudi", t: "காரைக்குடி", la: 10.0835, lo: 78.7684, a: "No. 31/2, Kalanivasal Road, near Apollo Pharmacy, Muthu Meenal Complex, Karaikudi 630002", p: ["+919176277711"] },
  { n: "Karur", t: "கரூர்", la: 10.956, lo: 78.0794, a: "No. 161/A, Aswitha Towers, Dindigul main road, opposite Bharat Petrol Bunk, Thanthonimalai Bus Stop, Karur 639005", p: ["+919514377711", "04324260006"] },
  { n: "Kovilpatti", t: "கோவில்பட்டி", la: 9.1799, lo: 77.8737, a: "No. 64 A, Esther Rani Mahal, near Apollo Pharmacy, G.H Road, Railway Station bus stop, Old Bus Stand, Kovilpatti 628501", p: ["+919087177711", "04632224266"] },
  { n: "Krishnagiri", t: "கிருஷ்ணகிரி", la: 12.5163, lo: 78.2157, a: "No. 5/318/35, Salem-Bangalore Highway, Salem bypass service road, near NSK Landmark, Apollo Tyres, Krishnagiri 635001", p: ["+917871111115", "+919514955555"] },
  { n: "Kumbakonam", t: "கும்பகோணம்", la: 10.9572, lo: 79.3933, a: "No. 285/10, Ground Floor, Krishna Towers, opposite Hero Bike Showroom, Chennai Bypass Road, Chettimandapam, Kumbakonam 612001", p: ["+917449277711", "04352412006"] },
  { n: "Madurai", t: "மதுரை", la: 9.9268, lo: 78.1422, a: "Plot No. 1, next to Sono Scans, Paal Pannai Signal, K K Nagar, Madurai 625020", p: ["+917092177711"] },
  { n: "Marthandam", t: "மார்த்தாண்டம்", la: 8.3018, lo: 77.2209, a: "No. 5-81/2, Pansy Plaza, Market Road, near New Bus Stand and Canara Bank, Marthandam 629165", p: ["+917448977711", "04651205004"] },
  { n: "Mayiladuthurai", t: "மயிலாடுதுறை", la: 11.0986, lo: 79.6465, a: "No. 123 B/1, Muthu Vakkil Salai, opposite St. Francis Xavier Church, Gandhiji Road, near Old Bus Stand, Mayiladuthurai 609001", p: ["+919092877711"] },
  { n: "Nagapattinam", t: "நாகப்பட்டினம்", la: 10.7772, lo: 79.8383, a: "No. 1, Mak Complex, Kaariyankudi Chetti Street, opposite CRC Bus Depot, Velipalayam, near New Bus Stand, Nagapattinam 611001", p: ["+919514177711", "04365247002"] },
  { n: "Nagercoil", t: "நாகர்கோவில்", la: 8.1785, lo: 77.424, a: "No. 22/30, Parvathavarthini Street, Old Employment Office Road, near Collector Office, Nagercoil 629001", p: ["+917092277711", "04652403606"] },
  { n: "Pollachi", t: "பொள்ளாச்சி", la: 10.667, lo: 77.0084, a: "No. 3, ASD Puram, Mahalingapuram, opposite Sarathy TVS Showroom, near UCO Bank, Pollachi 642001", p: ["+919087977711"] },
  { n: "Pudukkottai", t: "புதுக்கோட்டை", la: 10.3778, lo: 78.8052, a: "No. 52B, Seshaiya Road, Ezhil Nagar, opposite District Stadium, near New Bus Stand, Pudukkottai 622001", p: ["+919176177711", "04322226555"] },
  { n: "Ramanathapuram", t: "ராமநாதபுரம்", la: 9.3612, lo: 78.8463, a: "No. 1/2001-A, Arul Nagar, Sakkaraikottai, opposite Fish Market, Ramanathapuram 623504", p: ["+919092177711", "04567232006"] },
  { n: "Salem", t: "சேலம்", la: 11.6721, lo: 78.1409, a: "No. 186, Ground Floor, City Centre Mall, opposite Saradha Womens College, Yercaud Road (5 Road), Salem 636016", p: ["+919092777112"] },
  { n: "Sivakasi", t: "சிவகாசி", la: 9.4564, lo: 77.8058, a: "No. 2005/D, opposite Jeycees Nursery School, Srinivasa Mess stop, Virudhunagar main road, Sivakasi 626123", p: ["+917092477711", "04562290738"] },
  { n: "Tenkasi", t: "தென்காசி", la: 8.9759, lo: 77.299, a: "No. 317, Ganapathi Nagar, opposite TVS bike showroom, Madurai main road, Tenkasi 627811", p: ["+919087377711"] },
  { n: "Thanjavur", t: "தஞ்சாவூர்", la: 10.7486, lo: 79.1091, a: "No. 64, Jayendra Saraswati Nagar, Trichy Road, near New Bus Stand, opposite Bharat College, Thanjavur 613005", p: ["+919514277711"] },
  { n: "Theni", t: "தேனி", la: 9.9978, lo: 77.4629, a: "No. 12-2-1, T B N Road, near mini bus road, opposite Auto stand, Palani Chettipatti, Theni 625531", p: ["+919092377711"] },
  { n: "Thiruvallur", t: "திருவள்ளூர்", la: 13.1205, lo: 79.9098, a: "No. 969, TNHB Road, Kakkalur Bypass Road, Kakkalur, Tiruvallur 602001", p: ["+919176477711", "04427664411"] },
  { n: "Tirunelveli", t: "திருநெல்வேலி", la: 8.7294, lo: 77.7224, a: "No. 100/4, Ground Floor, downstream of Vannarapettai Flyover, Vannarapettai, Tirunelveli 627003", p: ["+917871377711", "04622324006"] },
  { n: "Tiruppur", t: "திருப்பூர்", la: 11.0975, lo: 77.3531, a: "No. 164/487-488, Dharapuram Main Road, Aranmanai Pudur, near Old Bus Stand, opposite Gem Super Market, Tiruppur 641604", p: ["+917092377711", "04214546006"] },
  { n: "Tiruvannamalai", t: "திருவண்ணாமலை", la: 12.2326, lo: 79.0634, a: "No. 73/26, Pay Kopuram Main Road (near Shakthi Theatre), opposite West Gopuram, Tiruvannamalai 606601", p: ["+919092677711", "04175290007"] },
  { n: "Trichy", t: "திருச்சி", la: 10.7941, lo: 78.6805, a: "No. 27, Railway Society Complex, near Central Bus Stand, opposite LKS Mahal, Trichy 620001", p: ["+917449177711", "04312406004"] },
  { n: "Vellore", t: "வேலூர்", la: 12.9332, lo: 79.1461, a: "Ward 1, Block 3, New Bypass, No. 61/1B2, 1st Floor, SK Tower, Bengaluru-Chennai Highway, Vellore 632004", p: ["+919514955555", "+917871111115"] },
  { n: "Villupuram", t: "விழுப்புரம்", la: 11.931, lo: 79.4835, a: "No. 344, Thamarai Street, Suthagar Nagar, near New Bus Stand, Villupuram 605602", p: ["+917871877711", "04146357682"] },
  { n: "Virudhachalam", t: "விருத்தாசலம்", la: 11.5426, lo: 79.3175, a: "No. 13/1, Ulundur Pettai main road, Pudukuppam, Virudhachalam 606001", p: ["+919514955555"] },
];

export const bname = (b: Branch, lang: Lang) => (lang === "ta" ? b.t : b.n);
export const fmtPhone = (p: string) => (p.indexOf("+91") === 0 ? "+91 " + p.slice(3, 8) + " " + p.slice(8) : p);

export const UI = {
  en: { sel: "Select your branch", pick: "Select a branch", empty: "Tap any pin on the map, or choose a branch from the list, to see its address and phone number.", addr: "Address", ph: "Phone", hrs: "Hours", hrsv: "Mon - Sun, 9:00 AM - 7:00 PM", call: "Call", dir: "Get directions", book: "Book at this branch", near: "Find the branch nearest to me", nomap: "The map could not load. Use the branch list instead." },
  ta: { sel: "உங்கள் கிளையைத் தேர்ந்தெடுக்கவும்", pick: "கிளையைத் தேர்ந்தெடுக்கவும்", empty: "வரைபடத்தில் உள்ள ஏதேனும் ஒரு குறியைத் தொடவும், அல்லது பட்டியலிலிருந்து கிளையைத் தேர்ந்தெடுக்கவும்; முகவரியும் தொலைபேசி எண்ணும் தெரியும்.", addr: "முகவரி", ph: "தொலைபேசி", hrs: "நேரம்", hrsv: "திங்கள் - ஞாயிறு, 9:00 AM - 7:00 PM", call: "அழைக்க", dir: "வழி காட்டு", book: "இந்தக் கிளையில் முன்பதிவு", near: "எனக்கு அருகிலுள்ள கிளையைக் காட்டு", nomap: "வரைபடம் ஏற்றப்படவில்லை. பட்டியலைப் பயன்படுத்தவும்." },
};

/* Simplified outline of Tamil Nadu used as the illustrated map (no internet tiles needed) */
export const TN: [number, number][] = [[13.58,80.33],[13.58,79.98],[13.42,79.72],[13.30,79.45],[13.10,79.10],[12.98,78.80],[12.88,78.40],[12.90,78.05],[12.86,77.75],[12.50,77.78],[12.15,77.76],[11.95,77.70],[11.86,77.40],[11.82,77.15],[11.80,76.90],[11.76,76.65],[11.62,76.45],[11.40,76.36],[11.15,76.50],[11.05,76.72],[10.85,76.82],[10.60,76.80],[10.40,76.84],[10.20,76.95],[10.10,77.12],[9.85,77.22],[9.62,77.25],[9.42,77.38],[9.20,77.24],[8.95,77.17],[8.65,77.20],[8.35,77.13],[8.18,77.22],[8.07,77.40],[8.06,77.58],[8.25,77.62],[8.50,77.95],[8.62,78.12],[8.85,78.22],[9.05,78.40],[9.18,78.65],[9.24,78.95],[9.22,79.20],[9.26,79.36],[9.32,79.24],[9.30,79.08],[9.47,78.88],[9.74,78.98],[10.00,79.10],[10.27,79.26],[10.34,79.52],[10.28,79.86],[10.77,79.88],[11.15,79.88],[11.75,79.82],[11.95,79.88],[12.62,80.22],[13.08,80.31],[13.42,80.34]];

export const TN_BOUNDS: [[number, number], [number, number]] = [
  [Math.min(...TN.map((x) => x[0])), Math.min(...TN.map((x) => x[1]))],
  [Math.max(...TN.map((x) => x[0])), Math.max(...TN.map((x) => x[1]))],
];

export const MAP_LABELS: [string, number, number][] = [
  ["Kerala", 10.6, 75.9],
  ["Karnataka", 12.6, 76.7],
  ["Andhra Pradesh", 14.0, 79.0],
  ["Bay of Bengal", 12.3, 81.0],
  ["Indian Ocean", 7.1, 77.8],
];

export const CONCERNS: { v: string; en: string; ta: string }[] = [
  { v: "", en: "Select", ta: "தேர்ந்தெடுக்கவும்" },
  { v: "knee-joint", en: "Knee pain and joint pain", ta: "முழங்கால் மற்றும் மூட்டு வலி" },
  { v: "back-disc", en: "Back pain, disc, sciatica", ta: "முதுகு வலி, டிஸ்க், சியாட்டிகா" },
  { v: "neck-shoulder", en: "Neck and shoulder pain", ta: "கழுத்து மற்றும் தோள்பட்டை வலி" },
  { v: "skin", en: "Psoriasis and skin problems", ta: "சொரியாசிஸ் மற்றும் தோல் பிரச்சனைகள்" },
  { v: "piles", en: "Piles, fissure, fistula", ta: "மூலம், பிஷர், பிஸ்துலா" },
  { v: "sinus-migraine", en: "Sinusitis and migraine", ta: "சைனஸ் மற்றும் ஒற்றைத் தலைவலி" },
  { v: "pcod", en: "PCOD and women's health", ta: "PCOD மற்றும் பெண்கள் நலம்" },
  { v: "arthritis", en: "Arthritis", ta: "மூட்டுவாதம்" },
  { v: "digestive", en: "Digestive concerns", ta: "செரிமானப் பிரச்சனைகள்" },
  { v: "hair", en: "Hair and scalp", ta: "முடி மற்றும் உச்சந்தலை" },
  { v: "respiratory", en: "Respiratory and allergy", ta: "சுவாசம் மற்றும் ஒவ்வாமை" },
  { v: "other", en: "Something else", ta: "வேறு ஏதேனும்" },
];
