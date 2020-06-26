API_KEY = "84wP281xkdA9Yr4VF7g2C5RARhdjcoRK";

const input = document.querySelector('#gifs-search')
input.addEventListener('input', (event) =>{ searchGifs(event.target.value) })
let flag;

function getGifs(query){
  return fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API_KEY}`, {
    cache: 'default'
  }).then(result => {
    if(result.ok){
      //timeRequest = new Date().getTime();
      return result.json();
    }
    throw new Error('Something wrong!')
  })
}

const searchGifs = async (query) => {
  if(flag){
    setTimeout(() => { flag = false; }, 500);

    return;
  };
  try {
    const result = await getGifs(query)
    if (result){
      console.log(query, result)
      flag = true;
    }
  }catch(err){
    console.error(err)
  };
};
