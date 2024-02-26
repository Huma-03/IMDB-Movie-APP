function searchMovies() {
    const apiKey = document.getElementById("apiKey").value;
    const movieTitle = document.getElementById("movieTitle").value;
    console.log(apiKey, movieTitle);
    const resultsDiv=document.getElementById("results");
    resultsDiv.innerHTML="";
    if (!apiKey || !movieTitle) {
      showError("Both fields are required!");
      return;
    }
    //OMDB API 
    const url = `https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`;
    document.getElementById("loader").style.display = "block";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.getElementById("loader").style.display = "none";
  
        if(data.Error){
          showError(data.Error);
        }else if(data.Search.length>0){
          displayResults(data.Search);
          showError("");
        }
      });
  }
  
  function showError(message) {
    document.getElementById("error-message").innerText = message;
  }
  
  const btn = document.getElementById("search-btn");
  btn.addEventListener("click", searchMovies);
  //also search the movies by just put the information and press enter
  document.addEventListener('keydown',function(e){
      if(e.key==="Enter"){
          console.log("function called");
          searchMovies();
      }
  })

  //  15c6c53c(This is created Key , which is used as apikey )
  
  function displayResults(movies){
      const resultsDiv=document.getElementById("results");
      resultsDiv.innerHTML="";
      movies.forEach((movie,index) => {
          const card=document.createElement("div");
          card.classList="card";
          card.innerHTML=`
          <img id="cardimg" src="${movie.Poster}" alt="${movie.Title}">
          <div class="row-1">
          <h1>${index+1}</h1>
          <h2>${movie.Title}</h2>
          </div>
          <div class="row-2"
          <p>${movie.Year}</p>
          <p>${movie.imdbID}</p>
          </div>
          `;
          resultsDiv.appendChild(card);
      });
  }