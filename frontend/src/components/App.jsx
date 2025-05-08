import { useState, useEffect } from 'react';
import { api } from '../utils/api';

function App() {
  const [news, setNews] = useState([]);

  const getAllNews = () => {
    api.getNews()
    .then((data)=>{
      setNews(data);
      console.log(data);
    })
    .catch((error) => console.error("Erro ao buscar as notícias:", error));
  }


  useEffect(()=>{
    getAllNews();
  }, []);

  return (
    <div>
     {news.map((v)=>(
      <div key={v._id}>
         <h1>{v.title}</h1>
         <img src={v.image} alt="tenso" />
      </div>
     ))}
    </div>
  );
}

export default App;
