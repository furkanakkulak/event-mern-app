import { Search } from '@mui/icons-material';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLocaleLowerCase();

    const keywords = [
      { keyword: /konser|concert|koncert|koncertas/i, page: '/concerts' },
      { keyword: /tiyatro|theatre|theater|teatro/i, page: '/theaters' },
      { keyword: /sports|spor|sport|esporte/i, page: '/sports' },
    ];

    const matchedKeyword = keywords.find((kw) =>
      kw.keyword.test(lowerCaseSearchTerm)
    );

    if (matchedKeyword) {
      router.push(matchedKeyword.page);
    } else {
      router.push(`/events?search=${lowerCaseSearchTerm}`);
    }
  };

  return (
    <>
      <Head>
        <title>EventPassify</title>
      </Head>
      <main className="home">
        <div className="content">
          <div className="head">
            <h1 className="title">Embark on a Journey of Exploration:</h1>
            <p className="sub-title">
              Uncover the Thrills of Concerts, Sports, Theatre, and Beyond!
            </p>
          </div>
          <div className="search">
            <input
              placeholder="Event, Artist or Location"
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e.target.value);
                }
              }}
            />
            <Search
              onClick={() =>
                handleSearch(document.querySelector('input').value)
              }
            />
          </div>
        </div>
      </main>
    </>
  );
}
