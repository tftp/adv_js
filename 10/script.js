API_KEY = "84wP281xkdA9Yr4VF7g2C5RARhdjcoRK";

const input = document.querySelector('#gifs-search')
input.addEventListener('input', (event) =>{ throtSearchGifs(event.target.value) })
let cache = new Set();

async function getGifs(query, cache = new Set){
  cacheResponse = cache;
  if (cacheResponse[query]){
    return cacheResponse[query]
  }
  const result = await fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API_KEY}`);
  if(result.ok){
    return await result.json();
  }
  throw new Error('Something wrong!')
}

const searchGifs =   async (query) => {
  try {
    const result =   await getGifs(query, cache);
    if (result){
      console.log(query, cache, result)
      cache[query] = result;
    }
  }catch(err){
    console.error(err)
  };
};

let throtSearchGifs = throt(searchGifs, 500);

function throt(func, time){
  return function(query){
    let lastTime = this.currentTime;
    this.currentTime = new Date().getTime();
    if(lastTime && (this.currentTime - lastTime) < time){
      return;
    };
    func(query);
  }
}
