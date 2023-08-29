const fs = require('fs');
const path = require('path');

const concertLocations = [
  {
    city: 'Eskişehir',
    location: 'IF Performance Hall',
    address: 'Hoşnudiye, Cassaba Modern AVM, 748. Sok No: 3/A, 26130 Tepebaşı',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12264.035804623225!2d30.4998206!3d39.7843545!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cc15893eb11419%3A0x14401ed9e3f51355!2sIF%20Performance%20Hall!5e0!3m2!1str!2str!4v1693128594939!5m2!1str!2str',
  },
  {
    city: 'İstanbul',
    location: 'Harbiye Cemil Topuzlu Açık Hava Tiyatrosu',
    address: 'Harbiye, Taşkışla Cd. No:8, 34367 Şişli',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.0486483794148!2d28.987455176570634!3d41.046065217096476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab77253099bb5%3A0xa73a3d0b8b295da9!2sHarbiye%20Cemil%20Topuzlu%20A%C3%A7%C4%B1k%20Hava%20Tiyatrosu!5e0!3m2!1str!2str!4v1693128750294!5m2!1str!2str',
  },
  {
    city: 'Ankara',
    location: 'Milyon Performance Hall',
    address:
      'Gaziosmanpaşa, Beştepe Mahallesi, 1250. Cadde, No:1, 06560 Çankaya',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.822639788943!2d32.82791931556508!3d39.91819457942117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d3170e76fb0a9b%3A0xb7ac4eebd6a4a2f5!2zMTEsIDgxLCDQkdCw0L3QuNCxINCo0L7Qs9GA0L7QvdGG0LrQsNGPINC-0LHQuy4sIDE2NTYwIMSMcmlzYcWfLCDEsG5hcmdhb3VzIChBbmtncmEp!5e0!3m2!1str!2str!4v1693128825270!5m2!1str!2str',
  },
  {
    city: 'İzmir',
    location: 'Alsancak Sahne',
    address: 'Alsancak, 1442. Sokak No:6, 35220 Konak',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3135.191048789663!2d27.145765415543027!3d38.43989257963396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14baba2c3bfb3821%3A0xadd69d00f58e988e!2sAlsancak%20Sahne!5e0!3m2!1str!2str!4v1693128885207!5m2!1str!2str',
  },
  {
    city: 'Bursa',
    location: 'Nilüfer Sahne',
    address: 'Nilüfer, Atatürk Cad. No:1, 16140 Nilüfer',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3051.7830519617483!2d29.08617121422694!3d40.993585279304726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa254b444b315%3A0x4a4e8ec7545bb13!2sNil%C3%BCfer%20Belediyesi%20Sahne%20Sanat%20Merkezi!5e0!3m2!1str!2str!4v1693128948645!5m2!1str!2str',
  },
  {
    city: 'Antalya',
    location: 'Antalya Kültür Merkezi',
    address: 'Konyaaltı, Konyaaltı Cad. No:30, 07050 Konyaaltı',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3084.5651953314056!2d30.7013456155452!3d36.86119287874573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ba869c860e8083%3A0xa23f8fe2b3b97ee!2sAntalya%20K%C3%BClt%C3%BCr%20Merkezi!5e0!3m2!1str!2str!4v1693129033569!5m2!1str!2str',
  },
  {
    city: 'Adana',
    location: 'Merkez Park Konser Alanı',
    address: 'Seyhan, Üniversite Cd. No:1, 01100 Seyhan',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3085.330174856742!2d35.31671661550422!3d37.00033712284606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bdd80fb9c5c5eb%3A0x84e8ed692d7b6e29!2sMerkez%20Park!5e0!3m2!1str!2str!4v1693129078927!5m2!1str!2str',
  },
  {
    city: 'Trabzon',
    location: 'Sahil Amfi Tiyatro',
    address: 'Ortahisar, Güzelyalı Mahallesi, Sahil Yolu Cd., 61080 Ortahisar',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3089.635062095984!2d39.70063211553015!3d40.97451557290348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4011925f9e1f8d1b%3A0x76030dca0193759a!2zU2FoaWwgQW1maSBUaXlh!5e0!3m2!1str!2str!4v1693129138716!5m2!1str!2str',
  },
  {
    city: 'Konya',
    location: 'Kültürpark Açık Hava Tiyatrosu',
    address: 'Selçuklu, Alaaddin Bulvarı, 42030 Selçuklu',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3045.617063208618!2d32.49187461542863!3d37.87771857415985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4013ea3c9dd657f5%3A0x727b1815d3a7ab3e!2zS8O8bHRyw61yIExpbGzDvG1lcmsgQ8WjaWUgSGF2YSBUaXlhdG9yc29mdXN1!5e0!3m2!1str!2str!4v1693129187693!5m2!1str!2str',
  },
  {
    city: 'Diyarbakır',
    location: 'Tiyatro Marşı Sahnesi',
    address: 'Bağlar, Ziya Gökalp Mahallesi, Tugay Yolu Cad., 21120 Bağlar',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3083.8504095617567!2d40.1970973155462!3d37.89507597960763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x401f42b3145e5b6d%3A0xd0ccf160a57f2b2c!2sTiyatro%20Mar%C5%9F%C4%B1%20Sahnesi!5e0!3m2!1str!2str!4v1693129243089!5m2!1str!2str',
  },
  {
    city: 'Kayseri',
    location: 'Atatürk Kültür Merkezi',
    address: 'Kocasinan, Atatürk Bulvarı, 38010 Kocasinan',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3069.2979700916787!2d35.4962972155596!3d38.73135238922878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4018e39e1d55c175%3A0x8f313a885e6c1395!2sAtat%C3%BCrk%20K%C3%BClt%C3%BCr%20Merkezi!5e0!3m2!1str!2str!4v1693129302719!5m2!1str!2str',
  },
  {
    city: 'Gaziantep',
    location: 'Şehitkamil Kültür ve Kongre Merkezi',
    address:
      'Şehitkamil, Doğanbey Mahallesi, Ali İhsan Sabis Bulvarı, 27100 Şehitkamil',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3065.869464107862!2d37.397741415562945!3d37.08481159433179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x401d19945e56f715%3A0xd6f4df7c1e6eb30b!2s%C5%9Eehitkamil%20K%C3%BClt%C3%BCr%20ve%20Kongre%20Merkezi!5e0!3m2!1str!2str!4v1693129345114!5m2!1str!2str',
  },
  {
    city: 'Mersin',
    location: 'Mersin Kongre ve Sergi Sarayı',
    address: 'Yenişehir, Atatürk Cad. No:135, 33140 Yenişehir',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.0825741376493!2d34.64167441554765!3d36.80260617431434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4013711d7c3493a3%3A0x2b3e82548702d56e!2sMersin%20Kongre%20ve%20Sergi%20Saray%C4%B1!5e0!3m2!1str!2str!4v1693129387267!5m2!1str!2str',
  },
  {
    city: 'Samsun',
    location: 'Samsun Yeni Sahne',
    address: 'Atakum, 19 Mayıs Mahallesi, 55200 Atakum',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.9249119508713!2d36.32324391555175!3d41.25938058372206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40274c0006ad4c11%3A0x97b65f4295f5ec21!2sSamsun%20Yeni%20Sahne!5e0!3m2!1str!2str!4v1693129428913!5m2!1str!2str',
  },
  {
    city: 'Balıkesir',
    location: 'Balıkesir Kültür Merkezi',
    address: 'Altıeylül, Çarşı Mahallesi, Belediye Cd. No:23, 10100 Altıeylül',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3074.559365437667!2d27.93657211554652!3d39.64861612285609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x402e515dd5b13b4f%3A0x9e3156bf59c7f21a!2sBal%C4%B1kesir%20K%C3%BClt%C3%BCr%20Merkezi!5e0!3m2!1str!2str!4v1693129466906!5m2!1str!2str',
  },
  {
    city: 'Adapazarı',
    location: 'SAÜ Kültür ve Kongre Merkezi',
    address: 'Serdivan, Sakarya Üniversitesi Kampüsü, 54100 Serdivan',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3052.259175002075!2d30.36130631553059!3d40.77914448441208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b34f76d1727c0f%3A0x9b74114ac3944e29!2sSA%C3%9C%20K%C3%BClt%C3%BCr%20ve%20Kongre%20Merkezi!5e0!3m2!1str!2str!4v1693129508048!5m2!1str!2str',
  },
  {
    city: 'Malatya',
    location: 'Malatya Kültür Merkezi',
    address: 'Yeşilyurt, İnönü Cd. No:138, 44340 Yeşilyurt',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3070.280376131958!2d38.28969891554824!3d38.31722967528954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4044dbf1749f8f2f%3A0x76fc6fbb3fc0d3c9!2sMalatya%20K%C3%BClt%C3%BCr%20Merkezi!5e0!3m2!1str!2str!4v1693129549726!5m2!1str!2str',
  },
  {
    city: 'Kahramanmaraş',
    location: 'Necip Fazıl Kısakürek Kültür Merkezi',
    address: 'Onikişubat, Bahçelievler Mahallesi, 46020 Onikişubat',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3086.500440843928!2d36.94312151554579!3d37.57573517788555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40586d126a8ea1f7%3A0x9c95f5f1ad4f6b3a!2sNecip%20Faz%C4%B1l%20K%C4%B1sak%C3%BCrek%20K%C3%BClt%C3%BCr%20Merkezi!5e0!3m2!1str!2str!4v1693129591769!5m2!1str!2str',
  },
  {
    city: 'Elazığ',
    location: 'Bülent Ecevit Kültür Merkezi',
    address: 'Merkez, Yeşil Yurt Mahallesi, İzzetpaşa Cd., 23100 Merkez',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3070.287336086073!2d39.22327911554825!3d38.66719187690122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40693803e5c40c3f%3A0xa406fc56b6b5b8cc!2sB%C3%BClent%20Ecevit%20K%C3%BClt%C3%BCr%20Merkezi!5e0!3m2!1str!2str!4v1693129632156!5m2!1str!2str',
  },
  {
    city: 'Van',
    location: 'Van Gölü Açık Hava Tiyatrosu',
    address: 'İpekyolu, Tuşba Belediyesi, 65000 İpekyolu',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3084.663799035867!2d43.366077315545034!3d38.4906313771987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4046bb1097275c4f%3A0xf4a0fb47eb8ed8df!2sVan%20G%C3%B6l%C3%BC%20A%C3%A7%C4%B1k%20Hava%20Tiyatrosu!5e0!3m2!1str!2str!4v1693129672594!5m2!1str!2str',
  },
  {
    city: 'Denizli',
    location: 'Pamukkale Üniversitesi Kınıklı Kampüsü Amfi Tiyatro',
    address: 'Pamukkale, Kınıklı Mahallesi, Kampüs Cd., 20100 Pamukkale',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3055.116232867047!2d29.688362915564065!3d37.805600779753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cfa5efccde418f%3A0x9a6d9e9d1848d792!2sPamukkale%20%C3%9Cniversitesi%20K%C4%B1n%C4%B1kl%C4%B1%20Kamp%C3%BCs%C3%BC%20Amfi%20Tiyatro!5e0!3m2!1str!2str!4v1693129712496!5m2!1str!2str',
  },
  {
    city: 'Sivas',
    location: 'Kültür Merkezi Amfi Tiyatro',
    address: 'Merkez, Hacılar Mahallesi, Kongre Cd. No:30, 58100 Merkez',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3082.2428438019314!2d37.00591351554691!3d39.74660478366065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409edaad7d0f3bbd%3A0x78c11e555e3736e5!2sK%C3%BClt%C3%BCr%20Merkezi%20Amfi%20Tiyatro!5e0!3m2!1str!2str!4v1693129753255!5m2!1str!2str',
  },
  {
    city: 'Erzurum',
    location: 'Atatürk Üniversitesi Dadaş Stadyumu',
    address: 'Yakutiye, 25240 Yakutiye',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.348001869156!2d41.619129315543086!3d39.90880647628521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40426a62ab8b4b8f%3A0x53059731559a8e4b!2sAtat%C3%BCrk%20%C3%9Cniversitesi%20Dada%C5%9F%20Stadyumu!5e0!3m2!1str!2str!4v1693129792821!5m2!1str!2str',
  },
  {
    city: 'Ordu',
    location: 'Atatürk Parkı Açık Hava Tiyatrosu',
    address: 'Altınordu, Yeni Mahallesi, 52200 Altınordu',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3077.123664462637!2d37.908789815544045!3d40.98663397491997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x404e0f94d3338c3b%3A0xb49bce165d9b480e!2sAtat%C3%BCrk%20Park%C4%B1%20A%C3%A7%C4%B1k%20Hava%20Tiyatrosu!5e0!3m2!1str!2str!4v1693129832589!5m2!1str!2str',
  },
  {
    city: 'Batman',
    location: 'Batman Üniversitesi Yerleşkesi Amfi Tiyatro',
    address:
      'Merkez, Gültepe Mahallesi, İsmail Hakkı Erendor Cad., 72060 Merkez',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3074.9531019842157!2d41.14155911554579!3d37.881095676937586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x400c41e40c2b90b7%3A0x3f4ab145a7b06e8c!2sBatman%20%C3%9Cniversitesi%20Yerle%C5%9Fkesi%20Amfi%20Tiyatro!5e0!3m2!1str!2str!4v1693129872683!5m2!1str!2str',
  },
  {
    city: 'Aksaray',
    location: 'Merkez Kültür Merkezi',
    address: 'Merkez, Cumhuriyet Mahallesi, Kızılay Cd. No:3, 68200 Merkez',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.1338297472964!2d34.02110031554315!3d38.37143887532497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406c61ad89277f11%3A0x58674f37c3fb4eb9!2sMerkez%20K%C3%BClt%C3%BCr%20Merkezi!5e0!3m2!1str!2str!4v1693129912421!5m2!1str!2str',
  },
  {
    city: 'Afyonkarahisar',
    location: 'Afyon Kocatepe Üniversitesi Kampüsü Amfi Tiyatro',
    address: 'Merkez, Dinar Yolu Üzeri, 03200 Merkez',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3055.561443593812!2d30.558940715563487!3d38.737878879600065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40f35ad9e3a00d3f%3A0xc9a4d43d5fb977f5!2sAfyon%20Kocatepe%20%C3%9Cniversitesi%20Kamp%C3%BCs%C3%BC%20Amfi%20Tiyatro!5e0!3m2!1str!2str!4v1693129951877!5m2!1str!2str',
  },
  {
    city: 'Karaman',
    location: 'Şehir Stadyumu',
    address: 'Merkez, 70100 Merkez',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3077.5394119757334!2d33.428682915544466!3d37.56365747778004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b2f0adfc4be6c1%3A0x4575c77cf625f924!2s%C5%9Eehir%20Stadyumu!5e0!3m2!1str!2str!4v1693130011830!5m2!1str!2str',
  },
  {
    city: 'Isparta',
    location: 'Isparta Kongre ve Sergi Sarayı',
    address:
      'Merkez, Bahçelievler Mahallesi, Atatürk Bulvarı No:91, 32040 Merkez',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3069.176579499471!2d30.541828615559743!3d37.77079137909062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14be8e020b4b8285%3A0x7a5a8ad770b949a2!2sIsparta%20Kongre%20ve%20Sergi%20Saray%C4%B1!5e0!3m2!1str!2str!4v1693130051665!5m2!1str!2str',
  },
];

