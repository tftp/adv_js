API_KEY = "84wP281xkdA9Yr4VF7g2C5RARhdjcoRK";

const GifsFactory = () => {
  let timeRequest = new Date().getTime();
  return query => {
    if ((new Date().getTime() - timeRequest) < 500){
      return;
    }
    return fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API_KEY}`, {
      cache: 'default' 
    }).then(result => {
      if(result.ok){
        timeRequest = new Date().getTime();
        return result.json();
      }
      throw new Error('Something wrong!')
    })
  };
};

const getGifs = GifsFactory();

const input = document.querySelector('#gifs-search')
input.addEventListener('input', (event) =>{ searchGifs(event.target.value) })

const searchGifs = async (query) => {
  try {
    const result = await getGifs(query)
    if (result)
      console.log(result)
  }catch(err){
    console.error(err)
  };
};
