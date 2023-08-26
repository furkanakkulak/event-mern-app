import { Search } from '@mui/icons-material';

export default function Home() {
  const bgImage = {
    backgroundImage: `url('assets/bgImage.png')`,
  };

  return (
    <main className="home">
      <div className="content">
        <div className="head">
          <h1 className="title">Embark on a Journey of Exploration:</h1>
          <p className="sub-title">
            Uncover the Thrills of Concerts, Sports, Theatre, and Beyond!
          </p>
        </div>
        <div className="search">
          <input placeholder="Event, Artist or Location" />
          <Search />
        </div>
      </div>
    </main>
  );
}