const artistNames = [
  'Ajlan Büyükburç',
  'Feridun Düzağaç',
  'Gökhan Tepe',
  'Işın Karaca',
  'Cem Yılmazer',
  'Ziynet Sali',
  'Mustafa Sandal',
  'Nil Karaibrahimgil',
  'Oğuzhan Koç',
  'Şebnem Ferah',
  'Kargo',
  'Athena',
  'Yüksek Sadakat',
  'Gülşen',
  'Haluk Levent',
  'Mabel Matiz',
  'Murat Dalkılıç',
  'Pamela',
  'Seksendört',
  'Sıla',
  'Son Feci Bisiklet',
  'Yalın',
  'Duman',
  'Gripin',
  'Şebnem Ferah',
  'Hayko Cepkin',
  'Teoman',
  'Athena',
  'Mor ve Ötesi',
  'Manga',
  'Duman',
  'Sertab Erener',
  'Mabel Matiz',
  'Gripin',
  'Sıla',
  'Teoman',
  'Duman',
  'Ajda Pekkan',
  'Işın Karaca',
  'Yüksek Sadakat',
  'Kenan Doğulu',
  'Seksendört',
  'Müslüm Gürses',
  'Tarkan',
  'Sezen Aksu',
];
const generateRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};
const generateConcertData = () => {
  const name = artistNames[Math.floor(Math.random() * artistNames.length)];

  const startDate = generateRandomDate(
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
    new Date(new Date().setMonth(new Date().getMonth() + 1))
  );

  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + Math.floor(Math.random() * 3) + 1);

  const concertLocation =
    concertLocations[Math.floor(Math.random() * concertLocations.length)];
  const { city, location, address, maps } = concertLocation;
  const category = 'concerts';
  const ticketPrices = [
    { category: 'Standard', price: Math.floor(Math.random() * 151) + 50 },
    { category: 'VIP', price: Math.floor(Math.random() * 351) + 150 },
  ];
  const description = `Get ready for an evening of music and live performance! We're excited to invite you to an unforgettable concert night where talented artists will create the magical world of music at ${location}'s unique atmosphere. Secure your spot and be a part of this extraordinary musical journey!`;
  const free = Math.random() < 0.15;
  const eventData = {
    name,
    description,
    startDate,
    endDate,
    city,
    address,
    maps,
    location,
    category,
    free,
    ticketPrices,
  };
  return eventData;
};

const concertData = [];
for (let i = 0; i < 150; i++) {
  const eventData = generateConcertData();
  concertData.push(eventData);
}

const outputPath = path.join(__dirname, 'concertData.json');

fs.writeFile(
  outputPath,
  JSON.stringify(concertData, null, 2),
  'utf8',
  (err) => {
    if (err) {
      console.error('Dosya kaydedilirken bir hata oluştu:', err);
    } else {
      console.log('Veriler başarıyla dosyaya kaydedildi.');
    }
  }
);
