const fs = require('fs');
const path = require('path');

const concertLocations = [
  {
    city: 'İstanbul',
    location: 'Atatürk Olimpiyat Stadyumu',
    address: 'İkitelli, 34490 Başakşehir/İstanbul',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12058.331336431295!2d28.8166338!3d41.0607067!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x855b3e4acab60da4!2sAtat%C3%BCrk%20Olimpiyat%20Stadyumu!5e0!3m2!1str!2str!4v1693140032013!5m2!1str!2str',
  },
  {
    city: 'İzmir',
    location: 'İzmir Arena Stadyumu',
    address: 'Balçova, 35330 İzmir',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12025.049657455003!2d27.1000703!3d38.3709856!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb74be9d3c50a5%3A0x29b18468052c3f9e!2zSXTDvG1yIEFyZW5hIFN0YWR5dW0!5e0!3m2!1str!2str!4v1693140084987!5m2!1str!2str',
  },
  {
    city: 'Ankara',
    location: 'Ankara Stadyumu',
    address: 'Kızılay, 06570 Çankaya/Ankara',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11972.300125149397!2d32.8541111!3d39.9207703!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ba89abec1f108f%3A0x570b4434ab68c29a!2sAnkara%20Stadyumu!5e0!3m2!1str!2str!4v1693140126921!5m2!1str!2str',
  },
  {
    city: 'Bursa',
    location: 'Bursa Büyükşehir Stadyumu',
    address: 'Nilüfer, 16010 Bursa',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11986.97946490378!2d29.0581655!3d40.2207375!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caba4e066ba333%3A0xbba75a7b8945cd53!2zQnVyc2EgQsOxbsSxaGlyaCBTdGFkeXVt!5e0!3m2!1str!2str!4v1693140174501!5m2!1str!2str',
  },
  {
    city: 'Antalya',
    location: 'Antalya Stadyumu',
    address: 'Muratpaşa, 07070 Antalya',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12015.343365852517!2d30.6997026!3d36.8620357!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ba829a001ce065%3A0x67096e7e978a7c38!2sAntalya%20Stadyumu!5e0!3m2!1str!2str!4v1693140221158!5m2!1str!2str',
  },
  {
    city: 'Adana',
    location: 'Adana Stadyumu',
    address: 'Seyhan, 01170 Adana',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11970.641595433174!2d35.313878!3d37.0012157!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d69e3ff4a021dd%3A0xe500d7dd498c40fc!2sAdana%20Stadyumu!5e0!3m2!1str!2str!4v1693140266971!5m2!1str!2str',
  },
  {
    city: 'Gaziantep',
    location: 'Gaziantep Stadyumu',
    address: 'Şahinbey, 27070 Gaziantep',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11970.755860243544!2d37.4175861!3d37.0468337!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bfab8a49b8b3eb%3A0x4eaf1681b61ef0ee!2sGaziantep%20Stadyumu!5e0!3m2!1str!2str!4v1693140312940!5m2!1str!2str',
  },
  {
    city: 'Konya',
    location: 'Konya Stadyumu',
    address: 'Selçuklu, 42030 Konya',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11976.646005680875!2d32.4668587!3d37.9117656!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bb9ad6f07077d1%3A0x454b050ed595b9c6!2sKonya%20Stadyumu!5e0!3m2!1str!2str!4v1693140353059!5m2!1str!2str',
  },
  {
    city: 'Sivas',
    location: 'Sivas Stadyumu',
    address: 'Merkez, 58100 Sivas',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12007.235961775115!2d37.0052304!3d39.7471816!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4029177e5c1fba3b%3A0xfefa8e5716ea8d32!2sSivas%20Stadyumu!5e0!3m2!1str!2str!4v1693140389212!5m2!1str!2str',
  },
  {
    city: 'Trabzon',
    location: 'Trabzon Stadyumu',
    address: 'Ortahisar, 61000 Trabzon',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12004.74244124626!2d39.9847856!3d41.006829!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40763c101e0d30b9%3A0x6f797c6eb3f408b8!2sTrabzon%20Stadyumu!5e0!3m2!1str!2str!4v1693140430854!5m2!1str!2str',
  },
  {
    city: 'Eskişehir',
    location: 'Eskişehir Stadyumu',
    address: 'Tepebaşı, 26100 Eskişehir',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12009.346856938894!2d30.5439481!3d39.7844934!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cc1ab15331b821%3A0x3a6a58087463a3ea!2sEski%C5%9Fehir%20Stadyumu!5e0!3m2!1str!2str!4v1693140473187!5m2!1str!2str',
  },
  {
    city: 'Denizli',
    location: 'Denizli Stadyumu',
    address: 'Pamukkale, 20100 Denizli',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12041.188597674457!2d29.0314062!3d37.770993!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b87da2b4a7036d%3A0x6d06e2e5d54eb58f!2sDenizli%20Stadyumu!5e0!3m2!1str!2str!4v1693140522586!5m2!1str!2str',
  },
  {
    city: 'Kayseri',
    location: 'Kayseri Stadyumu',
    address: 'Melikgazi, 38100 Kayseri',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11997.43368168524!2d35.5044063!3d38.7701096!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cf5152357bf163%3A0x4e6f2ad8a16c9155!2sKayseri%20Stadyumu!5e0!3m2!1str!2str!4v1693140558634!5m2!1str!2str',
  },
  {
    city: 'Mersin',
    location: 'Mersin Stadyumu',
    address: 'Yenişehir, 33150 Mersin',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12007.19952214522!2d34.6280189!3d36.7749377!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cbe4d08bce1815%3A0x4bc0e3f33d8e35c2!2sMersin%20Stadyumu!5e0!3m2!1str!2str!4v1693140602926!5m2!1str!2str',
  },
  {
    city: 'Samsun',
    location: 'Samsun Stadyumu',
    address: 'İlkadım, 55010 Samsun',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12019.858497245974!2d36.3405187!3d41.281678!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40545f87aeb0b241%3A0x1dfe7798a95e876d!2sSamsun%20Stadyumu!5e0!3m2!1str!2str!4v1693140638648!5m2!1str!2str',
  },
  {
    city: 'Malatya',
    location: 'Malatya Stadyumu',
    address: 'Battalgazi, 44100 Malatya',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12022.715324793077!2d38.2530693!3d38.3617473!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ce694f9b16185d%3A0x2bce5a92f9db9b11!2sMalatya%20Stadyumu!5e0!3m2!1str!2str!4v1693140674331!5m2!1str!2str',
  },
  {
    city: 'Diyarbakır',
    location: 'Diyarbakır Stadyumu',
    address: 'Bağlar, 21120 Diyarbakır',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12020.534664394016!2d40.1808673!3d37.9009632!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4030c3cd6be43ce9%3A0x5549a7ed81087bfc!2sDiyarbak%C4%B1r%20Stadyumu!5e0!3m2!1str!2str!4v1693140721284!5m2!1str!2str',
  },
  {
    city: 'Batman',
    location: 'Batman Stadyumu',
    address: 'Merkez, 72100 Batman',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12023.415829943967!2d41.1343253!3d37.8957835!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40647a9cc55704e3%3A0x1b1dd472176719e5!2sBatman%20Stadyumu!5e0!3m2!1str!2str!4v1693140761100!5m2!1str!2str',
  },
  {
    city: 'Şanlıurfa',
    location: 'Şanlıurfa Stadyumu',
    address: 'Haliliye, 63000 Şanlıurfa',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12032.38322872252!2d38.9328387!3d37.1113136!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4064b7ca66c85565%3A0x9a96b30d4b39b3c7!2s%C5%9Eanl%C4%B1urfa%20Stadyumu!5e0!3m2!1str!2str!4v1693140800457!5m2!1str!2str',
  },
  {
    city: 'Kahramanmaraş',
    location: 'Kahramanmaraş Stadyumu',
    address: 'Onikişubat, 46050 Kahramanmaraş',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12049.98588159598!2d36.914656!3d37.572836!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c890e799d08f85%3A0x593b167f6ecb9d0a!2sKahramanmara%C5%9F%20Stadyumu!5e0!3m2!1str!2str!4v1693140844936!5m2!1str!2str',
  },
  {
    city: 'Van',
    location: 'Van Stadyumu',
    address: 'İpekyolu, 65000 Van',
    maps: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12015.645443919315!2d43.3750052!3d38.5255886!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409d3b5a7c46b5c9%3A0x3cb98883e8569dc3!2sVan%20Stadyumu!5e0!3m2!1str!2str!4v1693140892134!5m2!1str!2str',
  },
];
const artistNames = [
  'Galatasaray - Fenerbahçe',
  'Beşiktaş - Trabzonspor',
  'Real Madrid - Barcelona',
  'Manchester United - Liverpool',
  'AC Milan - Inter Milan',
  'Bayern Munich - Borussia Dortmund',
  'Rangers - Celtic',
  'Flamengo - Vasco da Gama',
  'Boca Juniors - River Plate',
  'Arsenal - Tottenham Hotspur',
  'Paris Saint-Germain - Olympique Marseille',
  'Ajax - Feyenoord',
  'Juventus - Napoli',
  'Benfica - Porto',
  'Atletico Madrid - Real Madrid',
  'Chelsea - Manchester City',
  'Sevilla - Real Betis',
  'Roma - Lazio',
  'Lyon - Marseille',
  'PSV Eindhoven - Ajax',
  'Sporting CP - Porto',
  'Leeds United - Manchester United',
  'Milan - Juventus',
  'Barcelona - Atletico Madrid',
  'Liverpool - Chelsea',
  'Fluminense - Flamengo',
  'Cruzeiro - Atlético Mineiro',
  'Palmeiras - São Paulo',
  'Corinthians - Santos',
  'Vélez Sarsfield - Independiente',
  'San Lorenzo - Huracán',
  'Club América - Chivas Guadalajara',
  'Monterrey - Tigres UANL',
  'New York Red Bulls - New York City FC',
  'LA Galaxy - Los Angeles FC',
  'Seattle Sounders - Portland Timbers',
  'Toronto FC - Montreal Impact',
  'Anderlecht - Club Brugge',
  'Celtic - Rangers',
  'Rennes - Nantes',
  'Borussia Mönchengladbach - FC Köln',
  'Hertha BSC - Union Berlin',
  'Fenerbahçe - Beşiktaş',
  'River Plate - Boca Juniors',
  'São Paulo - Palmeiras',
  'Internacional - Grêmio',
  'Cruzeiro - Flamengo',
  'Borussia Dortmund - Schalke 04',
  'Inter Milan - AC Milan',
  'Porto - Benfica',
  'Ajax - PSV Eindhoven',
  'Arsenal - Chelsea',
  'Manchester City - Manchester United',
  'Barcelona - Real Madrid',
  'Liverpool - Everton',
  'Marseille - Paris Saint-Germain',
  'Flamengo - Fluminense',
  'Santos - Corinthians',
  'Vasco da Gama - Botafogo',
  'Atlético Mineiro - Cruzeiro',
  'Independiente - Racing Club',
  "Newell's Old Boys - Rosario Central",
  'Universidad de Chile - Colo-Colo',
  'LA Galaxy - San Jose Earthquakes',
  'New York Red Bulls - Philadelphia Union',
  'Sporting CP - Benfica',
  'Porto - Sporting CP',
  'Benfica - Sporting CP',
  'Roma - Napoli',
  'Lazio - Roma',
  'Fiorentina - Juventus',
  'Genoa - Sampdoria',
  'AC Milan - Juventus',
  'Juventus - Inter Milan',
  'Torino - Juventus',
  'Napoli - Juventus',
  'Milan - Inter Milan',
  'Chelsea - Arsenal',
  'Manchester City - Liverpool',
  'Tottenham Hotspur - Arsenal',
  'Barcelona - Sevilla',
  'Real Madrid - Atletico Madrid',
  'Valencia - Villarreal',
  'Celta Vigo - Deportivo La Coruña',
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
  const category = 'sports';
  const ticketPrices = [
    { category: 'Standard', price: Math.floor(Math.random() * 151) + 50 },
    { category: 'VIP', price: Math.floor(Math.random() * 351) + 150 },
  ];
  const description = `Get ready for a wave of excitement and sportsmanship! We're thrilled to invite you to experience the thrill of live matches and sporting events at ${location}. Feel the adrenaline, join the cheering crowd, and be a part of sports history at ${location}. Get your tickets and get ready to support your favorite teams and athletes in a setting that's second to none!`;

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
    ticketPrices,
  };
  return eventData;
};

const concertData = [];
for (let i = 0; i < 100; i++) {
  const eventData = generateConcertData();
  concertData.push(eventData);
}

const outputPath = path.join(__dirname, 'sportsData.json');

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
